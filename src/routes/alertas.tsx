import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock3, Hourglass, WalletCards } from "lucide-react";
import { AppShell } from "@/components/beer-money/app-shell";
import { BrandLogo } from "@/components/beer-money/brand-logo";
import { offers, requiredDeposit } from "@/lib/opportunities";
import { useT } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";

export const Route = createFileRoute("/alertas")({
  head: () => ({ meta: [
    { title: "Alertas — Beer Money App" },
    { name: "description", content: "Prazos, capital exigido e o que ainda estamos a confirmar." },
    { property: "og:title", content: "Alertas — Beer Money App" },
    { property: "og:description", content: "O estado de cada campanha." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: AlertsPage,
});

function AlertsPage() {
  const { t } = useT();
  useReveal();

  /**
   * Os alertas saem do catálogo em vez de serem escritos à mão. Assim nunca
   * mostram uma oferta que já não existe nem um valor que entretanto mudou.
   */
  const items = offers.map((offer) => {
    const deposit = requiredDeposit(offer);
    if (offer.payout.estimateDays === null) {
      return { offer, icon: Hourglass, detail: t("alerts.checking") };
    }
    if (deposit > 0) {
      return { offer, icon: WalletCards, detail: t("alerts.deposit", { amount: deposit }) };
    }
    return {
      offer,
      icon: Clock3,
      detail: offer.payout.estimateDays === 0 ? t("alerts.payoutInstant") : t("alerts.payout", { days: offer.payout.estimateDays }),
    };
  });

  return <AppShell title={t("alerts.title")} eyebrow={t("alerts.eyebrow")}>
    <section className="px-4 pt-2" data-reveal>
      <div className="px-1 pb-3">
        <h2 className="text-[17px] font-bold leading-snug">{t("alerts.heading")}</h2>
        <p className="mt-1 text-[12.5px] leading-5 text-muted-foreground">{t("alerts.body")}</p>
      </div>
      <div className="opportunity-list px-0">
        {items.map(({ offer, icon: Icon, detail }) => <Link key={offer.id} to="/oportunidades/$id" params={{ id: offer.id }} className="offer-row">
          <BrandLogo name={offer.brand} />
          <span className="offer-name">
            <h3>{offer.brand}</h3>
            <span className="offer-cost offer-cost-known">{detail}</span>
          </span>
          <Icon className="size-5 text-muted-foreground" />
        </Link>)}
      </div>
    </section>
  </AppShell>;
}