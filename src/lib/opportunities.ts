import { translate, type Locale } from "./i18n";
import { moneyText } from "./money";

/**
 * O catálogo guarda factos: valores, capital exigido, prazos, estado de
 * verificação. Nada aqui se traduz. As palavras de cada oferta vivem em
 * offer-content.ts, por idioma, para que corrigir um número não obrigue a
 * mexer em duas línguas e para que uma tradução não possa alterar uma condição.
 */

export type CapitalRequired =
  | { kind: "none" }
  | { kind: "unknown" }
  /** Exige uma compra: sai dinheiro, mas não é um depósito que volte. */
  | { kind: "purchase"; minAmount: number | null; deposit?: number }
  | { kind: "amount"; amount: number; refundable: boolean | null };

export type Offer = {
  id: string;
  brand: string;
  brandLogo: string;
  category: "deposito" | "cashback" | "conta" | "crypto" | "questionario";
  reward: { min: number; max?: number };
  capitalRequired: CapitalRequired;
  /** estimateDays: null por confirmar, 0 imediato, n em dias. */
  payout: { estimateDays: number | null };
  effort: "facil" | "medio" | "dificil";
  timeToComplete: number;
  /** Número de passos, igual em todos os idiomas: o progresso não pode mudar com a língua. */
  stepCount: number;
  /** "mensal" quando a recompensa se repete, em vez de ser paga uma vez. */
  recurring?: "mensal";
  /**
   * Oferta em destaque. O motivo vive no conteúdo e é sempre um facto
   * verificável, não urgência inventada: se não houver razão para escrever,
   * não há destaque.
   */
  highlighted?: boolean;
  /**
   * Perguntas em aberto sobre a campanha. Nunca são mostradas ao utilizador:
   * um marcador por preencher não tem lugar num ecrã que fala de dinheiro.
   * Aparecem só na auditoria interna, para não se perderem de vista.
   */
  openQuestions?: string[];
  /** null enquanto não for confirmado que a campanha aceita residentes no país. */
  availableInPortugal: boolean | null;
  verification: { verifiedAt: string; method: string } | null;
  hasCommission: boolean;
  status: "nova" | "guardada" | "a_decorrer" | "em_validacao" | "paga" | "expirada";
};

export const offers: Offer[] = [
  {
    id: "myfin-recompensa", brand: "MyFin", brandLogo: "myfin", category: "conta",
    reward: { min: 10 }, capitalRequired: { kind: "purchase", minAmount: 10, deposit: 10 },
    payout: { estimateDays: 0 }, effort: "facil", timeToComplete: 10, stepCount: 5,
    openQuestions: ["A compra de 10€ usa o valor depositado ou é dinheiro adicional?", "Que tipos de compra são elegíveis?"],
    availableInPortugal: true, verification: null, hasCommission: true, status: "nova",
  },
  {
    id: "coinbase-recompensa", brand: "Coinbase", brandLogo: "coinbase", category: "crypto",
    reward: { min: 10 }, capitalRequired: { kind: "amount", amount: 10, refundable: true },
    payout: { estimateDays: 3 }, effort: "facil", timeToComplete: 5, stepCount: 4,
    availableInPortugal: true, verification: null, hasCommission: true, status: "nova",
  },
  {
    id: "robinhood-bonus", brand: "Robinhood", brandLogo: "robinhood", category: "crypto",
    reward: { min: 50 }, capitalRequired: { kind: "amount", amount: 50, refundable: true },
    payout: { estimateDays: 180 }, effort: "facil", timeToComplete: 8, stepCount: 3,
    availableInPortugal: true, verification: null, hasCommission: true, status: "nova",
  },
  {
    id: "trading212-acao", brand: "Trading 212", brandLogo: "trading212", category: "deposito",
    reward: { min: 8, max: 100 }, capitalRequired: { kind: "amount", amount: 10, refundable: true }, highlighted: true,
    payout: { estimateDays: 0 }, effort: "facil", timeToComplete: 10, stepCount: 4,
    openQuestions: ["A ação tem período de retenção antes de poder ser vendida?"],
    availableInPortugal: true, verification: null, hasCommission: true, status: "nova",
  },
  {
    id: "kraken-recompensa", brand: "Kraken", brandLogo: "kraken", category: "crypto",
    reward: { min: 5, max: 200 }, capitalRequired: { kind: "amount", amount: 260, refundable: true },
    payout: { estimateDays: null }, effort: "medio", timeToComplete: 10, stepCount: 4,
    openQuestions: ["Levantar os 260€ de imediato afeta a atribuição da recompensa?", "Qual é o prazo até a recompensa ser atribuída?"],
    availableInPortugal: true, verification: null, hasCommission: true, status: "nova",
  },
  {
    id: "atapoll-inqueritos", brand: "AttaPoll", brandLogo: "attapoll", category: "questionario",
    reward: { min: 20, max: 60 }, capitalRequired: { kind: "none" }, recurring: "mensal",
    payout: { estimateDays: null }, effort: "facil", timeToComplete: 7, stepCount: 4,
    openQuestions: ["Qual é o valor mínimo de levantamento?", "Que métodos de pagamento estão disponíveis em Portugal?"],
    availableInPortugal: true, verification: null, hasCommission: true, status: "nova",
  },
];

