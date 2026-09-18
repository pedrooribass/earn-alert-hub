import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/beer-money/app-shell";
import { capitalLabel, opportunities } from "@/lib/opportunities";

export const Route = createFileRoute("/admin/verificacoes")({
  head: () => ({ meta: [
    { title: "Verificações pendentes — Beer Money App" },
    { name: "description", content: "Vista interna de ofertas com dados ou verificações pendentes." },
    { property: "og:title", content: "Verificações pendentes — Beer Money App" },
    { property: "og:description", content: "Vista interna de ofertas com dados ou verificações pendentes." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: "noindex, nofollow" },
  ]}),
  component: VerificationAdminPage,
});

function VerificationAdminPage() {
  const pending = opportunities.filter((offer) => offer.verification === null || offer.capitalRequired.kind === "unknown");
  return <AppShell title="Verificações pendentes" eyebrow="Vista interna">
    <section className="px-5 py-4"><p className="text-sm text-muted-foreground">{pending.length} ofertas exigem revisão.</p><div className="mt-4 divide-y">{pending.map((offer) => <Link key={offer.id} to="/oportunidades/$id" params={{ id: offer.id }} className="block py-4"><h2 className="text-sm font-bold">{offer.brand}</h2><p className="mt-1 text-xs text-muted-foreground">Verificação: {offer.verification ? offer.verification.verifiedAt : "Por fazer"}</p><p className={offer.capitalRequired.kind === "unknown" ? "mt-1 text-xs text-caution" : "mt-1 text-xs text-muted-foreground"}>Capital: {capitalLabel(offer.capitalRequired)}</p></Link>)}</div></section>
  </AppShell>;
}