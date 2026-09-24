import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/beer-money/app-shell";
import { Button } from "@/components/ui/button";
import { offers } from "@/lib/opportunities";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/como-ganhamos-dinheiro")({
  head: () => ({ meta: [
    { title: "Como ganhamos dinheiro — Beer Money App" },
    { name: "description", content: "Relações comerciais e comissões da Beer Money App." },
    { property: "og:title", content: "Como ganhamos dinheiro" },
    { property: "og:description", content: "Relações comerciais e comissões." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: RevenuePage,
});

function RevenuePage() {
  const { t } = useT();
  const withCommission = offers.filter((offer) => offer.hasCommission);

  return <AppShell gate={false} title={t("revenue.title")} action={<Button asChild variant="ghost" size="icon" aria-label={t("detail.back")}><Link to="/conta"><ArrowLeft /></Link></Button>}>
    <article className="prose-block">
      <p>{t("revenue.p1")}</p>
      <p>{t("revenue.p2")}</p>
      <p>{t("revenue.p3")}</p>
      <p>{t("revenue.p4")}</p>
      <ul className="commission-list">
        {offers.map((offer) => <li key={offer.id}>
          <span>{offer.brand}</span>
          <strong data-on={offer.hasCommission}>{offer.hasCommission ? "✓" : "—"}</strong>
        </li>)}
      </ul>
      <p className="text-[11.5px]">{withCommission.length} / {offers.length}</p>
    </article>
  </AppShell>;
}