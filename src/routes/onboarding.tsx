import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, ShieldCheck, WalletCards } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Brand } from "@/components/beer-money/brand";
import { Button } from "@/components/ui/button";
import { capitalFreeTotal, opportunities, totalAvailable } from "@/lib/opportunities";
import { useT } from "@/lib/i18n";
import { Money } from "@/lib/money";
import { markSeen } from "@/lib/entry-flow";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [
    { title: "Bem-vindo — Beer Money App" },
    { name: "description", content: "Recompensa, capital exigido e prazo de pagamento, antes de abrires conta." },
    { property: "og:title", content: "Beer Money App" },
    { property: "og:description", content: "Consulta as condições antes de abrir uma conta." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: OnboardingPage,
});

function OnboardingPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { locale, t } = useT();

  /** Os exemplos usam os números reais do catálogo, não valores de fachada. */
  const visuals: ReactNode[] = [
    <div key="a" className="onboard-figure">
      <p>{t("onboarding.offersCount")}</p>
      <strong><Money locale={locale} min={totalAvailable} size="display" /></strong>
      <span>{t("home.eyebrow", { count: opportunities.length })}</span>
    </div>,
    <div key="b" className="onboard-card">
      <div className="onboard-split">
        <div><b><Money locale={locale} min={capitalFreeTotal} size="value" /></b><p>{t("home.free")}</p></div>
        <div><b><Money locale={locale} min={Math.max(totalAvailable - capitalFreeTotal, 0)} size="value" /></b><p>{t("home.gated")}</p></div>
      </div>
      <div className="onboard-meter"><i className="free" style={{ flex: `0 0 ${Math.round((capitalFreeTotal / Math.max(totalAvailable, 1)) * 100)}%` }} /><i className="gated" /></div>
    </div>,
    <div key="c" className="onboard-card onboard-steps">
      <p className="onboard-done"><CheckCircle2 />Criar conta</p>
      <p className="onboard-done"><CheckCircle2 />Depositar</p>
      <p><span className="onboard-todo" />Receber a recompensa</p>
      <div className="onboard-progress"><i style={{ width: "66%" }} /></div>
    </div>,
    <div key="d" className="onboard-support"><MessageCircle /><span>WhatsApp</span></div>,
  ];

  const icons = [ShieldCheck, WalletCards, CheckCircle2, MessageCircle];
  const last = step === 3;
  const Icon = icons[step] ?? ShieldCheck;

  return <main className="onboard">
    <header className="onboard-top">
      <Brand />
      {!last && <Button variant="ghost" className="text-xs text-muted-foreground" onClick={() => { markSeen("onboarded"); navigate({ to: "/instalar" }); }}>{t("onboarding.skip")}</Button>}
    </header>

    <div className="onboard-body">
      <div key={step} className="motion-rise onboard-visual">{visuals[step]}</div>
      <div key={`copy-${step}`} className="motion-rise onboard-copy">
        <span className="onboard-icon"><Icon strokeWidth={1.8} /></span>
        <h1>{t(`onboarding.${step + 1}.title`)}</h1>
        <p>{t(`onboarding.${step + 1}.text`)}</p>
      </div>
    </div>

    <div className="onboard-foot">
      <div className="onboard-dots">{[0, 1, 2, 3].map((i) => <span key={i} data-on={i === step} />)}</div>
      <Button size="lg" className="h-13 w-full text-base" onClick={() => { if (!last) { setStep(step + 1); return; } markSeen("onboarded"); navigate({ to: "/instalar" }); }}>
        {last ? t("onboarding.continue") : t("onboarding.next")}
      </Button>
    </div>
  </main>;
}