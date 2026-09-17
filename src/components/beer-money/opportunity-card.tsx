import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Bookmark, Clock3 } from "lucide-react";
import { useState } from "react";
import type { Opportunity } from "@/lib/opportunities";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "./brand-logo";

export function OpportunityCard({ item, compact = false }: { item: Opportunity; compact?: boolean }) {
  const [saved, setSaved] = useState(false);
  return <article className={`opportunity-card ${compact ? "min-w-[312px] snap-start" : ""}`}>
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <BrandLogo name={item.brand} large />
        <p className="mt-4 truncate text-xl font-extrabold">{item.brand}</p>
        <p className="mt-1 text-[11px] font-bold uppercase text-muted-foreground">{item.category}</p>
      </div>
      <Button variant="ghost" size="icon" aria-label={saved ? "Remover dos guardados" : "Guardar oportunidade"} onClick={() => { setSaved(!saved); navigator.vibrate?.(12); }} className={saved ? "text-primary" : "text-muted-foreground"}>
        <Bookmark className={saved ? "fill-current" : ""} />
      </Button>
    </div>
    <h3 className="mt-6 text-[18px] font-bold leading-tight">{item.title}</h3>
    <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">{item.summary}</p>
    <div className="mt-6 flex items-end justify-between border-t pt-4">
      <div><p className="text-[11px] font-semibold text-muted-foreground">Até</p><p className="value-display">{item.reward}€</p></div>
      <div className="text-right text-xs text-muted-foreground"><p className="flex items-center justify-end gap-1"><Clock3 className="size-3" />{item.time}</p><p className={item.urgent ? "mt-1 font-bold text-urgent" : "mt-1"}>{item.deadline}</p></div>
    </div>
    <Button asChild variant="ghost" className="mt-3 w-full justify-between px-0 hover:bg-transparent"><Link to="/oportunidades/$id" params={{ id: item.id }}>Ver oportunidade <ArrowUpRight /></Link></Button>
  </article>;
}
