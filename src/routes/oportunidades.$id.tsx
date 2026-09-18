import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Bell, Bookmark, Check, Clock3, ShieldCheck, WalletCards } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { opportunities } from "@/lib/opportunities";
import { BrandLogo } from "@/components/beer-money/brand-logo";
import { progressLabels, useOpportunityProgress, type OpportunityProgress } from "@/lib/opportunity-progress";

export const Route = createFileRoute("/oportunidades/$id")({
  loader: ({ params }) => { const item=opportunities.find(o=>o.id===params.id); if(!item) throw notFound(); return item; },
  head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.brand}: ${loaderData.rewardLabel} — Beer Money App` },{ name:"description",content:loaderData.summary},{ property:"og:title",content:`${loaderData.brand}: ${loaderData.rewardLabel}`},{ property:"og:description",content:loaderData.summary},{ property:"og:type",content:"article"},{ name:"twitter:card",content:"summary_large_image"}] : [{title:"Oportunidade indisponível — Beer Money App"},{name:"robots",content:"noindex"}] }),
  component: DetailPage,
});

function DetailPage(){
  const item=Route.useLoaderData();
  const [saved,setSaved]=useState(false);
  const {progress,setProgress}=useOpportunityProgress();
  const current=progress[item.id] ?? "not-started";
  const options: OpportunityProgress[]=["not-started","in-progress","completed"];
  return <div className="app-frame">
    <header className="app-header"><Button asChild variant="ghost" size="icon" aria-label="Voltar"><Link to="/"><ArrowLeft/></Link></Button><span className="text-sm font-semibold">Oportunidade</span><Button variant="ghost" size="icon" aria-label="Guardar" onClick={()=>setSaved(!saved)} className={saved?"text-primary":""}><Bookmark className={saved?"fill-current":""}/></Button></header>
    <main className="safe-bottom pb-32">
       <section className="px-5 pt-3"><div className="detail-reward"><p>Recompensa</p><strong>{item.rewardLabel}</strong><span>{item.rewardType}</span></div><div className="detail-brand"><BrandLogo name={item.brand} large/><div><p className="trust-label"><ShieldCheck/> Oferta verificada</p><h1>{item.brand}</h1></div></div><h2 className="mt-3 text-base font-semibold leading-snug">{item.title}</h2><p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">{item.summary}</p>{item.insight&&<p className="mt-2 text-[13px] font-semibold text-foreground">{item.insight}</p>}{current !== "not-started" && <p className="status-line mt-3">{progressLabels[current]}</p>}</section>
      <section className="px-5 py-5"><h2 className="text-base font-bold">Estado da campanha</h2><div className="progress-selector mt-3">{options.map((status)=><Button key={status} variant={current===status?"default":"ghost"} onClick={()=>setProgress(item.id,status)}>{status==="completed"&&<Check/>}{progressLabels[status]}</Button>)}</div></section>
       <section className="px-5 pb-6"><h2 className="text-base font-bold">Condições</h2><div className="mt-2 divide-y"><div className="detail-row"><WalletCards/><span>Capital exigido</span><strong>{item.capitalRequired}</strong></div><div className="detail-row"><Clock3/><span>Pagamento</span><strong>{item.payoutTime}</strong></div><div className="detail-row"><Clock3/><span>Tempo necessário</span><strong>{item.time}</strong></div><div className="detail-row"><ShieldCheck/><span>Dificuldade</span><strong>{item.difficulty}</strong></div><div className="detail-row"><Bell/><span>Fim da oferta</span><strong>{item.deadline}</strong></div></div></section>
       <section className="px-5 py-2"><h2 className="text-base font-bold">Passos</h2><ol className="mt-3 space-y-4">{item.steps.map((step,i)=><li key={step} className="flex gap-3"><span className="step-number">{i+1}</span><p className="pt-1 text-[13px] leading-5">{step}</p></li>)}</ol><div className="mt-6 flex gap-3 border-t pt-4"><Check className="mt-0.5 size-5 flex-none text-positive"/><p className="text-xs leading-5 text-muted-foreground">Oferta verificada. Confirma as condições atuais no site da marca antes de abrir a conta.</p></div></section>
    </main>
     <div className="bottom-action"><Button asChild size="lg" className="h-12 w-full text-[15px]"><a href={item.url} target="_blank" rel="noreferrer" onClick={()=>current==="not-started"&&setProgress(item.id,"in-progress")}>{item.actionLabel}</a></Button></div>
  </div>;
}