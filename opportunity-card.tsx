import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "./brand-logo";
import { VerificationStatus } from "./verification-status";
import { capitalLabel, payoutLabel, rewardLabel, type Offer } from "@/lib/opportunities";
import { offerContent } from "@/lib/offer-content";
import { useT } from "@/lib/i18n";
import { progressLabels, statusOf, useOpportunityProgress } from "@/lib/opportunity-progress";

export function OpportunityCard({ item }: { item: Offer }) {
  const { locale, t } = useT();
  const { entryFor } = useOpportunityProgress();
  const entry = entryFor(item.id, item.stepCount);
  const personalStatus = statusOf(entry, item.stepCount);
  const percent = item.stepCount > 0 ? Math.round((entry.steps.length / item.stepCount) * 100) : 0;
  const content = offerContent(locale, item.id);
  const blocked = item.capitalRequired.kind === "unknown";
  if (!content) return null;

  return <article className="opportunity-card">
    <div className="flex items-start justify-between gap-3">
      <div><p className="reward-overline">{t("detail.reward")}</p><p className="value-display">{rewardLabel(item, locale)}</p></div>
      {personalStatus !== "not-started" && <span className={`status-chip ${personalStatus === "completed" ? "status-chip-complete" : ""}`}>{personalStatus === "in-progress" ? `${percent}%` : t(progressLabels[personalStatus])}</span>}
    </div>
    <div className="mt-3 flex items-center gap-3">
      <BrandLogo name={item.brand} />
      <div className="min-w-0"><VerificationStatus verification={item.verification} /><h3 className="truncate text-sm font-bold">{item.brand}</h3></div>
    </div>
    <p className="mt-3 text-sm font-semibold leading-snug">{content.title}</p>
    <p className="mt-1 line-clamp-2 text-xs leading-[18px] text-muted-foreground">{content.summary}</p>
    <dl className="offer-terms">
      <div><dt>{t("detail.costsYou")}</dt><dd className={blocked ? "text-caution" : undefined}>{capitalLabel(item.capitalRequired, locale)}</dd></div>
      <div><dt>{t("detail.payment")}</dt><dd>{payoutLabel(item, locale)}</dd></div>
      <div><dt>{t("detail.activeWork")}</dt><dd>{t("detail.minutes", { minutes: item.timeToComplete })}</dd></div>
    </dl>
    {blocked
      ? <Button disabled className="mt-4 h-12 w-full">{t("detail.stillVerifying")}</Button>
      : <Button asChild variant={personalStatus === "completed" ? "secondary" : "default"} className="mt-4 h-12 w-full"><Link to="/oportunidades/$id" params={{ id: item.id }}>{content.actionLabel}</Link></Button>}
  </article>;
}
