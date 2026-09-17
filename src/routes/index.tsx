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
    <section className="px-5 pb-10 pt-7 motion-rise"><p className="eyebrow">Disponível hoje</p><h1 className="mt-3 max-w-sm text-[42px] font-extrabold leading-[1.02]">{totalAvailable}€ disponíveis agora</h1><p className="mt-4 max-w-xs text-base leading-6 text-muted-foreground">5 oportunidades foram adicionadas ou melhoraram desde ontem.</p><div className="value-meter mt-8" aria-label="145 euros disponíveis hoje"><div className="value-liquid"/><div className="relative z-10 flex h-full items-center justify-between px-5"><span className="text-xs font-bold text-primary-foreground/70">Valor ativo</span><strong className="text-xl text-primary-foreground">145€</strong></div></div></section>
    <section className="pb-8"><div className="section-heading"><div><p className="eyebrow">Desde a última visita</p><h2 className="mt-2 text-[28px] font-extrabold">O que mudou</h2></div><Link to="/explorar" className="text-xs font-bold text-primary">Ver tudo</Link></div><div className="px-5">{changes.map((item)=><Link key={item.id} to="/oportunidades/$id" params={{id:item.id}} className="change-row"><BrandLogo name={item.brand}/><div className="min-w-0 flex-1"><p className={item.change==="ending"?"change-label text-urgent":"change-label text-positive"}>{item.change==="new"?"Novo":item.change==="improved"?"Melhorou":"A terminar"}</p><h3 className="mt-1 truncate text-base font-extrabold">{item.brand}</h3><p className="mt-0.5 truncate text-sm text-muted-foreground">{item.title}</p></div><div className="text-right"><strong>{item.rewardLabel}</strong><ChevronRight className="ml-auto mt-2 size-4 text-muted-foreground"/></div></Link>)}</div></section>
    <section className="px-5 pb-8"><Link to="/oportunidades/$id" params={{id:"coinbase-recompensa"}} className="featured-opportunity"><div className="flex items-start justify-between"><BrandLogo name="Coinbase" large/><span className="text-xs font-bold opacity-60">EM DESTAQUE</span></div><h2 className="mt-7 text-3xl font-extrabold">Coinbase</h2><p className="mt-2 text-lg font-semibold">Recebe 20€</p><div className="mt-8 flex items-center justify-between"><span className="text-sm opacity-75">Recompensa imediata · 5 min</span><ArrowUpRight className="size-5"/></div></Link></section>
  </AppShell>;
}
