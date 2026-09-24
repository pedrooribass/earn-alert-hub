import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Apple, Loader2 } from "lucide-react";
import { useState } from "react";
import { Brand } from "@/components/beer-money/brand";
import { Button } from "@/components/ui/button";
import { lovable } from "@/integrations/lovable/index";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Entrar — Beer Money App" },
    { name: "description", content: "Entra para guardares o teu progresso nas ofertas." },
    { property: "og:title", content: "Entrar — Beer Money App" },
    { property: "og:description", content: "Guarda o teu progresso nas ofertas." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: LoginPage,
});

function GoogleMark() { return <span className="text-base font-black">G</span>; }

function LoginPage() {
  const [loading, setLoading] = useState<"google" | "apple" | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useT();

  async function signIn(provider: "google" | "apple") {
    setLoading(provider);
    setError("");
    const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
    if (result.error) { setError(t("login.error")); setLoading(null); return; }
    if (!result.redirected) navigate({ to: "/", replace: true });
  }

  return <main className="entry-screen">
    <Brand />
    <div className="entry-body">
      <p className="page-context">{t("login.eyebrow")}</p>
      <h1 className="entry-title">{t("login.title")}</h1>
      <p className="entry-text">{t("login.body")}</p>

      <div className="mt-9 space-y-3">
        <Button variant="outline" size="lg" className="h-14 w-full justify-center bg-card text-base" onClick={() => signIn("google")} disabled={loading !== null}>
          {loading === "google" ? <Loader2 className="animate-spin" /> : <GoogleMark />}{t("login.google")}
        </Button>
        <Button size="lg" className="h-14 w-full justify-center text-base" onClick={() => signIn("apple")} disabled={loading !== null}>
          {loading === "apple" ? <Loader2 className="animate-spin" /> : <Apple className="fill-current" />}{t("login.apple")}
        </Button>
      </div>

      {error && <p className="mt-4 text-center text-sm text-destructive">{error}</p>}

      <p className="mt-7 text-center text-[11.5px] leading-5 text-muted-foreground">
        {t("login.terms")}{" "}
        <Link to="/informacao-legal" className="font-semibold text-foreground underline underline-offset-2">{t("login.termsLink")}</Link>
      </p>
    </div>
  </main>;
}