import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing } from "lucide-react";
import { AppShell } from "@/components/beer-money/app-shell";
import { Button } from "@/components/ui/button";
import { capitalLabel, offerPresentation, opportunities, payoutLabel, rewardLabel, totalAvailable } from "@/lib/opportunities";
import { BrandLogo } from "@/components/beer-money/brand-logo";
import { useOpportunityProgress } from "@/lib/opportunity-progress";

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

function TodayPage() {
  const { progress } = useOpportunityProgress();
  const ranked = [...opportunities].sort((a, b) => (b.reward.max ?? b.reward.min) - (a.reward.max ?? a.reward.min));
  const completed = ranked.filter((item) => progress[item.id] === "completed");
  const claimed = completed.reduce((sum, item) => sum + item.reward.min, 0);
  const available = totalAvailable - claimed;
  const remaining = ranked.filter((item) => progress[item.id] !== "completed").length;
  const percent = totalAvailable > 0 ? Math.round((claimed / totalAvailable) * 100) : 0;
  const featured = ranked.filter((item) => item.verification !== null && item.capitalRequired.kind !== "unknown").slice(0, 2);
  const rest = ranked.filter((item) => !featured.some((pick) => pick.id === item.id));

  return <AppShell action={<Button asChild variant="ghost" size="icon" aria-label="Abrir alertas"><Link to="/alertas"><BellRing /></Link></Button>}>
    <section className="px-5 pb-7 pt-1 motion-rise">
      <div className="value-progress" role="progressbar" aria-label={`${claimed} euros concluídos de ${totalAvailable} euros`} aria-valuemin={0} aria-valuemax={totalAvailable} aria-valuenow={claimed}>
        <div className="value-progress-heading">
          <div><span>Mínimo documentado disponível</span><strong>{available}€</strong></div>
          <span className="value-progress-percent">{percent}% concluído</span>
        </div>
        <p className="value-progress-count">{remaining} ofertas por concluir</p>
        <div className="value-progress-track"><div className="value-progress-fill" style={{ width: `${percent}%` }} /></div>
        <div className="value-progress-footer"><span>{claimed}€ concluídos</span><span>{available}€ mínimos disponíveis</span></div>
      </div>
      <p className="social-proof">[PREENCHER: contador de ofertas verificadas]</p>
      <h1 className="sr-only">Recompensas mínimas documentadas</h1>
    </section>
    {featured.length > 0 && <section className="pb-7"><div className="section-heading section-heading-stacked"><h2 className="text-xl font-bold leading-tight">Ofertas recomendadas</h2><Link to="/explorar" className="text-xs font-semibold text-primary">Consultar todas as ofertas</Link></div><div className="featured-grid px-5">{featured.map((item) => { const content = offerPresentation[item.id]; if (!content) return null; return <Link key={item.id} to="/oportunidades/$id" params={{ id: item.id }} className="featured-opportunity"><div className="flex items-start justify-between gap-3"><div><p className="featured-kicker text-left">Recompensa</p><p className="featured-reward">{rewardLabel(item)}</p></div><BrandLogo name={item.brand} large/></div><div className="mt-3"><h3 className="text-[15px] font-semibold">{item.brand}</h3><p className="trust-label">Verificada {item.verification?.verifiedAt}</p></div><p className="mt-1 text-xs text-muted-foreground">{content.title}</p><dl className="offer-terms offer-terms-compact"><div><dt>Custa-te</dt><dd>{capitalLabel(item.capitalRequired)}</dd></div><div><dt>Pagamento</dt><dd>{payoutLabel(item)}</dd></div><div><dt>Trabalho ativo</dt><dd>{item.timeToComplete} min</dd></div></dl><span className="featured-action">{content.actionLabel}</span></Link>})}</div></section>}
    <section className="px-5 pb-8"><div className="section-heading px-0"><h2 className="text-xl font-bold leading-tight">Todas as ofertas</h2><Link to="/explorar" className="text-xs font-semibold text-primary">Consultar</Link></div><div className="opportunity-list">{rest.map((item) => <Link key={item.id} to="/oportunidades/$id" params={{ id: item.id }} className="opportunity-list-row"><div className="reward-column"><strong>{rewardLabel(item)}</strong><span>Recompensa</span></div><div className="min-w-0 flex flex-1 items-center gap-2.5"><BrandLogo name={item.brand}/><div className="min-w-0"><h3 className="truncate text-sm font-semibold">{item.brand}</h3><p className={`mt-0.5 text-[11px] ${item.capitalRequired.kind === "unknown" ? "text-caution" : "text-muted-foreground"}`}>Custa-te {capitalLabel(item.capitalRequired)}</p><p className="text-[11px] text-muted-foreground">Pagamento {payoutLabel(item)}</p></div></div></Link>)}</div></section>
  </AppShell>;
}