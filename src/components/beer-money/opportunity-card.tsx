import { Link } from "@tanstack/react-router";
import { Bookmark, Clock3, TrendingUp } from "lucide-react";
import { useState } from "react";
import type { Opportunity } from "@/lib/opportunities";
import { Button } from "@/components/ui/button";

export function OpportunityCard({ item, compact = false }: { item: Opportunity; compact?: boolean }) {
  const [saved, setSaved] = useState(false);
  return <article className={`opportunity-card accent-${item.accent} ${compact ? "min-w-[286px] snap-start" : ""}`}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="brand-tile" aria-hidden="true">{item.brand.slice(0, 1)}</div>
        <div className="min-w-0"><p className="truncate text-sm font-extrabold">{item.brand}</p><p className="mt-0.5 truncate text-xs text-muted-foreground">{item.category}</p></div>
      </div>
      <Button variant="ghost" size="icon" aria-label={saved ? "Remover dos guardados" : "Guardar oportunidade"} onClick={() => { setSaved(!saved); navigator.vibrate?.(12); }} className={saved ? "text-primary" : "text-muted-foreground"}>
        <Bookmark className={saved ? "fill-current" : ""} />
      </Button>
    </div>
    <div className="mt-5 flex items-end justify-between gap-3">
      <div><p className="text-xs font-semibold text-muted-foreground">Até</p><p className="value-display">{item.reward}€</p></div>
      {item.previousReward && <div className="mb-1 flex items-center gap-1 rounded-full bg-positive-soft px-2.5 py-1 text-xs font-bold text-positive"><TrendingUp className="size-3.5" /> de {item.previousReward}€</div>}
    </div>
    <h3 className="mt-4 text-[17px] font-extrabold leading-tight">{item.title}</h3>
    <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">{item.summary}</p>
    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
      <span className="meta-pill"><Clock3 />{item.time}</span><span className="meta-pill">{item.difficulty}</span><span className={item.urgent ? "meta-pill text-urgent" : "meta-pill"}>{item.deadline}</span>
    </div>
    <Button asChild variant="outline" className="mt-5 w-full"><Link to="/oportunidades/$id" params={{ id: item.id }}>Ver detalhes</Link></Button>
  </article>;
}