export const opportunities = offers;

export function capitalLabel(capital: CapitalRequired, locale: Locale) {
  const t = (key: string, values?: Record<string, string | number>) => translate(locale, key, values);
  if (capital.kind === "none") return t("capital.none");
  if (capital.kind === "unknown") return t("capital.unknown");
  if (capital.kind === "purchase") {
    if (capital.deposit && capital.minAmount !== null) return t("capital.depositPlusPurchase", { deposit: capital.deposit, amount: capital.minAmount });
    if (capital.deposit) return t("capital.depositPlusAnyPurchase", { deposit: capital.deposit });
    return capital.minAmount === null ? t("capital.purchase") : t("capital.purchaseOf", { amount: capital.minAmount });
  }
  if (capital.refundable === true) return t("capital.refunded", { amount: capital.amount });
  if (capital.refundable === null) return t("capital.refundUnknown", { amount: capital.amount });
  return t("capital.amount", { amount: capital.amount });
}

export function rewardLabel(offer: Offer, locale: Locale) {
  if (offer.reward.min === 0 && offer.reward.max === undefined) return translate(locale, "offer.valuePending");
  return moneyText(locale, offer.reward.min, offer.reward.max);
}

export function payoutLabel(offer: Offer, locale: Locale) {
  if (offer.payout.estimateDays === null) return translate(locale, "payout.pending");
  return offer.payout.estimateDays === 0 ? translate(locale, "payout.instant") : translate(locale, "payout.days", { days: offer.payout.estimateDays });
}

/**
 * Quanto é que a pessoa tem de depositar para entrar. Uma compra obrigatória
 * pode trazer um depósito atrás, e nesse caso a oferta exige depósito como
 * qualquer outra: o rótulo da linha e o grupo têm de dizer a mesma coisa.
 */
export function requiredDeposit(offer: Offer): number {
  const capital = offer.capitalRequired;
  if (capital.kind === "amount") return capital.amount;
  if (capital.kind === "purchase") return capital.deposit ?? 0;
  return 0;
}

export function requiresDeposit(offer: Offer) {
  return requiredDeposit(offer) > 0;
}

/**
 * Ordem de apresentação: primeiro o que não exige depósito, depois o que exige
 * menos, depois o que ainda tem o capital por confirmar; dentro de cada grupo,
 * pelo mínimo documentado. Ordenar pela recompensa máxima punha em primeiro a
 * oferta mais incerta, por causa do seu melhor cenário possível.
 */
function capitalRank(offer: Offer) {
  if (offer.capitalRequired.kind === "unknown") return 3;
  if (!requiresDeposit(offer)) return offer.capitalRequired.kind === "none" ? 0 : 1;
  return 2;
}

export function byDocumentedValue(a: Offer, b: Offer) {
  if (capitalRank(a) !== capitalRank(b)) return capitalRank(a) - capitalRank(b);
  if (requiredDeposit(a) !== requiredDeposit(b)) return requiredDeposit(a) - requiredDeposit(b);
  return b.reward.min - a.reward.min;
}

export const totalAvailable = offers.reduce((sum, offer) => sum + offer.reward.min, 0);

/** Quanto do total é alcançável sem depositar nada. */
export const capitalFreeTotal = offers
  .filter((offer) => offer.capitalRequired.kind !== "unknown" && !requiresDeposit(offer))
  .reduce((sum, offer) => sum + offer.reward.min, 0);

export const verifiedCount = offers.filter((offer) => offer.verification !== null).length;