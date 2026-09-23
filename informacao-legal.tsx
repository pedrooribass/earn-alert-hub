import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/beer-money/app-shell";
import { Button } from "@/components/ui/button";

const sections = [
  "Entidade responsável, NIF e morada",
  "Termos de utilização",
  "Política de privacidade e tratamento de dados (RGPD)",
  "Contacto de suporte e prazo de resposta",
];

export const Route = createFileRoute("/informacao-legal")({
  head: () => ({ meta: [
    { title: "Informação legal — Beer Money App" },
    { name: "description", content: "Entidade responsável, termos, privacidade e suporte da Beer Money App." },
    { property: "og:title", content: "Informação legal — Beer Money App" },
    { property: "og:description", content: "Entidade responsável, termos, privacidade e suporte." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: LegalPage,
});

function LegalPage() {
  return <AppShell title="Informação legal" action={<Button asChild variant="ghost" size="icon" aria-label="Voltar à conta"><Link to="/conta"><ArrowLeft/></Link></Button>}>
    <div className="divide-y px-5 py-3">{sections.map((title) => <section key={title} className="py-5"><h2 className="text-base font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">[PREENCHER]</p></section>)}</div>
  </AppShell>;
}