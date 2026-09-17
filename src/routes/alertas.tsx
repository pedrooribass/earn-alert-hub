import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock3, CircleDot, Hourglass, Sparkles } from "lucide-react";
import { AppShell } from "@/components/beer-money/app-shell";

export const Route = createFileRoute("/alertas")({ head: () => ({ meta: [{ title: "A tua atividade — Beer Money Club" },{ name: "description", content: "Acompanha oportunidades concluídas, pendentes e recompensas disponíveis." },{ property: "og:title", content: "A tua atividade — Beer Money Club" },{ property: "og:description", content: "Progresso pessoal e mudanças importantes nas tuas oportunidades." },{ property: "og:type", content: "website" },{ name: "twitter:card", content: "summary_large_image" }] }), component: AlertsPage });
const alerts=[
 {title:"Coinbase concluída",detail:"20€ adicionados ao teu progresso",icon:Check,id:"coinbase-recompensa",done:true},
 {title:"Falta concluir o depósito da Bybit",detail:"Deposita 100€ para continuares",icon:CircleDot,id:"bybit-recompensa"},
 {title:"Robinhood disponível dentro de 12 dias",detail:"Avisamos-te quando puderes levantar",icon:Clock3,id:"robinhood-bonus"},
 {title:"Kraken aprovada",detail:"A recompensa está em validação",icon:Hourglass,id:"kraken-recompensa"},
 {title:"Nova recompensa disponível",detail:"Há um questionário AttaPoll para ti",icon:Sparkles,id:"atapoll-inqueritos"},
];
 function AlertsPage(){return <AppShell title="Alertas" eyebrow="Próximos passos"><div className="px-5 pt-4"><section><h2 className="text-xl font-bold">A tua atividade</h2><p className="mt-1 text-sm text-muted-foreground">Tudo o que precisas para concluir campanhas.</p><div className="mt-5">{alerts.map(({title,detail,icon:Icon,id,done})=><Link key={title} to="/oportunidades/$id" params={{id}} className={done?"activity-row activity-row-historical":"activity-row activity-row-active"}><span className="activity-icon"><Icon/></span><div className="min-w-0 flex-1"><h3 className="text-[14px] font-bold">{title}</h3><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div><span className="text-xs font-semibold text-primary">Ver</span></Link>)}</div></section></div></AppShell>}
