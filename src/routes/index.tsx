import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, ChevronRight, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/beer-money/app-shell";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/beer-money/brand-logo";
import { byDocumentedValue, capitalFreeTotal, capitalLabel, opportunities, payoutLabel, requiresDeposit, rewardLabel, totalAvailable, verifiedCount, type Offer } from "@/lib/opportunities";
import { offerContent } from "@/lib/offer-content";
import { useOpportunityProgress } from "@/lib/opportunity-progress";
import { useT } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";
import { Money } from "@/lib/money";
import { prefersReducedMotion, setDirection } from "@/lib/page-transition";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Hoje — Beer Money App" },
    { name: "description", content: "Consulta recompensas, capital exigido e prazos de pagamento documentados." },
    { property: "og:title", content: "Hoje — Beer Money App" },
    { property: "og:description", content: "Ofertas com condições apresentadas de forma factual." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: TodayPage,
});

/**
 * Os grupos dizem o que a oferta custa antes de a pessoa tocar nela. Uma oferta
 * em destaque sai do seu grupo e vai para o topo: aparecer nos dois sítios era
 * mostrar a mesma marca duas vezes.
 */
function groupOf(offer: Offer) {
  if (offer.highlighted) return "featured";
  if (offer.capitalRequired.kind === "unknown") return "unknown";
  return requiresDeposit(offer) ? "deposit" : "free";
}

function costTone(offer: Offer) {
  if (offer.capitalRequired.kind === "unknown") return "offer-cost offer-cost-soon";
  return requiresDeposit(offer) ? "offer-cost offer-cost-known" : "offer-cost offer-cost-free";
}

function TodayPage() {
  const { locale, t, plural } = useT();
  const { entryFor } = useOpportunityProgress();
  useReveal();

  const ranked = [...opportunities].sort(byDocumentedValue);
  const gatedTotal = Math.max(totalAvailable - capitalFreeTotal, 0);
  const freeShare = totalAvailable > 0 ? Math.round((capitalFreeTotal / totalAvailable) * 100) : 0;
  const anyUnknown = opportunities.some((offer) => offer.capitalRequired.kind === "unknown");

  const groups = (["featured", "free", "deposit", "unknown"] as const)
    .map((key) => ({ key, items: ranked.filter((offer) => groupOf(offer) === key) }))
    .filter((group) => group.items.length > 0);

  const greetingKey = (() => {
    const hour = new Date().getHours();
    if (hour < 13) return "greeting.morning";
    return hour < 20 ? "greeting.afternoon" : "greeting.evening";
  })();

  /**
   * A ação seguinte só aparece quando diz algo que a lista não diz: retomar
   * uma oferta a meio. Sugerir "começa por aqui" apontando para a primeira
   * linha é repetir a mesma oferta duas vezes seguidas, porque a ordenação já
   * coloca em primeiro o que menos custa.
   */
  const inProgress = ranked.find((offer) => {
    const steps = entryFor(offer.id, offer.stepCount).steps.length;
    return steps > 0 && steps < offer.stepCount;
  });
  const nextStep = inProgress && inProgress !== ranked[0] ? inProgress : undefined;
  const nextContent = nextStep ? offerContent(locale, nextStep.id) : undefined;
  const nextPercent = nextStep && nextStep.stepCount > 0
    ? Math.round((entryFor(nextStep.id, nextStep.stepCount).steps.length / nextStep.stepCount) * 100)
    : 0;

  return <AppShell greeting={t(greetingKey)} tagline={t("greeting.tagline")} action={<Button asChild variant="ghost" size="icon" aria-label={t("detail.alerts")}><Link to="/alertas"><BellRing /></Link></Button>}>
    <section className="px-4 pb-2" data-reveal>
      <div className="hero-panel">
        <p className="hero-eyebrow">{t("home.eyebrow", { count: opportunities.length })}</p>
        <p className="hero-figure"><strong><Money locale={locale} min={totalAvailable} size="display" /></strong><em>{t("home.pending")}</em></p>
        <div className="hero-meter" role="img" aria-label={`${capitalFreeTotal}€ / ${gatedTotal}€`}>
          <i className="free" style={{ flex: `0 0 ${freeShare}%` }} />
          <i className="gated" style={{ flex: "1 1 auto" }} />
        </div>
        <div className="hero-split">
          <div className="free"><b><Money locale={locale} min={capitalFreeTotal} size="value" /></b><p>{t("home.free")}</p></div>
          <div className="gated"><b><Money locale={locale} min={gatedTotal} size="value" /></b><p>{anyUnknown ? t("home.gatedMixed") : t("home.gated")}</p></div>
        </div>
        <div className="hero-foot">
          <p>{verifiedCount === 0 ? t("home.verifiedNone") : t("home.verifiedSome", { count: verifiedCount, total: opportunities.length })}</p>
          <Link to="/como-ganhamos-dinheiro">{t("home.howWeVerify")}</Link>
        </div>
      </div>
    </section>

    {nextStep && nextContent && <section className="px-4 pt-4" data-reveal>
      <Link to="/oportunidades/$id" params={{ id: nextStep.id }} viewTransition={!prefersReducedMotion()} onClick={() => setDirection("forward")} className="next-step">
        <BrandLogo name={nextStep.brand} />
        <span className="next-step-body">
          <p>{t("next.resume")}</p>
          <h3>{nextStep.brand}</h3>
          <span>{t("offer.percentDone", { percent: nextPercent })}</span>
        </span>
        <span className="next-step-go"><ArrowRight /></span>
      </Link>
    </section>}

    {groups.map((group) => <section key={group.key} className="px-4 pt-5" data-reveal>
      <div className={group.key === "featured" ? "group-head group-featured" : "group-head"}>
        <h2>{t(`group.${group.key}`)}{group.key === "featured" && <span className="badge-featured">{t("badge.featured")}</span>}</h2>
        <span>{plural(group.items.length)}</span>
      </div>
      <div className="opportunity-list px-0">
        {group.items.map((offer) => {
          const content = offerContent(locale, offer.id);
          if (!content) return null;
          const entry = entryFor(offer.id, offer.stepCount);
          const percent = offer.stepCount > 0 ? Math.round((entry.steps.length / offer.stepCount) * 100) : 0;
          const reward = rewardLabel(offer, locale);
          return <Link key={offer.id} to="/oportunidades/$id" params={{ id: offer.id }} viewTransition={!prefersReducedMotion()} onClick={() => setDirection("forward")} className={offer.highlighted ? "offer-row offer-row-featured" : "offer-row"}>
            <BrandLogo name={offer.brand} />
            <span className="offer-name">
              <h3>{offer.brand}</h3>
              <span className={costTone(offer)}>{capitalLabel(offer.capitalRequired, locale)}</span>
              {offer.highlighted && content.highlightReason && <span className="offer-reason">{content.highlightReason}</span>}
            </span>
            <span className="offer-value">
              {reward === t("offer.valuePending")
                ? <span className="offer-amount offer-amount-soft">{reward}</span>
                : <span className="offer-amount"><Money locale={locale} min={offer.reward.min} max={offer.reward.max} size="value" /></span>}
              <span className="offer-meta">{percent > 0 ? t("offer.percentDone", { percent }) : payoutLabel(offer, locale)}</span>
            </span>
            <ChevronRight className="offer-chevron" />
            {percent > 0 && <span className="offer-row-progress"><i style={{ width: `${percent}%` }} /></span>}
          </Link>;
        })}
      </div>
    </section>)}

    <h1 className="sr-only">{t("home.title")}</h1>
  </AppShell>;
}