import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BellRing, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/beer-money/app-shell";
import { Button } from "@/components/ui/button";
import { opportunities, totalAvailable } from "@/lib/opportunities";
import { BrandLogo } from "@/components/beer-money/brand-logo";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Hoje — Beer Money Club" },
    { name: "description", content: "Vê imediatamente as novas oportunidades, aumentos e prazos desde a tua última visita." },
    { property: "og:title", content: "Hoje — Beer Money Club" },
    { property: "og:description", content: "Nunca mais percas uma oportunidade relevante." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: TodayPage,
});

function TodayPage() {
  const changes = [opportunities[2], opportunities[3], opportunities[6]].filter((item): item is NonNullable<typeof item> => Boolean(item));
  return <AppShell action={<Button asChild variant="ghost" size="icon" aria-label="Abrir alertas"><Link to="/alertas"><BellRing /></Link></Button>}>
    <section className="px-5 pb-10 pt-2 motion-rise">
      <div className="value-progress" role="progressbar" aria-label={`0 euros reclamados de ${totalAvailable} euros disponíveis hoje`} aria-valuemin={0} aria-valuemax={totalAvailable} aria-valuenow={0}>
        <div className="value-progress-heading">
          <div><strong>{totalAvailable}€</strong><span>disponíveis hoje</span></div>
          <span className="value-progress-percent">0%</span>
        </div>
        <div className="value-progress-track"><div className="value-progress-fill" /></div>
        <div className="value-progress-footer"><span>0€ reclamados</span><span>{totalAvailable}€</span></div>
      </div>
      <h1 className="sr-only">Oportunidades disponíveis hoje</h1>
      <p className="mt-4 text-sm font-medium text-muted-foreground">5 novidades desde ontem</p>
    </section>
    <section className="pb-8"><div className="section-heading"><div><p className="eyebrow">Desde a última visita</p><h2 className="mt-1.5 text-[22px] font-bold">O que mudou</h2></div><Link to="/explorar" className="text-xs font-semibold text-primary">Ver tudo</Link></div><div className="px-5">{changes.map((item)=><Link key={item.id} to="/oportunidades/$id" params={{id:item.id}} className="change-row"><BrandLogo name={item.brand}/><div className="min-w-0 flex-1"><p className={item.change==="ending"?"change-label text-urgent":"change-label text-positive"}>{item.change==="new"?"Novo":item.change==="improved"?"Melhorou":"A terminar"}</p><h3 className="mt-1 truncate text-[15px] font-bold">{item.brand}</h3><p className="mt-0.5 truncate text-[13px] text-muted-foreground">{item.title}</p></div><div className="text-right"><strong className="text-sm">{item.rewardLabel}</strong><ChevronRight className="ml-auto mt-2 size-4 text-muted-foreground"/></div></Link>)}</div></section>
    <section className="px-5 pb-8"><Link to="/oportunidades/$id" params={{id:"coinbase-recompensa"}} className="featured-opportunity"><div className="flex items-start justify-between"><BrandLogo name="Coinbase" large/><span className="text-[10px] font-bold uppercase opacity-60">Em destaque</span></div><h2 className="mt-6 text-2xl font-bold">Coinbase</h2><p className="mt-1.5 text-base font-semibold">Recebe 20€</p><div className="mt-7 flex items-center justify-between"><span className="text-[13px] opacity-75">Imediata · 5 min</span><ArrowUpRight className="size-5"/></div></Link></section>
  </AppShell>;
}
