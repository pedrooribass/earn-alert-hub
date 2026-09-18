import { Link } from "@tanstack/react-router";
import { Bookmark, CheckCircle2 } from "lucide-react";
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
      <div><p className="reward-overline">Recompensa</p><p className="value-display">{item.rewardLabel}</p></div>
      <Button variant="ghost" size="icon" aria-label={saved ? "Remover dos guardados" : "Guardar oportunidade"} onClick={() => { setSaved(!saved); navigator.vibrate?.(12); }} className={saved ? "text-primary" : "text-muted-foreground"}>
        <Bookmark className={saved ? "fill-current" : ""} />
      </Button>
    </div>
    <div className="offer-brand-row"><BrandLogo name={item.brand} /><div className="min-w-0"><h3 className="truncate text-[15px] font-semibold">{item.brand}</h3><p className="trust-label"><CheckCircle2/> Oferta verificada</p></div>{personalStatus !== "not-started" && <span className={`status-chip ${personalStatus === "completed" ? "status-chip-complete" : ""}`}>{progressLabels[personalStatus]}</span>}</div>
    <p className="mt-3 text-sm font-semibold leading-snug">{item.title}</p>
    <p className="mt-1 line-clamp-2 text-xs leading-[18px] text-muted-foreground">{item.summary}</p>{item.insight && <p className="mt-1.5 text-xs font-semibold text-primary">{item.insight}</p>}
    <dl className="offer-terms"><div><dt>Capital exigido</dt><dd>{item.capitalRequired}</dd></div><div><dt>Pagamento</dt><dd>{item.payoutTime}</dd></div><div><dt>Tempo necessário</dt><dd>{item.time}</dd></div></dl>
    <Button asChild variant={personalStatus === "completed" ? "secondary" : "default"} className="mt-4 h-12 w-full"><Link to="/oportunidades/$id" params={{ id: item.id }}>{personalStatus === "completed" ? `Rever condições da ${item.brand}` : item.actionLabel}</Link></Button>
  </article>;
}
