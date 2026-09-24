import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { isAdmin } from "@/lib/admin-guard";
import { AppShell } from "@/components/beer-money/app-shell";
import { BrandLogo } from "@/components/beer-money/brand-logo";
import { auditCatalogue, referralState } from "@/lib/offer-audit";
import { offerLinks } from "@/lib/offer-content";

export const Route = createFileRoute("/admin/verificacoes")({
  /* Quem não é administrador recebe 404: uma página de erro confirmaria que a rota existe. */
  beforeLoad: async () => { if (!(await isAdmin())) throw notFound(); },
  head: () => ({ meta: [
    { title: "Auditoria do catálogo — Beer Money App" },
    { name: "description", content: "Vista interna do que falta em cada oferta antes de ser publicada." },
    { property: "og:title", content: "Auditoria do catálogo — Beer Money App" },
    { property: "og:description", content: "Vista interna do que falta em cada oferta." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: "noindex, nofollow" },
  ]}),
  component: VerificationAdminPage,
});

const tone = { bloqueante: "text-urgent", importante: "text-caution", menor: "text-muted-foreground" } as const;

function VerificationAdminPage() {
  const audit = auditCatalogue();
  const blocking = audit.reduce((sum, entry) => sum + entry.issues.filter((issue) => issue.severity === "bloqueante").length, 0);
  const clean = audit.filter((entry) => entry.issues.length === 0).length;
  const withoutLink = audit.filter((entry) => referralState(offerLinks[entry.offer.id]?.url ?? "", offerLinks[entry.offer.id]?.promoCode) === "sem-link").length;

  return <AppShell title="Auditoria" eyebrow="Vista interna">
    <section className="px-4 pt-1">
      <div className="hero-panel">
        <p className="hero-eyebrow">Problemas bloqueantes no catálogo</p>
        <p className="hero-figure"><strong>{blocking}</strong><em>em {audit.length} ofertas</em></p>
        <div className="hero-foot">
          <p>{withoutLink} sem link de referência · {clean} sem nada pendente</p>
        </div>
      </div>
    </section>

    {audit.map(({ offer, issues }) => <section key={offer.id} className="px-4 pt-5">
      <div className="opportunity-list px-0">
        <Link to="/oportunidades/$id" params={{ id: offer.id }} className="offer-row">
          <BrandLogo name={offer.brand} />
          <span className="offer-name">
            <h3>{offer.brand}</h3>
            <p className="offer-pay">{issues.length === 0 ? "Sem pendências" : `${issues.length} ${issues.length === 1 ? "pendência" : "pendências"}`}</p>
          </span>
          <span className="offer-amount offer-amount-soft">{issues.filter((issue) => issue.severity === "bloqueante").length} bloqueantes</span>
        </Link>
        {issues.map((issue) => <div key={issue.field} className="border-t border-[var(--surface-border)] px-4 py-3">
          <p className={`text-[12px] font-bold ${tone[issue.severity]}`}>{issue.field}</p>
          <p className="mt-0.5 text-[11.5px] leading-[17px] text-muted-foreground">{issue.detail}</p>
        </div>)}
      </div>
    </section>)}

    <p className="px-5 py-6 text-[11px] leading-5 text-muted-foreground">
      Esta lista é calculada a partir dos dados do catálogo. Ao preencher um campo em opportunities.ts, a pendência desaparece daqui sozinha.
    </p>
  </AppShell>;
}