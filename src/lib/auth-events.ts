import { supabase } from "@/integrations/supabase/client";

/**
 * Um único ouvinte de sessão para toda a aplicação.
 *
 * O progresso é lido em vários ecrãs ao mesmo tempo, e cada um a registar o seu
 * ouvinte significava várias releituras por cada mudança de sessão. Aqui há uma
 * subscrição só, e os interessados entram e saem de uma lista.
 *
 * Só interessam o início e o fim de sessão: TOKEN_REFRESHED dispara sozinho de
 * hora a hora e não muda nada do que está no ecrã.
 */
type Listener = () => void;

const listeners = new Set<Listener>();
let started = false;

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  supabase.auth.onAuthStateChange((event) => {
    if (event !== "SIGNED_IN" && event !== "SIGNED_OUT") return;
    listeners.forEach((listener) => listener());
  });
}

export function onSessionChange(listener: Listener) {
  start();
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}