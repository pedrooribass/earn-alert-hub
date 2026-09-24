import { offers, type Offer } from "./opportunities";
import { offerContent, offerLinks } from "./offer-content";

/**
 * Auditoria do catálogo.
 *
 * Nenhuma oferta deve chegar ao utilizador com um campo por confirmar
 * apresentado como se fosse facto. Este módulo diz, por oferta, o que falta e
 * quanto é que isso pesa, para que a lista de trabalho seja calculada a partir
 * dos dados em vez de ser mantida à mão.
 */

export type Severity = "bloqueante" | "importante" | "menor";

export type AuditIssue = {
  field: string;
  severity: Severity;
  detail: string;
};

/**
 * Marcas típicas de um link de referência: parâmetro na query, segmento no
 * caminho, ou um subdomínio dedicado a convites (ref.exemplo.com).
 */
const referralMarkers = [
  /[?&](ref|referral|refcode|invite|inviteCode|r|aff|affiliate|partner|clickid|sub_?id)=/i,
  /\/(join|invite|refer|referral)\//i,
  /^https?:\/\/(ref|invite|refer|join|r)\./i,
];

export type ReferralState = "sem-link" | "com-link";

/** Um código de registo conta como atribuição, mesmo que o link seja genérico. */
export function referralState(url: string, promoCode?: string): ReferralState {
  if (promoCode) return "com-link";
  return referralMarkers.some((pattern) => pattern.test(url)) ? "com-link" : "sem-link";
}

function hasPlaceholder(value: unknown) {
  return JSON.stringify(value ?? null).includes("[PREENCHER");
}

export function auditOffer(offer: Offer): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const presentation = offerContent("pt", offer.id);
  const links = offerLinks[offer.id];
  const link = links?.url ?? "";

  if (!presentation) {
    issues.push({ field: "Apresentação", severity: "bloqueante", detail: "A oferta não tem título, resumo nem link." });
    return issues;
  }

  if (referralState(link, links?.promoCode) === "sem-link") {
    issues.push({ field: "Link de referência", severity: "bloqueante", detail: "O link aponta para a página inicial da plataforma. Sem código de referência, a recompensa pode não ser atribuída e não há comissão." });
  } else if (!offer.hasCommission) {
    issues.push({ field: "Divulgação de comissão", severity: "bloqueante", detail: "O link é de afiliado mas hasCommission está a false, por isso a divulgação não aparece ao utilizador." });
  }

  if (offer.availableInPortugal === null) {
    issues.push({ field: "Disponibilidade em Portugal", severity: "bloqueante", detail: "Ainda não foi confirmado que a campanha aceita residentes em Portugal." });
  } else if (offer.availableInPortugal === false) {
    issues.push({ field: "Disponibilidade em Portugal", severity: "bloqueante", detail: "A campanha não está disponível em Portugal e não devia estar no catálogo." });
  }

  if (offer.capitalRequired.kind === "unknown") {
    issues.push({ field: "Capital exigido", severity: "bloqueante", detail: "O utilizador não consegue saber quanto tem de pôr antes de começar." });
  }
  if (offer.capitalRequired.kind === "amount" && offer.capitalRequired.refundable === null) {
    issues.push({ field: "Reembolso do depósito", severity: "importante", detail: "Não está confirmado se o depósito é devolvido." });
  }
  if (offer.capitalRequired.kind === "purchase" && offer.capitalRequired.minAmount === null) {
    issues.push({ field: "Valor mínimo da compra", severity: "importante", detail: "A compra é obrigatória mas o valor mínimo não está documentado." });
  }

  if (offer.reward.min === 0 && offer.reward.max === undefined) {
    issues.push({ field: "Recompensa", severity: "bloqueante", detail: "Não há um valor mínimo documentado para mostrar." });
  }
  if (offer.payout.estimateDays === null) {
    issues.push({ field: "Prazo de pagamento", severity: "importante", detail: "Sem prazo, a oferta aparece como \"Por confirmar\"." });
  }
  if (hasPlaceholder(presentation.payoutConditions)) {
    issues.push({ field: "Condições de pagamento", severity: "importante", detail: "O texto das condições ainda é um marcador." });
  }
  if (hasPlaceholder(presentation.eligibility)) {
    issues.push({ field: "Elegibilidade", severity: "importante", detail: "Falta dizer quem pode participar (país, idade, cliente novo)." });
  }
  if (hasPlaceholder(presentation.steps)) {
    issues.push({ field: "Passos", severity: "importante", detail: "Um dos passos ainda tem um marcador por preencher." });
  }
  if (!offerContent("de", offer.id)) {
    issues.push({ field: "Tradução", severity: "importante", detail: "A oferta não tem conteúdo em alemão." });
  }

  const needsRiskNotice = offer.category === "crypto" || offer.category === "deposito";
  if (needsRiskNotice && hasPlaceholder(presentation.risks)) {
    issues.push({ field: "Aviso de risco", severity: "bloqueante", detail: "Oferta de criptoativos ou de depósito sem aviso de risco escrito." });
  }

  for (const question of offer.openQuestions ?? []) {
    issues.push({ field: "Por confirmar", severity: "importante", detail: question });
  }

  if (offer.verification === null) {
    issues.push({ field: "Verificação", severity: "menor", detail: "Ninguém percorreu o fluxo do princípio ao fim para confirmar o pagamento." });
  }

  return issues;
}

export const severityOrder: Record<Severity, number> = { bloqueante: 0, importante: 1, menor: 2 };

export function auditCatalogue() {
  return offers
    .map((offer) => ({ offer, issues: auditOffer(offer).sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]) }))
    .sort((a, b) => {
      const blocking = (entry: { issues: AuditIssue[] }) => entry.issues.filter((issue) => issue.severity === "bloqueante").length;
      return blocking(b) - blocking(a) || b.issues.length - a.issues.length;
    });
}

/** Uma oferta só devia ser publicável quando não tem nada bloqueante. */
export function isPublishable(offer: Offer) {
  return auditOffer(offer).every((issue) => issue.severity !== "bloqueante");
}