import { useEffect, useState, type ReactNode } from "react";
import { Brand } from "./brand";
import { BottomNav } from "./bottom-nav";
import { SplashScreen } from "./splash-screen";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n";

/** Primeiro nome de quem iniciou sessão, para a app falar com a pessoa pelo nome. */
function useFirstName() {
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      const meta = data.user?.user_metadata as { full_name?: string; name?: string } | undefined;
      const raw = meta?.full_name ?? meta?.name ?? data.user?.email?.split("@")[0] ?? null;
      const first = raw?.split(" ")[0] ?? null;
      setName(first ? first.replace(/^./, (c) => c.toUpperCase()) : null);
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);
  return name;
}

export function AppShell({ children, title, eyebrow, greeting, tagline, action }: { children: ReactNode; title?: string; eyebrow?: string; greeting?: string; tagline?: string; action?: ReactNode }) {
  const name = useFirstName();
  const { t, locale } = useT();
  useEffect(() => { document.documentElement.lang = locale === "de" ? "de-DE" : "pt-PT"; }, [locale]);

  return <div className="app-frame">
    <SplashScreen />
    <header className="app-header">
      {greeting
        ? <div className="greeting">
            <p>{greeting}</p>
            <h1>{name ?? t("greeting.fallback")}</h1>
            {tagline && <p className="greeting-tagline">{tagline}</p>}
          </div>
        : title
          ? <div>{eyebrow && <p className="page-context">{eyebrow}</p>}<h1 className="text-xl font-bold">{title}</h1></div>
          : <Brand compact />}
      {action}
    </header>
    <main className="pb-28">{children}</main>
    <BottomNav />
  </div>;
}
