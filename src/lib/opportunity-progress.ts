import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { onSessionChange } from "./auth-events";
import { offers } from "./opportunities";

export type OpportunityProgress = "not-started" | "in-progress" | "completed";

/**
 * O que guardamos por oferta: os passos que a pessoa marcou e, quando concluiu,
 * a data. O estado geral é derivado dos passos, nunca escrito à mão, para que a
 * barra de progresso e a carteira não possam discordar uma da outra.
 */
export type OfferProgressEntry = {
  steps: number[];
  claimedAt: string | null;
  paidAt?: string | null;
};

const storageKey = "bmc-opportunity-progress";
const eventName = "bmc-progress-change";
const queryKey = ["offer-progress"] as const;

/**
 * Quantos passos tem cada oferta, segundo o catálogo.
 *
 * O formato antigo guardava só "completed", sem os índices. Para o converter é
 * preciso saber quantos passos existem: com zero, a conversão devolvia uma
 * lista vazia e apagava o progresso de quem já tinha concluído a oferta.
 */
const stepCounts: Record<string, number> = Object.fromEntries(offers.map((offer) => [offer.id, offer.stepCount]));

function stepsOf(offerId: string, fallback = 0) {
  return stepCounts[offerId] ?? fallback;
}

/** Formato antigo: { [id]: "completed" }. Migrado à leitura, sem perder nada. */
type StoredValue = OpportunityProgress | OfferProgressEntry;
type Entries = Record<string, OfferProgressEntry>;

function normalise(value: StoredValue, totalSteps: number): OfferProgressEntry {
  if (typeof value !== "string") {
    return { steps: value.steps ?? [], claimedAt: value.claimedAt ?? null, paidAt: value.paidAt ?? null };
  }
  if (value === "completed") return { steps: Array.from({ length: totalSteps }, (_, i) => i), claimedAt: null, paidAt: null };
  if (value === "in-progress") return { steps: [0], claimedAt: null, paidAt: null };
  return { steps: [], claimedAt: null, paidAt: null };
}

/* ——— Armazenamento local: usado sem sessão, offline, e como rascunho ——— */

function readLocal(): Record<string, StoredValue> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) ?? "{}") as Record<string, StoredValue>;
  } catch {
    return {};
  }
}

function writeLocal(next: Record<string, StoredValue>) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event(eventName));
  } catch { /* armazenamento indisponível */ }
}

function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener("storage", callback);
  };
}

let cachedRaw = "";
let cachedValue: Record<string, StoredValue> = {};
function localSnapshot() {
  const raw = window.localStorage.getItem(storageKey) ?? "{}";
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = readLocal();
  }
  return cachedValue;
}

const empty: Record<string, StoredValue> = {};
const serverSnapshot = () => empty;

/* ——— Sessão ——— */

function useUserId() {
  const { data } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      return session.session?.user.id ?? null;
    },
    staleTime: 60_000,
  });
  return data ?? null;
}

/* ——— Supabase ——— */

async function fetchRemote(userId: string): Promise<Entries> {
  const { data, error } = await supabase
    .from("saved_opportunities")
    .select("offer_id, steps, claimed_at, paid_at")
    .eq("user_id", userId)
    .not("offer_id", "is", null);
  if (error) throw error;

  const entries: Entries = {};
  for (const row of data ?? []) {
    if (!row.offer_id) continue;
    entries[row.offer_id] = {
      steps: [...(row.steps ?? [])].sort((a, b) => a - b),
      claimedAt: row.claimed_at,
      paidAt: row.paid_at,
    };
  }
  return entries;
}

async function saveRemote(userId: string, offerId: string, entry: OfferProgressEntry) {
  const { error } = await supabase
    .from("saved_opportunities")
    .upsert(
      {
        user_id: userId,
        offer_id: offerId,
        steps: entry.steps,
        claimed_at: entry.claimedAt,
        paid_at: entry.paidAt ?? null,
      },
      { onConflict: "user_id,offer_id" },
    );
  if (error) throw error;
}

/**
 * Junta o que estava no dispositivo ao que já existe na conta. Fica a união dos
 * passos e a data de conclusão mais antiga, porque perder progresso é pior do
 * que duplicá-lo. Corre em cada leitura, não só no primeiro início de sessão: é
 * assim que um rascunho deixado por uma gravação falhada chega ao servidor.
 * Só limpa o local depois de gravar.
 */
async function mergeLocalInto(userId: string, remote: Entries): Promise<Entries> {
  const local = readLocal();
  const offerIds = Object.keys(local);
  if (offerIds.length === 0) return remote;

  const merged: Entries = { ...remote };
  const writes: Promise<void>[] = [];

  for (const offerId of offerIds) {
    const localEntry = normalise(local[offerId]!, stepsOf(offerId));
    const remoteEntry = remote[offerId];
    const steps = [...new Set([...(remoteEntry?.steps ?? []), ...localEntry.steps])].sort((a, b) => a - b);
    const dates = [remoteEntry?.claimedAt, localEntry.claimedAt].filter((value): value is string => Boolean(value));
    const claimedAt = dates.length > 0 ? dates.sort()[0]! : null;
    const paidAt = remoteEntry?.paidAt ?? localEntry.paidAt ?? null;

    const entry: OfferProgressEntry = { steps, claimedAt, paidAt };
    merged[offerId] = entry;
    writes.push(saveRemote(userId, offerId, entry));
  }

  await Promise.all(writes);
  try { window.localStorage.removeItem(storageKey); window.dispatchEvent(new Event(eventName)); } catch { /* ignorar */ }
  return merged;
}

