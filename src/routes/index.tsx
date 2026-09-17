import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BellRing, ChevronRight, Sparkles } from "lucide-react";
import { AppShell } from "@/components/beer-money/app-shell";
import { OpportunityCard } from "@/components/beer-money/opportunity-card";
import { Button } from "@/components/ui/button";
import { opportunities, totalAvailable } from "@/lib/opportunities";

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
    <section className="px-5 pb-8 pt-4">
      <div className="motion-rise rounded-[16px] bg-primary px-5 py-6 text-primary-foreground">
        <div className="flex items-center gap-2 text-xs font-bold opacity-80"><Sparkles className="size-4" /> DESDE ONTEM</div>
        <h1 className="mt-4 font-editorial text-[34px] font-semibold leading-[1.02]">Há 3 coisas novas<br />para ti.</h1>
        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-primary-foreground/20 pt-4">
          <div><strong className="block text-xl">2</strong><span className="text-[11px] opacity-75">novas</span></div>
          <div><strong className="block text-xl">+30€</strong><span className="text-[11px] opacity-75">aumento</span></div>
          <div><strong className="block text-xl">1</strong><span className="text-[11px] opacity-75">urgente</span></div>
        </div>
      </div>
    </section>
    <section className="px-5 pb-9">
      <p className="text-xs font-bold text-muted-foreground">DISPONÍVEIS AGORA</p>
      <div className="mt-3 flex items-end justify-between"><p className="big-number motion-count">{totalAvailable}€</p><Link to="/explorar" className="mb-1 flex items-center text-sm font-bold text-primary">Ver tudo <ArrowUpRight className="ml-1 size-4" /></Link></div>
    </section>
    <section className="pb-5"><div className="section-heading"><h2 className="text-xl font-extrabold">Novidades</h2><span className="text-xs font-bold text-muted-foreground">{newItems.length} novas</span></div><div className="horizontal-scroll">{newItems.slice(0,3).map((item) => <OpportunityCard key={item.id} item={item} compact />)}</div></section>
    <section className="pb-6"><div className="section-heading"><h2 className="text-xl font-extrabold">A terminar</h2><Link to="/explorar" className="text-xs font-bold text-primary">Ver todas</Link></div><div className="space-y-3 px-5">{urgent.slice(0,2).map((item) => <Link key={item.id} to="/oportunidades/$id" params={{ id: item.id }} className="flex items-center gap-3 rounded-xl border bg-card p-3.5"><div className="brand-tile">{item.brand[0]}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-extrabold">{item.brand}</p><p className="mt-0.5 text-xs font-semibold text-urgent">{item.deadline}</p></div><strong className="text-lg">{item.reward}€</strong><ChevronRight className="size-4 text-muted-foreground" /></Link>)}</div></section>
  </AppShell>;
}
