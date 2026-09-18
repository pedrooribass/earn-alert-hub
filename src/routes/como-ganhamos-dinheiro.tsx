import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/beer-money/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/como-ganhamos-dinheiro")({
  head: () => ({ meta: [
    { title: "Como ganhamos dinheiro — Beer Money App" },
    { name: "description", content: "Informação sobre relações comerciais e comissões da Beer Money App." },
    { property: "og:title", content: "Como ganhamos dinheiro — Beer Money App" },
    { property: "og:description", content: "Informação sobre relações comerciais e comissões." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: RevenuePage,
});

function RevenuePage() {
  return <AppShell title="Como ganhamos dinheiro" action={<Button asChild variant="ghost" size="icon" aria-label="Voltar à conta"><Link to="/conta"><ArrowLeft/></Link></Button>}>
    <article className="px-5 py-5">
      <p className="text-sm leading-6 text-muted-foreground">[PREENCHER — explicar a relação de afiliação em linguagem simples]</p>
    </article>
  </AppShell>;
}