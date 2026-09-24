import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

/**
 * Sequência de entrada: apresentação, instalação, registo.
 *
 * A instalação vem antes do registo de propósito. Em iOS, uma sessão iniciada
 * no Safari pode não acompanhar a aplicação quando esta é adicionada ao ecrã
 * principal, e a pessoa teria de iniciar sessão outra vez sem perceber porquê.
 * Instalando primeiro, o registo acontece já dentro da aplicação e a sessão
 * fica onde tem de ficar.
 *
 * Cada passo é marcado ao ser visto, não ao ser concluído: quem recusa
 * instalar não fica preso num ciclo.
 */

export const flowKeys = { onboarded: "bmc-onboarded", installSeen: "bmc-install-seen" } as const;

export function markSeen(key: keyof typeof flowKeys) {
  try { localStorage.setItem(flowKeys[key], "1"); } catch { /* armazenamento indisponível */ }
}

function seen(key: keyof typeof flowKeys) {
  try { return localStorage.getItem(flowKeys[key]) === "1"; } catch { return false; }
}

export function isStandalone() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches
    || (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
}

/**
 * Decide para onde uma pessoa deve ir ao chegar. Devolve "ready" quando pode
 * ficar onde está; até lá o ecrã não é desenhado, para não haver um salto de
 * conteúdo antes do redirecionamento.
 */
export function useEntryFlow(enabled = true) {
  const navigate = useNavigate();
  const [state, setState] = useState<"checking" | "ready">("checking");

  useEffect(() => {
    if (!enabled) { setState("ready"); return; }
    let active = true;

    async function decide() {
      if (!seen("onboarded")) { navigate({ to: "/onboarding", replace: true }); return; }

      /* Quem já abre a partir do ícone não precisa de instruções de instalação. */
      if (!seen("installSeen") && !isStandalone()) { navigate({ to: "/instalar", replace: true }); return; }

      const { data } = await supabase.auth.getSession().catch(() => ({ data: { session: null } }));
      if (!active) return;
      if (!data.session) { navigate({ to: "/login", replace: true }); return; }

      setState("ready");
    }

    decide();
    return () => { active = false; };
  }, [navigate, enabled]);

  return state;
}