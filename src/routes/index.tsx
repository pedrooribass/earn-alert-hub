import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BellRing, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/beer-money/app-shell";
import { OpportunityCard } from "@/components/beer-money/opportunity-card";
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
  const newItems = opportunities.filter((item) => item.isNew);
  const urgent = opportunities.filter((item) => item.urgent);
  return <AppShell action={<Button asChild variant="ghost" size="icon" aria-label="Abrir alertas"><Link to="/alertas"><BellRing /></Link></Button>}>
    <section className="px-5 pb-7 pt-5 motion-rise">
      <p className="eyebrow">Aconteceu desde ontem</p>
      <h1 className="mt-3 max-w-sm text-[36px] font-extrabold leading-[1.04]">Três oportunidades que merecem atenção.</h1>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">Uma é nova, uma melhorou e outra termina hoje.</p>
    </section>
    <section className="px-5 pb-9">
      <Link to="/oportunidades/$id" params={{id:newItems[0]?.id ?? opportunities[0].id}} className="featured-opportunity">
        <div className="flex items-start justify-between"><BrandLogo name={newItems[0]?.brand ?? opportunities[0].brand} large/><span className="editorial-index">01</span></div>
        <p className="mt-7 text-[11px] font-bold uppercase text-primary">Em destaque</p>
        <h2 className="mt-2 text-3xl font-extrabold">{newItems[0]?.brand}</h2>
        <p className="mt-2 text-lg font-semibold">{newItems[0]?.title}</p>
        <div className="mt-8 flex items-end justify-between border-t border-primary-foreground/20 pt-5"><div><p className="text-xs opacity-70">Valor da oportunidade</p><p className="mt-1 text-3xl font-bold">Até {newItems[0]?.reward}€</p></div><ArrowUpRight className="size-5"/></div>
      </Link>
    </section>
    <section className="pb-7"><div className="section-heading"><div><p className="eyebrow">Edição de hoje</p><h2 className="mt-1 text-2xl font-extrabold">Acabadas de chegar</h2></div><Link to="/explorar" className="text-xs font-bold text-primary">Ver todas</Link></div><div className="horizontal-scroll">{newItems.slice(1,4).map((item) => <OpportunityCard key={item.id} item={item} compact />)}</div></section>
    <section className="pb-7"><div className="section-heading"><div><p className="eyebrow">Última chamada</p><h2 className="mt-1 text-2xl font-extrabold">A terminar</h2></div></div><div className="divide-y border-y px-5">{urgent.slice(0,3).map((item) => <Link key={item.id} to="/oportunidades/$id" params={{ id: item.id }} className="brand-list-row"><BrandLogo name={item.brand}/><div className="min-w-0 flex-1"><p className="truncate text-base font-extrabold">{item.brand}</p><p className="truncate text-sm text-muted-foreground">{item.title}</p><p className="mt-1 text-xs font-semibold text-urgent">{item.deadline}</p></div><div className="text-right"><strong className="block text-lg">{item.reward}€</strong><ChevronRight className="ml-auto mt-1 size-4 text-muted-foreground" /></div></Link>)}</div></section>
    <section className="mx-5 mb-6 flex items-center justify-between border-t pt-5 text-sm"><span className="text-muted-foreground">{opportunities.length} oportunidades verificadas</span><strong>{totalAvailable}€ disponíveis</strong></section>
  </AppShell>;
}