/* ——— Estado derivado ——— */

export function statusOf(entry: OfferProgressEntry, totalSteps: number): OpportunityProgress {
  if (totalSteps > 0 && entry.steps.length >= totalSteps) return "completed";
  return entry.steps.length > 0 ? "in-progress" : "not-started";
}

export function useOpportunityProgress() {
  const userId = useUserId();
  const client = useQueryClient();
  const localStored = useSyncExternalStore(subscribe, localSnapshot, serverSnapshot);

  const remote = useQuery({
    queryKey: [...queryKey, userId],
    queryFn: async () => {
      if (!userId) return {} as Entries;
      const fetched = await fetchRemote(userId);
      return mergeLocalInto(userId, fetched);
    },
    enabled: userId !== null,
    staleTime: 30_000,
  });

  /** Sem sessão, ou enquanto a leitura não chega, manda o dispositivo. */
  const entries: Entries = useMemo(() => {
    if (userId && remote.data) return remote.data;
    const converted: Entries = {};
    for (const [id, value] of Object.entries(localStored)) converted[id] = normalise(value, stepsOf(id));
    return converted;
  }, [userId, remote.data, localStored]);

  const mutation = useMutation({
    mutationFn: async ({ offerId, entry }: { offerId: string; entry: OfferProgressEntry }) => {
      if (!userId) { writeLocal({ ...readLocal(), [offerId]: entry }); return; }
      await saveRemote(userId, offerId, entry);
    },
    onMutate: async ({ offerId, entry }) => {
      if (!userId) return;
      await client.cancelQueries({ queryKey: [...queryKey, userId] });
      const previous = client.getQueryData<Entries>([...queryKey, userId]);
      client.setQueryData<Entries>([...queryKey, userId], { ...(previous ?? {}), [offerId]: entry });
      return { previous };
    },
    onError: (_error, _variables, context) => {
      /* A escrita falhou: repõe o que estava e guarda no dispositivo para não se perder. */
      if (userId && context?.previous) client.setQueryData([...queryKey, userId], context.previous);
      writeLocal({ ...readLocal(), [_variables.offerId]: _variables.entry });
    },
    onSettled: () => { if (userId) client.invalidateQueries({ queryKey: [...queryKey, userId] }); },
  });

  /* Ao terminar ou iniciar sessão, o estado tem de ser relido. */
  useEffect(() => onSessionChange(() => {
    client.invalidateQueries({ queryKey: ["auth-user"] });
    client.invalidateQueries({ queryKey });
  }), [client]);

  const entryFor = useCallback(
    (id: string, totalSteps: number) => entries[id] ?? normalise({ steps: [], claimedAt: null }, totalSteps),
    [entries],
  );

  /**
   * O estado no momento do toque, não o do último render. Marcar dois passos
   * depressa lia duas vezes o mesmo valor antigo e o segundo toque desfazia o
   * primeiro.
   */
  const latestEntry = useCallback((id: string, totalSteps: number): OfferProgressEntry => {
    if (userId) {
      const cached = client.getQueryData<Entries>([...queryKey, userId]);
      if (cached?.[id]) return cached[id];
      if (cached) return normalise({ steps: [], claimedAt: null }, totalSteps);
    }
    const local = readLocal()[id];
    return local ? normalise(local, totalSteps) : normalise({ steps: [], claimedAt: null }, totalSteps);
  }, [client, userId]);

  const write = useCallback(
    (offerId: string, entry: OfferProgressEntry) => mutation.mutate({ offerId, entry }),
    [mutation],
  );

  /** Marca ou desmarca um passo. Ao fechar o último, guarda a data. */
  const toggleStep = useCallback((id: string, index: number, totalSteps: number) => {
    const entry = latestEntry(id, totalSteps);
    const done = entry.steps.includes(index);
    const steps = done ? entry.steps.filter((step) => step !== index) : [...entry.steps, index].sort((a, b) => a - b);
    const finished = steps.length >= totalSteps && totalSteps > 0;
    write(id, { steps, claimedAt: finished ? (entry.claimedAt ?? new Date().toISOString()) : null, paidAt: entry.paidAt ?? null });
    navigator.vibrate?.(finished ? [12, 30, 18] : 8);
    return finished && !done;
  }, [latestEntry, write]);

  const resetOffer = useCallback((id: string) => write(id, { steps: [], claimedAt: null, paidAt: null }), [write]);

  return { stored: entries, entryFor, statusOf, toggleStep, resetOffer, syncing: remote.isFetching || mutation.isPending };
}

/** Chaves de tradução, resolvidas por quem apresenta. */
export const progressLabels: Record<OpportunityProgress, string> = {
  "not-started": "progress.notStarted",
  "in-progress": "progress.inProgress",
  completed: "progress.completed",
};