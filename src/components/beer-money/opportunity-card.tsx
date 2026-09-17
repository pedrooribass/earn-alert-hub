import { Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, Clock3, Gauge } from "lucide-react";
import { useState } from "react";
import type { Opportunity } from "@/lib/opportunities";
import { Button } from "@/components/ui/button";
import { progressLabels, useOpportunityProgress } from "@/lib/opportunity-progress";
import { BrandLogo } from "./brand-logo";

export function OpportunityCard({ item, compact = false }: { item: Opportunity; compact?: boolean }) {
  const [saved, setSaved] = useState(false);
  const { progress } = useOpportunityProgress();
  const personalStatus = progress[item.id] ?? "not-started";
  return <article className={`opportunity-card ${compact ? "min-w-[312px] snap-start" : ""}`}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3"><BrandLogo name={item.brand} large /><div className="min-w-0"><p className="truncate text-base font-semibold">{item.brand}</p><p className={`mt-0.5 text-[11px] font-semibold ${personalStatus === "completed" ? "text-muted-foreground" : "text-positive"}`}>{progressLabels[personalStatus]}</p></div></div>
      <Button variant="ghost" size="icon" aria-label={saved ? "Remover dos guardados" : "Guardar oportunidade"} onClick={() => { setSaved(!saved); navigator.vibrate?.(12); }} className={saved ? "text-primary" : "text-muted-foreground"}>
        <Bookmark className={saved ? "fill-current" : ""} />
      </Button>
    </div>
    <h3 className="mt-4 text-base font-semibold leading-snug">{item.title}</h3>
    <p className="mt-1.5 line-clamp-1 text-xs leading-[18px] text-muted-foreground">{item.summary}</p>{item.insight && <p className="mt-1.5 text-xs font-semibold text-primary">{item.insight}</p>}
    <p className="mt-3 value-display">{item.rewardLabel}</p><p className="mt-1 text-[11px] font-medium text-muted-foreground">{item.rewardType}</p>
    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Clock3 className="size-3.5"/>{item.time}</span><span className="flex items-center gap-1.5"><Gauge className="size-3.5"/>{item.difficulty}</span></div>
    <Button asChild variant={personalStatus === "completed" ? "secondary" : "default"} className="mt-4 h-12 w-full justify-between"><Link to="/oportunidades/$id" params={{ id: item.id }}>{personalStatus === "not-started" ? "Começar" : personalStatus === "in-progress" ? "Continuar" : "Ver conclusão"}<ArrowRight /></Link></Button>
  </article>;
}
