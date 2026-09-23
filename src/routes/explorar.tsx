import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/beer-money/app-shell";
import { OpportunityCard } from "@/components/beer-money/opportunity-card";
import { Button } from "@/components/ui/button";
import { opportunities } from "@/lib/opportunities";
import { offerContent } from "@/lib/offer-content";
import { useT } from "@/lib/i18n";

const categories = ["Destaques","Dinheiro rápido","Cashback","Contas","Crypto","Questionários"];
export const Route = createFileRoute("/explorar")({ head: () => ({ meta: [{ title: "Explorar oportunidades — Beer Money App" },{ name: "description", content: "Pesquisa e filtra oportunidades relevantes em Portugal." },{ property: "og:title", content: "Explorar — Beer Money App" },{ property: "og:description", content: "Oportunidades organizadas por categoria, valor e urgência." },{ property: "og:type", content: "website" },{ name: "twitter:card", content: "summary_large_image" }] }), component: ExplorePage });
function ExplorePage() {
 const [query,setQuery]=useState(""); const [category,setCategory]=useState("Destaques");
 const { locale } = useT();
 const filtered=useMemo(()=>opportunities.filter(i=>{const content=offerContent(locale,i.id);return content?.discovery.includes(category)&&(i.brand+" "+content.title+" "+content.summary).toLowerCase().includes(query.toLowerCase())}),[query,category,locale]);
  return <AppShell title="Explorar" eyebrow="Ofertas verificadas">
  <div className="px-5 pb-2 pt-2"><p className="mb-3 max-w-sm text-lg font-bold leading-snug">Compara bónus e condições</p><label className="search-field"><Search className="size-5 text-muted-foreground"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Pesquisar marca ou bónus" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" /></label></div>
  <div className="category-nav">{categories.map(c=><Button key={c} variant="ghost" onClick={()=>setCategory(c)} className={category===c?"category-link category-link-active":"category-link"}>{c}</Button>)}</div>
  <div className="space-y-3 px-5 pb-5">{filtered.map(item=><OpportunityCard key={item.id} item={item}/>)}{filtered.length===0&&<div className="py-16 text-center"><p className="font-bold">Nada encontrado</p><p className="mt-1 text-sm text-muted-foreground">Experimenta outra pesquisa ou categoria.</p></div>}</div>
 </AppShell>;
}
