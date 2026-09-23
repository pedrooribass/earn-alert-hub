import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing } from "lucide-react";
import { AppShell } from "@/components/beer-money/app-shell";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/beer-money/brand-logo";
import { byDocumentedValue, capitalFreeTotal, capitalLabel, opportunities, payoutLabel, requiresDeposit, rewardLabel, totalAvailable, verifiedCount, type Offer } from "@/lib/opportunities";
import { offerContent } from "@/lib/offer-content";
import { useOpportunityProgress } from "@/lib/opportunity-progress";
import { useT } from "@/lib/i18n";

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

/** Os três grupos dizem o que a oferta custa antes de a pessoa tocar nela. */
function groupOf(offer: Offer) {
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

  const ranked = [...opportunities].sort(byDocumentedValue);
  const gatedTotal = Math.max(totalAvailable - capitalFreeTotal, 0);
  const freeShare = totalAvailable > 0 ? Math.round((capitalFreeTotal / totalAvailable) * 100) : 0;
  const anyUnknown = opportunities.some((offer) => offer.capitalRequired.kind === "unknown");

  const groups = (["free", "deposit", "unknown"] as const)
    .map((key) => ({ key, items: ranked.filter((offer) => groupOf(offer) === key) }))
    .filter((group) => group.items.length > 0);

  const greetingKey = (() => {
    const hour = new Date().getHours();
    if (hour < 13) return "greeting.morning";
    return hour < 20 ? "greeting.afternoon" : "greeting.evening";
  })();

  return <AppShell greeting={t(greetingKey)} tagline={t("greeting.tagline")} action={<Button asChild variant="ghost" size="icon" aria-label={t("detail.alerts")}><Link to="/alertas"><BellRing /></Link></Button>}>
    <section className="px-4 pb-2">
      <div className="hero-panel">
        <p className="hero-eyebrow">{t("home.eyebrow", { count: opportunities.length })}</p>
        <p className="hero-figure"><strong>{totalAvailable}<i>€</i></strong><em>{t("home.pending")}</em></p>
        <div className="hero-meter" role="img" aria-label={`${capitalFreeTotal}€ / ${gatedTotal}€`}>
          <i className="free" style={{ flex: `0 0 ${freeShare}%` }} />
          <i className="gated" style={{ flex: "1 1 auto" }} />
        </div>
        <div className="hero-split">
          <div className="free"><b>{capitalFreeTotal}<i>€</i></b><p>{t("home.free")}</p></div>
          <div className="gated"><b>{gatedTotal}<i>€</i></b><p>{anyUnknown ? t("home.gatedMixed") : t("home.gated")}</p></div>
        </div>
        <div className="hero-foot">
          <p>{verifiedCount === 0 ? t("home.verifiedNone") : t("home.verifiedSome", { count: verifiedCount, total: opportunities.length })}</p>
          <Link to="/como-ganhamos-dinheiro">{t("home.howWeVerify")}</Link>
        </div>
      </div>
    </section>

    {groups.map((group) => <section key={group.key} className="px-4 pt-5">
      <div className="group-head"><h2>{t(`group.${group.key}`)}</h2><span>{plural(group.items.length)}</span></div>
      <div className="opportunity-list px-0">
        {group.items.map((offer) => {
          const content = offerContent(locale, offer.id);
          if (!content) return null;
          const entry = entryFor(offer.id, offer.stepCount);
          const percent = offer.stepCount > 0 ? Math.round((entry.steps.length / offer.stepCount) * 100) : 0;
          const reward = rewardLabel(offer, locale);
          return <Link key={offer.id} to="/oportunidades/$id" params={{ id: offer.id }} className="offer-row">
            <BrandLogo name={offer.brand} />
            <span className="offer-name">
              <h3>{offer.brand}</h3>
              <span className={costTone(offer)}>{capitalLabel(offer.capitalRequired, locale)}</span>
              <p className="offer-pay">{percent > 0 ? t("offer.percentDone", { percent }) : payoutLabel(offer, locale)}</p>
            </span>
            {reward === t("offer.valuePending")
              ? <span className="offer-amount offer-amount-soft">{reward}</span>
              : <span className="offer-amount">{reward.replace("€", "")}<i>€</i></span>}
            {percent > 0 && <span className="offer-row-progress"><i style={{ width: `${percent}%` }} /></span>}
          </Link>;
        })}
      </div>
    </section>)}

    <h1 className="sr-only">{t("home.title")}</h1>
  </AppShell>;
}
