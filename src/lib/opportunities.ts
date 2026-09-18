export type CapitalRequired =
  | { kind: "none" }
  | { kind: "unknown" }
  | { kind: "amount"; amount: number; refundable: boolean | null };

export type Offer = {
  id: string;
  brand: string;
  brandLogo: string;
  category: "deposito" | "cashback" | "conta" | "crypto" | "questionario";
  reward: { min: number; max?: number };
  capitalRequired: CapitalRequired;
  payout: { estimateDays: number; conditions: string };
  effort: "facil" | "medio" | "dificil";
  timeToComplete: number;
  steps: { title: string; detail: string }[];
  eligibility: string[];
  risks: string[];
  verification: { verifiedAt: string; method: string } | null;
  hasCommission: boolean;
  status: "nova" | "guardada" | "a_decorrer" | "em_validacao" | "paga" | "expirada";
};

export type OfferPresentation = {
  title: string;
  summary: string;
  actionLabel: string;
  url: string;
  discovery: string[];
};

export const offers: Offer[] = [
  {
    id: "myfin-recompensa", brand: "MyFin", brandLogo: "myfin", category: "conta",
    reward: { min: 20 }, capitalRequired: { kind: "unknown" },
    payout: { estimateDays: 0, conditions: "[PREENCHER: condições e prazo em dias]" }, effort: "facil", timeToComplete: 10,
    steps: [
      { title: "Criar conta", detail: "Concluir o registo na MyFin." },
      { title: "Adicionar fundos", detail: "[PREENCHER: capital exigido]" },
      { title: "Criar cartão", detail: "Criar o cartão virtual gratuito." },
      { title: "Fazer uma compra", detail: "Confirmar o valor elegível antes de pagar." },
    ],
    eligibility: ["[PREENCHER]"], risks: ["Capital exigido e prazo ainda por confirmar."], verification: null, hasCommission: false, status: "nova",
  },
  {
    id: "coinbase-recompensa", brand: "Coinbase", brandLogo: "coinbase", category: "crypto",
    reward: { min: 20 }, capitalRequired: { kind: "unknown" },
    payout: { estimateDays: 3, conditions: "Pago até 3 dias após a validação." }, effort: "facil", timeToComplete: 5,
    steps: [
      { title: "Criar conta", detail: "Concluir o registo na Coinbase." },
      { title: "Verificar identidade", detail: "Completar a verificação pedida pela plataforma." },
      { title: "Fazer a operação elegível", detail: "[PREENCHER: capital e operação exigidos]" },
      { title: "Aguardar o pagamento", detail: "Pago até 3 dias após a validação." },
    ],
    eligibility: ["Novo cliente", "[PREENCHER: restantes condições]"], risks: ["[PREENCHER: aviso de risco]"], verification: null, hasCommission: false, status: "nova",
  },
  {
    id: "robinhood-bonus", brand: "Robinhood", brandLogo: "robinhood", category: "crypto",
    reward: { min: 50 }, capitalRequired: { kind: "amount", amount: 50, refundable: true },
    payout: { estimateDays: 180, conditions: "A recompensa fica bloqueada 180 dias." }, effort: "facil", timeToComplete: 8,
    steps: [
      { title: "Criar conta", detail: "Concluir o registo na Robinhood." },
      { title: "Depositar 50€", detail: "O capital depositado é devolvido." },
      { title: "Receber a recompensa", detail: "A recompensa fica bloqueada 180 dias." },
    ],
    eligibility: ["[PREENCHER]"], risks: ["A recompensa fica bloqueada 180 dias.", "[PREENCHER: aviso de risco]"], verification: null, hasCommission: false, status: "nova",
  },
  {
    id: "bybit-recompensa", brand: "Bybit", brandLogo: "bybit", category: "deposito",
    reward: { min: 25, max: 55 }, capitalRequired: { kind: "amount", amount: 100, refundable: null },
    payout: { estimateDays: 0, conditions: "[PREENCHER: condições e prazo em dias]" }, effort: "medio", timeToComplete: 10,
    steps: [
      { title: "Criar conta", detail: "Concluir o registo na Bybit." },
      { title: "Depositar 100€", detail: "Reembolso do capital: [PREENCHER]." },
      { title: "Cumprir as condições", detail: "25€ mínimos e até 30€ adicionais, sujeitos às condições da campanha." },
    ],
    eligibility: ["[PREENCHER]"], risks: ["Reembolso do capital por confirmar.", "[PREENCHER: aviso de risco]"], verification: null, hasCommission: false, status: "nova",
  },
  {
    id: "kraken-recompensa", brand: "Kraken", brandLogo: "kraken", category: "crypto",
    reward: { min: 5, max: 200 }, capitalRequired: { kind: "unknown" },
    payout: { estimateDays: 0, conditions: "[PREENCHER: condições e prazo em dias]" }, effort: "medio", timeToComplete: 10,
    steps: [
      { title: "Criar conta", detail: "Concluir o registo na Kraken." },
      { title: "Cumprir a condição de capital", detail: "[PREENCHER: capital exigido]" },
      { title: "Receber a recompensa", detail: "Valor variável entre 5€ e 200€." },
    ],
    eligibility: ["[PREENCHER]"], risks: ["A recompensa é variável.", "[PREENCHER: aviso de risco]"], verification: null, hasCommission: false, status: "nova",
  },
  {
    id: "atapoll-inqueritos", brand: "AttaPoll", brandLogo: "attapoll", category: "questionario",
    reward: { min: 0 }, capitalRequired: { kind: "none" },
    payout: { estimateDays: 0, conditions: "[PREENCHER: prazo em dias]" }, effort: "facil", timeToComplete: 7,
    steps: [
      { title: "Instalar a aplicação", detail: "Instalar a AttaPoll." },
      { title: "Completar o perfil", detail: "Responder às perguntas de perfil." },
      { title: "Responder a um questionário", detail: "Escolher um questionário disponível." },
    ],
    eligibility: ["[PREENCHER]"], risks: ["A disponibilidade e o valor variam por questionário."], verification: null, hasCommission: false, status: "nova",
  },
  {
    id: "cashback-lojas", brand: "Beruby", brandLogo: "beruby", category: "cashback",
    reward: { min: 0 }, capitalRequired: { kind: "unknown" },
    payout: { estimateDays: 0, conditions: "[PREENCHER: prazo em dias]" }, effort: "facil", timeToComplete: 2,
    steps: [
      { title: "Escolher uma loja", detail: "Confirmar que a loja participa na campanha." },
      { title: "Abrir a loja", detail: "Usar a ligação apresentada pela Beruby." },
      { title: "Concluir a compra", detail: "Finalizar a compra na mesma sessão." },
    ],
    eligibility: ["[PREENCHER]"], risks: ["O cashback depende da loja e das condições da compra."], verification: null, hasCommission: false, status: "nova",
  },
];

