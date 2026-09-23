import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Check, Clock3, Copy, MessageCircle, RotateCcw, TriangleAlert, WalletCards } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { capitalLabel, opportunities, payoutLabel, rewardLabel } from "@/lib/opportunities";
import { offerContent, offerLinks } from "@/lib/offer-content";
import { BrandLogo } from "@/components/beer-money/brand-logo";
import { VerificationStatus } from "@/components/beer-money/verification-status";
import { progressLabels, statusOf, useOpportunityProgress } from "@/lib/opportunity-progress";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/oportunidades/$id")({
  loader: ({ params }) => { const item = opportunities.find((offer) => offer.id === params.id); if (!item) throw notFound(); return item; },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Oportunidade indisponível — Beer Money App" }, { name: "description", content: "Esta oportunidade não está disponível." }, { property: "og:title", content: "Oportunidade indisponível" }, { property: "og:description", content: "Esta oportunidade não está disponível." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] };
    const content = offerContent("pt", loaderData.id);
    const description = content?.summary ?? "Consulta as condições documentadas desta oferta.";
    return { meta: [{ title: `${loaderData.brand} — Beer Money App` }, { name: "description", content: description }, { property: "og:title", content: loaderData.brand }, { property: "og:description", content: description }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: DetailPage,
});

function DetailPage() {
  const item = Route.useLoaderData();
  const { locale, t } = useT();
  const content = offerContent(locale, item.id);
  const links = offerLinks[item.id];
  const [saved, setSaved] = useState(false);
  const [justFinished, setJustFinished] = useState(false);
  const [copied, setCopied] = useState(false);
  const { entryFor, toggleStep, resetOffer } = useOpportunityProgress();

  const entry = entryFor(item.id, item.stepCount);
  const current = statusOf(entry, item.stepCount);
  const percent = item.stepCount > 0 ? Math.round((entry.steps.length / item.stepCount) * 100) : 0;
  const blocked = item.capitalRequired.kind === "unknown";
  const needsRiskNotice = item.category === "crypto" || item.category === "deposito";
  if (!content || !links) return null;

  function onToggle(index: number) {
    if (toggleStep(item.id, index, item.stepCount)) {
      setJustFinished(true);
      window.setTimeout(() => setJustFinished(false), 2400);
    }
  }

  return <div className="app-frame">
    <header className="app-header">
      <Button asChild variant="ghost" size="icon" aria-label={t("detail.back")}><Link to="/"><ArrowLeft /></Link></Button>
      <span className="text-sm font-semibold">{t("detail.opportunity")}</span>
      <Button variant="ghost" size="icon" aria-label={t("detail.save")} onClick={() => setSaved(!saved)} className={saved ? "text-primary" : ""}><Bookmark className={saved ? "fill-current" : ""} /></Button>
    </header>

    <main className="safe-bottom pb-32">
      <section className="px-5 pt-3">
        <div className="detail-reward">
          <p>{t("detail.reward")}</p>
          <strong className={justFinished ? "reward-pop" : undefined}>{rewardLabel(item, locale)}</strong>
          <span>{content.payoutConditions}</span>
        </div>
        <div className="detail-brand">
          <BrandLogo name={item.brand} large />
          <div><VerificationStatus verification={item.verification} /><h1>{item.brand}</h1></div>
        </div>
        <h2 className="mt-3 text-base font-semibold leading-snug">{content.title}</h2>
        <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">{content.summary}</p>
        {item.hasCommission && <p className="mt-2 text-xs text-muted-foreground">{t("detail.commission")}</p>}
      </section>

      <section className="px-5 py-5">
        <div className="opportunity-card">
          <div className="progress-headline">
            <strong>{justFinished ? t("progress.allMarked") : t(progressLabels[current])}</strong>
            <span>{t("progress.ofSteps", { done: entry.steps.length, total: item.stepCount })}</span>
          </div>
          <div className="progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><i style={{ width: `${percent}%` }} /></div>
          <div className="mt-2">
            {content.steps.map((step, index) => {
              const checked = entry.steps.includes(index);
              return <button key={`${step.title}-${index}`} type="button" className="step-check" data-done={checked} aria-pressed={checked} onClick={() => onToggle(index)}>
                <span className="step-box"><Check /></span>
                <span><h3>{step.title}</h3><p>{step.detail}</p></span>
              </button>;
            })}
          </div>
          {entry.steps.length > 0 && <Button variant="ghost" className="mt-3 h-9 w-full text-xs text-muted-foreground" onClick={() => resetOffer(item.id)}><RotateCcw />{t("progress.restart")}</Button>}
        </div>
        <p className="mt-2 px-1 text-[11px] leading-5 text-muted-foreground">{t("progress.disclaimer")}</p>
      </section>

      <section className="px-5 pb-6">
        <h2 className="text-base font-bold">{t("detail.conditions")}</h2>
        <div className="mt-2 divide-y">
          <div className="detail-row"><WalletCards /><span>{t("detail.costsYou")}</span><strong className={blocked ? "text-caution" : undefined}>{capitalLabel(item.capitalRequired, locale)}</strong></div>
          <div className="detail-row"><Clock3 /><span>{t("detail.payment")}</span><strong>{payoutLabel(item, locale)}</strong></div>
          <div className="detail-row"><Clock3 /><span>{t("detail.activeWork")}</span><strong>{t("detail.minutes", { minutes: item.timeToComplete })}</strong></div>
          <div className="detail-row"><span aria-hidden="true">—</span><span>{t("detail.effort")}</span><strong>{t(`detail.effort.${item.effort}`)}</strong></div>
        </div>
      </section>

      {content.earnings && <section className="px-5 pb-6">
        <h2 className="text-base font-bold">{t("detail.earnings")}</h2>
        <p className="mt-1 text-[12px] text-muted-foreground">{content.earnings.basis}</p>
        <div className="opportunity-list mt-2.5 px-0">
          {content.earnings.tiers.map((tier) => <div key={tier.label} className="earning-tier"><span>{tier.label}</span><strong>{tier.range}</strong></div>)}
        </div>
        <p className="mt-2.5 px-1 text-[11.5px] leading-[18px] text-muted-foreground">{content.earnings.ceiling}</p>
      </section>}

      <section className="px-5 pb-6">
        <h2 className="text-base font-bold">{t("detail.whoCanJoin")}</h2>
        <ul className="mt-2 space-y-1.5">
          {content.eligibility.map((rule) => <li key={rule} className="flex gap-2 text-[13px] leading-5"><span aria-hidden="true" className="text-muted-foreground">·</span>{rule}</li>)}
        </ul>
      </section>

      {content.risks.length > 0 && <section className="mx-5 mb-6 rounded-[18px] border border-border p-4">
        <div className="flex gap-3">
          <TriangleAlert className="mt-0.5 size-5 flex-none text-caution" />
          <div>
            <h2 className="text-sm font-bold">{needsRiskNotice ? t("detail.riskNotice") : t("detail.toConsider")}</h2>
            <ul className="mt-1.5 space-y-1.5">{content.risks.map((risk) => <li key={risk} className="text-xs leading-5 text-muted-foreground">{risk}</li>)}</ul>
          </div>
        </div>
      </section>}

      {links.promoCode && <section className="px-5 pb-6">
        <div className="promo-code">
          <div>
            <p>{t("detail.promoCode")}</p>
            <strong>{links.promoCode}</strong>
            <span>{content.promoCodeInstruction}</span>
          </div>
          <Button variant="secondary" className="h-10 flex-none px-4 text-xs font-bold" onClick={() => { navigator.clipboard?.writeText(links.promoCode!); setCopied(true); window.setTimeout(() => setCopied(false), 1800); navigator.vibrate?.(8); }}>
            {copied ? <Check /> : <Copy />}{copied ? t("detail.copied") : t("detail.copy")}
          </Button>
        </div>
      </section>}

      {links.supportUrl && content.supportLabel && <section className="px-5 pb-6">
        <a className="flex items-center gap-3 rounded-[18px] border border-border p-4" href={links.supportUrl} target="_blank" rel="noreferrer">
          <MessageCircle className="size-5 flex-none text-primary" />
          <span><span className="block text-sm font-bold">{content.supportLabel}</span><span className="block text-xs text-muted-foreground">{t("detail.supportSub")}</span></span>
        </a>
      </section>}

      <section className="px-5 pb-6 pt-2">
        <Button asChild variant="link" className="h-auto p-0 text-xs"><Link to="/como-ganhamos-dinheiro">{t("detail.howWeEarn")}</Link></Button>
      </section>
    </main>

    <div className="bottom-action">
      {blocked
        ? <Button disabled size="lg" className="h-12 w-full text-[15px]">{t("detail.stillVerifying")}</Button>
        : <Button asChild size="lg" className="h-12 w-full text-[15px]"><a href={links.url} target="_blank" rel="noreferrer" onClick={() => entry.steps.length === 0 && toggleStep(item.id, 0, item.stepCount)}>{content.actionLabel}</a></Button>}
    </div>
  </div>;
}
