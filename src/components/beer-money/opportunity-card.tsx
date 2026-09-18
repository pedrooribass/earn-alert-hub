import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import { capitalLabel, offerPresentation, payoutLabel, rewardLabel, type Opportunity } from "@/lib/opportunities";
import { Button } from "@/components/ui/button";
import { progressLabels, useOpportunityProgress } from "@/lib/opportunity-progress";
import { BrandLogo } from "./brand-logo";
import { VerificationStatus } from "./verification-status";

export function OpportunityCard({ item, compact = false }: { item: Opportunity; compact?: boolean }) {
  const [saved, setSaved] = useState(false);
  const { progress } = useOpportunityProgress();
  const personalStatus = progress[item.id] ?? "not-started";
  const presentation = offerPresentation[item.id];
  if (!presentation) return null;
  const blocked = item.capitalRequired.kind === "unknown";
  return <article className={`opportunity-card ${compact ? "min-w-[312px] snap-start" : ""}`}>
    <div className="flex items-start justify-between gap-3">
      <div><p className="reward-overline">Recompensa</p><p className="value-display">{rewardLabel(item)}</p></div>
      <Button variant="ghost" size="icon" aria-label={saved ? "Remover dos guardados" : "Guardar oportunidade"} onClick={() => { setSaved(!saved); navigator.vibrate?.(12); }} className={saved ? "text-primary" : "text-muted-foreground"}>
        <Bookmark className={saved ? "fill-current" : ""} />
      </Button>
    </div>
    <div className="offer-brand-row"><BrandLogo name={item.brand} /><div className="min-w-0"><h3 className="truncate text-[15px] font-semibold">{item.brand}</h3><VerificationStatus verification={item.verification}/></div>{personalStatus !== "not-started" && <span className={`status-chip ${personalStatus === "completed" ? "status-chip-complete" : ""}`}>{progressLabels[personalStatus]}</span>}</div>
    <p className="mt-3 text-sm font-semibold leading-snug">{presentation.title}</p>
    <p className="mt-1 line-clamp-2 text-xs leading-[18px] text-muted-foreground">{presentation.summary}</p>
    <dl className="offer-terms"><div><dt>Custa-te</dt><dd className={blocked ? "text-caution" : undefined}>{capitalLabel(item.capitalRequired)}</dd></div><div><dt>Pagamento</dt><dd>{payoutLabel(item)}</dd></div><div><dt>Trabalho ativo</dt><dd>{item.timeToComplete} min</dd></div></dl>
    {item.hasCommission && <p className="mt-3 text-xs text-muted-foreground">Recebemos comissão desta oferta.</p>}
    {blocked ? <Button disabled className="mt-4 h-12 w-full">Ainda a verificar</Button> : <Button asChild variant={personalStatus === "completed" ? "secondary" : "default"} className="mt-4 h-12 w-full"><Link to="/oportunidades/$id" params={{ id: item.id }}>{personalStatus === "completed" ? `Rever condições da ${item.brand}` : presentation.actionLabel}</Link></Button>}
  </article>;
}
