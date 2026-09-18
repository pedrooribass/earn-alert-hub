import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/beer-money/app-shell";
import { Button } from "@/components/ui/button";
import { opportunities, totalAvailable } from "@/lib/opportunities";
import { BrandLogo } from "@/components/beer-money/brand-logo";
import { useOpportunityProgress } from "@/lib/opportunity-progress";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Hoje — Beer Money App" },
    { name: "description", content: "Consulta bónus de registo verificados, capital exigido e prazos de pagamento." },
    { property: "og:title", content: "Hoje — Beer Money App" },
    { property: "og:description", content: "Bónus de registo com condições apresentadas de forma factual." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: TodayPage,
});

function TodayPage() {
  const { progress } = useOpportunityProgress();
  const ranked = [...opportunities].sort((a,b) => b.reward - a.reward);
  const completed = ranked.filter((item) => progress[item.id] === "completed");
  const claimed = completed.reduce((sum,item) => sum + item.guaranteedReward, 0);
  const available = totalAvailable - claimed;
  const remaining = ranked.filter((item) => progress[item.id] !== "completed").length;
  const percent = Math.round((claimed / totalAvailable) * 100);
  const featured = [opportunities.find((item) => item.id === "coinbase-recompensa"), opportunities.find((item) => item.id === "bybit-recompensa")].filter((item): item is NonNullable<typeof item> => Boolean(item));
  const rest = ranked.filter((item) => !featured.some((pick) => pick.id === item.id));
  return <AppShell action={<Button asChild variant="ghost" size="icon" aria-label="Abrir alertas"><Link to="/alertas"><BellRing /></Link></Button>}>
    <section className="px-5 pb-7 pt-1 motion-rise">
      <div className="value-progress" role="progressbar" aria-label={`${claimed} euros reclamados de ${totalAvailable} euros`} aria-valuemin={0} aria-valuemax={totalAvailable} aria-valuenow={claimed}>
        <div className="value-progress-heading">
          <div><span>Mínimo documentado disponível</span><strong>{available}€</strong></div>
          <span className="value-progress-percent">{percent}% concluído</span>
        </div>
        <p className="value-progress-count">{remaining} ofertas por concluir</p>
        <div className="value-progress-track"><div className="value-progress-fill" style={{ width: `${percent}%` }} /></div>
        <div className="value-progress-footer"><span>{claimed}€ concluídos</span><span>{available}€ mínimos disponíveis</span></div>
      </div>
      <h1 className="sr-only">Recompensas mínimas documentadas</h1>
    </section>
    <section className="pb-7"><div className="section-heading section-heading-stacked"><h2 className="text-xl font-bold leading-tight">Ofertas verificadas</h2><Link to="/explorar" className="text-xs font-semibold text-primary">Consultar todas as ofertas</Link></div><div className="featured-grid px-5">{featured.map((item)=><Link key={item.id} to="/oportunidades/$id" params={{id:item.id}} className="featured-opportunity"><div className="flex items-start justify-between gap-3"><div><p className="featured-kicker text-left">Recompensa</p><p className="featured-reward">{item.rewardLabel}</p></div><BrandLogo name={item.brand} large/></div><div className="mt-3 flex items-center gap-2"><h3 className="text-[15px] font-semibold">{item.brand}</h3><span className="trust-label"><CheckCircle2/> Verificada</span></div><p className="mt-1 text-xs text-muted-foreground">{item.title}</p><dl className="offer-terms offer-terms-compact"><div><dt>Capital</dt><dd>{item.capitalRequired}</dd></div><div><dt>Pagamento</dt><dd>{item.payoutTime}</dd></div><div><dt>Tempo</dt><dd>{item.time}</dd></div></dl><span className="featured-action">{item.actionLabel}</span></Link>)}</div></section>
    <section className="px-5 pb-8"><div className="opportunity-list">{rest.map((item)=><Link key={item.id} to="/oportunidades/$id" params={{id:item.id}} className="opportunity-list-row"><div className="reward-column"><strong>{item.rewardLabel}</strong><span>Recompensa</span></div><div className="min-w-0 flex flex-1 items-center gap-2.5"><BrandLogo name={item.brand}/><div className="min-w-0"><h3 className="truncate text-sm font-semibold">{item.brand}</h3><p className="mt-0.5 text-[11px] text-muted-foreground">Capital {item.capitalRequired}</p><p className="text-[11px] text-muted-foreground">Pagamento {item.payoutTime}</p></div></div></Link>)}</div></section>
  </AppShell>;
}
