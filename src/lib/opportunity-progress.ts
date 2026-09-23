import { useSyncExternalStore } from "react";

export type OpportunityProgress = "not-started" | "in-progress" | "completed";

/**
 * O que guardamos por oferta: os passos que o utilizador marcou e, quando
 * concluiu, a data. O estado geral é derivado dos passos, nunca escrito à mão,
 * para que a barra de progresso e a carteira não possam discordar uma da outra.
 */
export type OfferProgressEntry = {
  steps: number[];
  claimedAt: string | null;
};

const storageKey = "bmc-opportunity-progress";
const eventName = "bmc-progress-change";

/** Formato antigo: { [id]: "completed" }. Migrado à leitura, sem perder nada. */
type StoredValue = OpportunityProgress | OfferProgressEntry;

function normalise(value: StoredValue, totalSteps: number): OfferProgressEntry {
  if (typeof value !== "string") return { steps: value.steps ?? [], claimedAt: value.claimedAt ?? null };
  if (value === "completed") return { steps: Array.from({ length: totalSteps }, (_, i) => i), claimedAt: null };
  if (value === "in-progress") return { steps: [0], claimedAt: null };
  return { steps: [], claimedAt: null };
}

function readRaw(): Record<string, StoredValue> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) ?? "{}") as Record<string, StoredValue>;
  } catch {
    return {};
  }
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
function snapshot() {
  const raw = window.localStorage.getItem(storageKey) ?? "{}";
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = readRaw();
  }
  return cachedValue;
}

const empty: Record<string, StoredValue> = {};
const serverSnapshot = () => empty;

export function statusOf(entry: OfferProgressEntry, totalSteps: number): OpportunityProgress {
  if (totalSteps > 0 && entry.steps.length >= totalSteps) return "completed";
  return entry.steps.length > 0 ? "in-progress" : "not-started";
}

export function useOpportunityProgress() {
  const stored = useSyncExternalStore(subscribe, snapshot, serverSnapshot);

  const entryFor = (id: string, totalSteps: number) => normalise(stored[id] ?? { steps: [], claimedAt: null }, totalSteps);

  const write = (id: string, entry: OfferProgressEntry) => {
    const next = { ...readRaw(), [id]: entry };
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event(eventName));
  };

  /** Marca ou desmarca um passo. Ao fechar o último, guarda a data. */
  const toggleStep = (id: string, index: number, totalSteps: number) => {
    const entry = entryFor(id, totalSteps);
    const done = entry.steps.includes(index);
    const steps = done ? entry.steps.filter((step) => step !== index) : [...entry.steps, index].sort((a, b) => a - b);
    const finished = steps.length >= totalSteps && totalSteps > 0;
    write(id, { steps, claimedAt: finished ? (entry.claimedAt ?? new Date().toISOString()) : null });
    navigator.vibrate?.(finished ? [12, 30, 18] : 8);
    return finished && !done;
  };

  const resetOffer = (id: string) => write(id, { steps: [], claimedAt: null });

  return { stored, entryFor, statusOf, toggleStep, resetOffer };
}

/** Chaves de tradução, resolvidas por quem apresenta. */
export const progressLabels: Record<OpportunityProgress, string> = {
  "not-started": "progress.notStarted",
  "in-progress": "progress.inProgress",
  completed: "progress.completed",
};
