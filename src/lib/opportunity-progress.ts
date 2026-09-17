import { useSyncExternalStore } from "react";

export type OpportunityProgress = "not-started" | "in-progress" | "completed";

const storageKey = "bmc-opportunity-progress";
const eventName = "bmc-progress-change";

function readProgress(): Record<string, OpportunityProgress> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) ?? "{}") as Record<string, OpportunityProgress>;
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
let cachedValue: Record<string, OpportunityProgress> = {};
function snapshot() {
  const raw = window.localStorage.getItem(storageKey) ?? "{}";
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = readProgress();
  }
  return cachedValue;
}

const emptyProgress: Record<string, OpportunityProgress> = {};
const serverSnapshot = () => emptyProgress;

export function useOpportunityProgress() {
  const progress = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const setProgress = (id: string, status: OpportunityProgress) => {
    const next = { ...readProgress(), [id]: status };
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event(eventName));
    navigator.vibrate?.(status === "completed" ? [12, 30, 18] : 10);
  };
  return { progress, setProgress };
}

export const progressLabels: Record<OpportunityProgress, string> = {
  "not-started": "Não iniciada",
  "in-progress": "Em progresso",
  completed: "Concluída",
};
