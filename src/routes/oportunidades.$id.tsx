import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Check, Clock3, TriangleAlert, WalletCards } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { capitalLabel, offerPresentation, opportunities, payoutLabel, rewardLabel } from "@/lib/opportunities";
import { BrandLogo } from "@/components/beer-money/brand-logo";
import { VerificationStatus } from "@/components/beer-money/verification-status";
import { progressLabels, useOpportunityProgress, type OpportunityProgress } from "@/lib/opportunity-progress";

export const Route = createFileRoute("/oportunidades/$id")({
  loader: ({ params }) => { const item = opportunities.find((offer) => offer.id === params.id); if (!item) throw notFound(); return item; },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Oportunidade indisponível — Beer Money App" }, { name: "description", content: "Esta oportunidade não está disponível." }, { property: "og:title", content: "Oportunidade indisponível — Beer Money App" }, { property: "og:description", content: "Esta oportunidade não está disponível." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] };
    const content = offerPresentation[loaderData.id];
    const description = content?.summary ?? "Consulta as condições documentadas desta oferta.";
    return { meta: [{ title: `${loaderData.brand}: ${rewardLabel(loaderData)} — Beer Money App` }, { name: "description", content: description }, { property: "og:title", content: `${loaderData.brand}: ${rewardLabel(loaderData)}` }, { property: "og:description", content: description }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: DetailPage,
});

function DetailPage() {
  const item = Route.useLoaderData();
  const content = offerPresentation[item.id];
  const [saved, setSaved] = useState(false);
  const { progress, setProgress } = useOpportunityProgress();
  const current = progress[item.id] ?? "not-started";
  const options: OpportunityProgress[] = ["not-started", "in-progress", "completed"];
  const blocked = item.capitalRequired.kind === "unknown";
  const hasRiskNotice = item.category === "crypto" || item.category === "deposito";
  if (!content) return null;

  return <div className="app-frame">
    <header className="app-header"><Button asChild variant="ghost" size="icon" aria-label="Voltar"><Link to="/"><ArrowLeft/></Link></Button><span className="text-sm font-semibold">Oportunidade</span><Button variant="ghost" size="icon" aria-label="Guardar" onClick={() => setSaved(!saved)} className={saved ? "text-primary" : ""}><Bookmark className={saved ? "fill-current" : ""}/></Button></header>
    <main className="safe-bottom pb-32">
      <section className="px-5 pt-3"><div className="detail-reward"><p>Recompensa</p><strong>{rewardLabel(item)}</strong><span>{item.payout.conditions}</span></div><div className="detail-brand"><BrandLogo name={item.brand} large/><div><VerificationStatus verification={item.verification}/><h1>{item.brand}</h1></div></div><h2 className="mt-3 text-base font-semibold leading-snug">{content.title}</h2><p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">{content.summary}</p>{item.hasCommission && <p className="mt-2 text-xs text-muted-foreground">Recebemos comissão desta oferta.</p>}{current !== "not-started" && <p className="status-line mt-3">{progressLabels[current]}</p>}</section>
      <section className="px-5 py-5"><h2 className="text-base font-bold">Estado da oferta</h2><div className="progress-selector mt-3">{options.map((status) => <Button key={status} variant={current === status ? "default" : "ghost"} className={current === status && status === "completed" ? "completed-control" : undefined} onClick={() => setProgress(item.id, status)}>{status === "completed" && <Check/>}{progressLabels[status]}</Button>)}</div></section>
      <section className="px-5 pb-6"><h2 className="text-base font-bold">Condições</h2><div className="mt-2 divide-y"><div className="detail-row"><WalletCards/><span>Custa-te</span><strong className={blocked ? "text-caution" : undefined}>{capitalLabel(item.capitalRequired)}</strong></div><div className="detail-row"><Clock3/><span>Pagamento</span><strong>{payoutLabel(item)}</strong></div><div className="detail-row"><Clock3/><span>Trabalho ativo</span><strong>{item.timeToComplete} min</strong></div><div className="detail-row"><span aria-hidden="true">—</span><span>Esforço</span><strong>{item.effort === "facil" ? "Fácil" : item.effort === "medio" ? "Médio" : "Difícil"}</strong></div></div></section>
      {hasRiskNotice && <section className="mx-5 mb-6 border border-border p-4"><div className="flex gap-3"><TriangleAlert className="mt-0.5 size-5 flex-none text-caution"/><div><h2 className="text-sm font-bold">Aviso de risco</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">[PREENCHER: aviso de risco]</p></div></div></section>}
      <section className="px-5 py-2"><h2 className="text-base font-bold">Passos</h2><ol className="mt-3 space-y-4">{item.steps.map((step, index) => <li key={`${step.title}-${index}`} className="flex gap-3"><span className="step-number">{index + 1}</span><div className="pt-0.5"><p className="text-[13px] font-semibold leading-5">{step.title}</p><p className="text-xs leading-5 text-muted-foreground">{step.detail}</p></div></li>)}</ol></section>
      <section className="px-5 pb-6 pt-8"><Button asChild variant="link" className="h-auto p-0 text-xs"><Link to="/como-ganhamos-dinheiro">Como ganhamos dinheiro</Link></Button></section>
    </main>
    <div className="bottom-action">{blocked ? <Button disabled size="lg" className="h-12 w-full text-[15px]">Ainda a verificar</Button> : <Button asChild size="lg" className="h-12 w-full text-[15px]"><a href={content.url} target="_blank" rel="noreferrer" onClick={() => current === "not-started" && setProgress(item.id, "in-progress")}>{content.actionLabel}</a></Button>}</div>
  </div>;
}