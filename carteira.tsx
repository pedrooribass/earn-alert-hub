import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/beer-money/app-shell";
import { BrandLogo } from "@/components/beer-money/brand-logo";
import { opportunities, rewardLabel } from "@/lib/opportunities";
import { statusOf, useOpportunityProgress } from "@/lib/opportunity-progress";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/carteira")({
  head: () => ({ meta: [
    { title: "Carteira — Beer Money App" },
    { name: "description", content: "O que já concluíste, o que está a decorrer e quanto falta." },
    { property: "og:title", content: "Carteira — Beer Money App" },
    { property: "og:description", content: "O teu progresso nas ofertas documentadas." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: WalletPage,
});

const milestones = [25, 50, 100];

function WalletPage() {
  const { locale, t } = useT();
  const { entryFor } = useOpportunityProgress();
  const months = locale === "de"
    ? ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
    : ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

  const rows = opportunities.map((offer) => {
    const entry = entryFor(offer.id, offer.stepCount);
    return { offer, entry, status: statusOf(entry, offer.stepCount) };
  });

  const done = rows.filter((row) => row.status === "completed");
  const running = rows.filter((row) => row.status === "in-progress");
  const claimed = done.reduce((sum, row) => sum + row.offer.reward.min, 0);
  const pending = running.reduce((sum, row) => sum + row.offer.reward.min, 0);

  const now = new Date();
  const sameMonth = (iso: string | null, date: Date) =>
    iso !== null && new Date(iso).getMonth() === date.getMonth() && new Date(iso).getFullYear() === date.getFullYear();

  const thisMonth = done.filter((row) => sameMonth(row.entry.claimedAt, now)).reduce((sum, row) => sum + row.offer.reward.min, 0);

  /** Seis meses de histórico, a partir das datas que o próprio utilizador marcou. */
  const history = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const total = done.filter((row) => sameMonth(row.entry.claimedAt, date)).reduce((sum, row) => sum + row.offer.reward.min, 0);
    return { label: months[date.getMonth()] ?? "", total };
  });
  const peak = Math.max(...history.map((month) => month.total), 1);

  const payoutDays = done.map((row) => row.offer.payout.estimateDays).filter((days): days is number => days !== null);
  const averageDays = payoutDays.length > 0 ? Math.round(payoutDays.reduce((sum, days) => sum + days, 0) / payoutDays.length) : null;

  return <AppShell title={t("wallet.title")} eyebrow={t("wallet.eyebrow")}>
    <section className="px-4 pt-1">
      <div className="hero-panel">
        <p className="hero-eyebrow">{t("wallet.marked")}</p>
        <p className="hero-figure reward-pop"><strong>{claimed}<i>€</i></strong><em>{done.length === 1 ? t("wallet.inOffer") : t("wallet.inOffers", { count: done.length })}</em></p>
        <div className="hero-foot">
          <p>{pending === 0
            ? t("wallet.runningNone")
            : running.length === 1 ? t("wallet.runningOne", { amount: pending }) : t("wallet.runningSome", { amount: pending, count: running.length })}</p>
          <Link to="/">{t("wallet.seeOffers")}</Link>
        </div>
      </div>
    </section>

    <section className="px-4 pt-4">
      <div className="stat-grid">
        <div className="stat-card">
          <p>{t("wallet.thisMonth")}</p>
          <strong>{thisMonth}<i>€</i></strong>
          <span>{months[now.getMonth()]} {now.getFullYear()}</span>
        </div>
        <div className="stat-card">
          <p>{t("wallet.averageTime")}</p>
          <strong>{averageDays === null ? "—" : averageDays === 0 ? t("payout.instant") : `${averageDays}d`}</strong>
          <span>{payoutDays.length === 0 ? t("wallet.noData") : t("wallet.fromClosed")}</span>
        </div>
        <div className="stat-card stat-card-wide">
          <p>{t("wallet.sixMonths")}</p>
          <div className="spark" role="img" aria-label={t("wallet.chartLabel")}>
            {history.map((month, index) => <i key={month.label + index} data-on={month.total > 0} style={{ height: `${Math.max((month.total / peak) * 100, 6)}%`, animationDelay: `${index * 50}ms` }} />)}
          </div>
          <div className="spark-axis">{history.map((month, index) => <span key={month.label + index}>{month.label}</span>)}</div>
        </div>
      </div>
    </section>

    <section className="px-4 pt-6">
      <div className="group-head"><h2>{t("wallet.milestones")}</h2><span>{t("wallet.markedAmount", { amount: claimed })}</span></div>
      <div className="opportunity-list">
        {milestones.map((target) => {
          const reached = claimed >= target;
          const percent = Math.min(Math.round((claimed / target) * 100), 100);
          return <div key={target} className="milestone">
            <span className="milestone-badge" data-reached={reached}>{target}€</span>
            <div className="min-w-0 flex-1">
              <h3>{t(`wallet.milestone${target}`)}</h3>
              <p>{reached ? t("wallet.reached") : t(`wallet.milestone${target}detail`)}</p>
            </div>
            <span className="milestone-track"><i style={{ width: `${percent}%` }} /></span>
          </div>;
        })}
      </div>
    </section>

    <section className="px-4 pb-6 pt-6">
      <div className="group-head"><h2>{t("wallet.running")}</h2><span>{running.length}</span></div>
      {running.length === 0
        ? <div className="empty-state"><h3>{t("wallet.emptyTitle")}</h3><p>{t("wallet.emptyBody")}</p></div>
        : <div className="opportunity-list px-0">
            {running.map(({ offer, entry }) => {
              const percent = Math.round((entry.steps.length / offer.stepCount) * 100);
              return <Link key={offer.id} to="/oportunidades/$id" params={{ id: offer.id }} className="offer-row">
                <BrandLogo name={offer.brand} />
                <span className="offer-name">
                  <h3>{offer.brand}</h3>
                  <p className="offer-pay">{t("wallet.stepsOf", { done: entry.steps.length, total: offer.stepCount })}</p>
                </span>
                <span className="offer-amount offer-amount-soft">{rewardLabel(offer, locale)}</span>
                <span className="offer-row-progress"><i style={{ width: `${percent}%` }} /></span>
              </Link>;
            })}
          </div>}
    </section>

    <p className="px-5 pb-4 text-[11px] leading-5 text-muted-foreground">{t("wallet.disclaimer")}</p>
  </AppShell>;
}