export const offerPresentation: Record<string, OfferPresentation> = {
  "myfin-recompensa": { title: "Criar conta e fazer uma compra elegível", summary: "Registo, cartão virtual e compra sujeitos às condições da campanha.", actionLabel: "Abrir conta na MyFin", url: "https://myfin.bg/", discovery: ["Destaques", "Dinheiro rápido", "Contas"] },
  "coinbase-recompensa": { title: "Verificar identidade e concluir a operação elegível", summary: "O pagamento está indicado até 3 dias após a validação.", actionLabel: "Abrir conta na Coinbase", url: "https://www.coinbase.com/", discovery: ["Destaques", "Dinheiro rápido", "Crypto"] },
  "robinhood-bonus": { title: "Depositar 50€ e manter a recompensa bloqueada", summary: "A recompensa em cripto fica bloqueada 180 dias.", actionLabel: "Abrir conta na Robinhood", url: "https://robinhood.com/", discovery: ["Destaques", "Crypto"] },
  "bybit-recompensa": { title: "Depositar 100€ para receber 25€ a 55€", summary: "A campanha indica 25€ mínimos e até 30€ adicionais.", actionLabel: "Abrir conta na Bybit", url: "https://www.bybit.com/", discovery: ["Destaques", "Crypto"] },
  "kraken-recompensa": { title: "Cumprir as condições para receber um valor variável", summary: "A recompensa indicada varia entre 5€ e 200€.", actionLabel: "Abrir conta na Kraken", url: "https://www.kraken.com/", discovery: ["Destaques", "Crypto"] },
  "atapoll-inqueritos": { title: "Responder a questionários aprovados", summary: "O valor depende dos questionários disponíveis e aceites.", actionLabel: "Instalar a AttaPoll", url: "https://attapoll.app/", discovery: ["Destaques", "Dinheiro rápido", "Questionários"] },
  "cashback-lojas": { title: "Comprar através de uma loja aderente", summary: "O cashback depende da loja e das condições apresentadas antes da compra.", actionLabel: "Consultar lojas na Beruby", url: "https://pt.beruby.com/", discovery: ["Cashback"] },
};

export function rewardLabel(offer: Offer) {
  if (offer.reward.min === 0 && offer.reward.max === undefined) return "[PREENCHER]";
  return offer.reward.max === undefined ? `${offer.reward.min}€` : `${offer.reward.min}€–${offer.reward.max}€`;
}

export function capitalLabel(capital: CapitalRequired) {
  if (capital.kind === "none") return "Nada";
  if (capital.kind === "unknown") return "Por confirmar";
  if (capital.refundable === true) return `${capital.amount}€ · devolvidos`;
  if (capital.refundable === null) return `${capital.amount}€ · reembolso por confirmar`;
  return `${capital.amount}€`;
}

export function payoutLabel(offer: Offer) {
  return offer.payout.estimateDays > 0 ? `${offer.payout.estimateDays} dias` : "[PREENCHER: prazo em dias]";
}

export const totalAvailable = offers.reduce((sum, offer) => sum + offer.reward.min, 0);

// Compatibility alias while the UI naming is migrated from “opportunity” to “offer”.
export type Opportunity = Offer;
export const opportunities = offers;