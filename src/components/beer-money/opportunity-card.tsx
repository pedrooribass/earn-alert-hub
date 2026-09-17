import { Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, Clock3, Gauge } from "lucide-react";
import { useState } from "react";
import type { Opportunity } from "@/lib/opportunities";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "./brand-logo";

export function OpportunityCard({ item, compact = false }: { item: Opportunity; compact?: boolean }) {
  const [saved, setSaved] = useState(false);
  return <article className={`opportunity-card ${compact ? "min-w-[312px] snap-start" : ""}`}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-4"><BrandLogo name={item.brand} large /><div className="min-w-0"><p className="truncate text-lg font-bold">{item.brand}</p><p className="mt-1 text-[11px] font-semibold text-positive">{item.status}</p></div></div>
      <Button variant="ghost" size="icon" aria-label={saved ? "Remover dos guardados" : "Guardar oportunidade"} onClick={() => { setSaved(!saved); navigator.vibrate?.(12); }} className={saved ? "text-primary" : "text-muted-foreground"}>
        <Bookmark className={saved ? "fill-current" : ""} />
      </Button>
    </div>
    <h3 className="mt-5 text-lg font-semibold leading-snug">{item.title}</h3>
    <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">{item.summary}</p>
    <p className="mt-5 value-display">{item.rewardLabel}</p><p className="mt-1 text-xs font-medium text-muted-foreground">{item.rewardType}</p>
    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Clock3 className="size-3.5"/>{item.time}</span><span className="flex items-center gap-1.5"><Gauge className="size-3.5"/>{item.difficulty}</span></div>
    <Button asChild className="mt-5 h-11 w-full justify-between"><Link to="/oportunidades/$id" params={{ id: item.id }}>Abrir oportunidade <ArrowRight /></Link></Button>
  </article>;
}
