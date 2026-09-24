import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/beer-money/app-shell";
import { OpportunityCard } from "@/components/beer-money/opportunity-card";
import { Button } from "@/components/ui/button";
import { opportunities } from "@/lib/opportunities";
import { offerContent } from "@/lib/offer-content";
import { useT } from "@/lib/i18n";

/** As categorias são as do catálogo em português; só o rótulo é traduzido. */
const categories = ["Destaques", "Dinheiro rápido", "Contas", "Crypto", "Investimento", "Questionários"];

export const Route = createFileRoute("/explorar")({
  head: () => ({ meta: [
    { title: "Explorar — Beer Money App" },
    { name: "description", content: "Pesquisa e compara ofertas por categoria." },
    { property: "og:title", content: "Explorar — Beer Money App" },
    { property: "og:description", content: "Ofertas organizadas por categoria." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: ExplorePage,
});

function ExplorePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Destaques");
  const { locale, t } = useT();

  const filtered = useMemo(() => opportunities.filter((offer) => {
    const content = offerContent(locale, offer.id);
    if (!content) return false;
    const haystack = `${offer.brand} ${content.title} ${content.summary}`.toLowerCase();
    const ptContent = offerContent("pt", offer.id);
    return (ptContent?.discovery.includes(category) ?? false) && haystack.includes(query.toLowerCase());
  }), [query, category, locale]);

  return <AppShell title={t("explore.title")} eyebrow={t("explore.eyebrow")}>
    <div className="px-5 pb-2 pt-1">
      <p className="mb-3 max-w-sm text-[17px] font-bold leading-snug">{t("explore.heading")}</p>
      <label className="search-field">
        <Search className="size-5 text-muted-foreground" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("explore.search")} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      </label>
    </div>
    <div className="category-nav">
      {categories.map((name) => <Button key={name} variant="ghost" onClick={() => setCategory(name)} className={category === name ? "category-link category-link-active" : "category-link"}>{t(`category.${name}`)}</Button>)}
    </div>
    <div className="space-y-3 px-5 pb-5">
      {filtered.map((item) => <OpportunityCard key={item.id} item={item} />)}
      {filtered.length === 0 && <div className="empty-state mt-2"><h3>{t("explore.empty")}</h3><p>{t("explore.emptyBody")}</p></div>}
    </div>
  </AppShell>;
}