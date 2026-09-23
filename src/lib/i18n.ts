import { useSyncExternalStore } from "react";

export type Locale = "pt" | "de";
export const locales: Locale[] = ["pt", "de"];
export const localeNames: Record<Locale, string> = { pt: "Português", de: "Deutsch" };

const storageKey = "bmc-locale";
const eventName = "bmc-locale-change";

/** pt por omissão; só um navegador em alemão entra em de sem o utilizador escolher. */
function detect(): Locale {
  if (typeof window === "undefined") return "pt";
  const saved = window.localStorage.getItem(storageKey);
  if (saved === "pt" || saved === "de") return saved;
  return window.navigator.language?.toLowerCase().startsWith("de") ? "de" : "pt";
}

function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useLocale() {
  const locale = useSyncExternalStore(subscribe, detect, () => "pt" as Locale);
  const setLocale = (next: Locale) => {
    window.localStorage.setItem(storageKey, next);
    document.documentElement.lang = next === "de" ? "de-DE" : "pt-PT";
    window.dispatchEvent(new Event(eventName));
  };
  return { locale, setLocale };
}

type Dict = Record<string, string>;

const pt: Dict = {
  "greeting.morning": "Bom dia",
  "greeting.afternoon": "Boa tarde",
  "greeting.evening": "Boa noite",
  "greeting.tagline": "Pronto para fazer beer money?",
  "greeting.fallback": "Bem-vindo",

  "home.eyebrow": "Mínimo documentado em {count} ofertas",
  "home.pending": "por receber",
  "home.free": "sem pores dinheiro",
  "home.gated": "exigem depósito",
  "home.gatedMixed": "exigem depósito ou estão por confirmar",
  "home.verifiedNone": "Ainda não verificámos nenhuma",
  "home.verifiedSome": "{count} de {total} verificadas por nós",
  "home.howWeVerify": "Como verificamos",
  "home.title": "Ofertas documentadas",

  "group.free": "Sem depósito",
  "group.deposit": "Exigem depósito",
  "group.unknown": "Depósito por confirmar",
  "count.one": "1 oferta",
  "count.many": "{count} ofertas",

  "offer.valuePending": "Valor por confirmar",
  "offer.percentDone": "{percent}% concluída",

  "capital.none": "Nada",
  "capital.unknown": "Por confirmar",
  "capital.refunded": "{amount}€ · devolvidos",
  "capital.refundUnknown": "{amount}€ · reembolso por confirmar",
  "capital.amount": "{amount}€",
  "capital.purchase": "Uma compra",
  "capital.purchaseOf": "Compra de {amount}€",
  "capital.depositPlusPurchase": "{deposit}€ de depósito + compra de {amount}€",
  "capital.depositPlusAnyPurchase": "{deposit}€ de depósito + uma compra",

  "payout.pending": "Por confirmar",
  "payout.instant": "Imediato",
  "payout.days": "{days} dias",

  "nav.today": "Hoje",
  "nav.explore": "Explorar",
  "nav.wallet": "Carteira",
  "nav.account": "Conta",

  "progress.notStarted": "Por começar",
  "progress.inProgress": "A decorrer",
  "progress.completed": "Concluída",
  "progress.allMarked": "Marcaste tudo como feito",
  "progress.ofSteps": "{done} de {total}",
  "progress.restart": "Recomeçar",
  "progress.disclaimer": "És tu que marcas os passos. Serve para saberes onde ficaste e para a tua carteira, não é uma confirmação da plataforma.",

  "detail.opportunity": "Oportunidade",
  "detail.back": "Voltar",
  "detail.save": "Guardar",
  "detail.alerts": "Abrir alertas",
  "detail.reward": "Recompensa",
  "detail.commission": "Recebemos comissão desta oferta.",
  "detail.conditions": "Condições",
  "detail.costsYou": "Custa-te",
  "detail.payment": "Pagamento",
  "detail.activeWork": "Trabalho ativo",
  "detail.minutes": "{minutes} min",
  "detail.effort": "Esforço",
  "detail.effort.facil": "Fácil",
  "detail.effort.medio": "Médio",
  "detail.effort.dificil": "Difícil",
  "detail.earnings": "Quanto se ganha",
  "detail.whoCanJoin": "Quem pode participar",
  "detail.riskNotice": "Aviso de risco",
  "detail.toConsider": "A ter em conta",
  "detail.promoCode": "Código de registo",
  "detail.copy": "Copiar",
  "detail.copied": "Copiado",
  "detail.supportSub": "Apoio direto para esta oferta",
  "detail.stillVerifying": "Ainda a verificar",
  "detail.howWeEarn": "Como ganhamos dinheiro",

  "wallet.title": "Carteira",
  "wallet.eyebrow": "O teu progresso",
  "wallet.marked": "Marcaste como recebido",
  "wallet.inOffers": "em {count} ofertas",
  "wallet.inOffer": "em 1 oferta",
  "wallet.runningNone": "Nada a decorrer neste momento",
  "wallet.runningSome": "{amount}€ a decorrer em {count} ofertas",
  "wallet.runningOne": "{amount}€ a decorrer em 1 oferta",
  "wallet.seeOffers": "Ver ofertas",
  "wallet.thisMonth": "Este mês",
  "wallet.averageTime": "Prazo médio",
  "wallet.noData": "Sem dados suficientes",
  "wallet.fromClosed": "Das ofertas que fechaste",
  "wallet.sixMonths": "Últimos seis meses",
  "wallet.chartLabel": "Valor marcado como recebido por mês",
  "wallet.milestones": "Marcos",
  "wallet.markedAmount": "{amount}€ marcados",
  "wallet.reached": "Alcançado",
  "wallet.milestone25": "Primeiros 25€",
  "wallet.milestone25detail": "Duas ofertas fechadas chegam lá.",
  "wallet.milestone50": "50€ marcados",
  "wallet.milestone50detail": "Metade do que está documentado.",
  "wallet.milestone100": "Catálogo inteiro",
  "wallet.milestone100detail": "Tudo o que está documentado hoje.",
  "wallet.running": "A decorrer",
  "wallet.emptyTitle": "Ainda não abriste nenhuma",
  "wallet.emptyBody": "Assim que marcares o primeiro passo de uma oferta, ela aparece aqui com a percentagem concluída.",
  "wallet.stepsOf": "{done} de {total} passos",
  "wallet.disclaimer": "Estes números vêm dos passos que marcaste nesta aplicação, não de uma confirmação das plataformas. Servem para acompanhares o teu progresso.",

  "trust.unverified": "Ainda não verificámos",
  "language.label": "Idioma",
};

const de: Dict = {
  "greeting.morning": "Guten Morgen",
  "greeting.afternoon": "Guten Tag",
  "greeting.evening": "Guten Abend",
  "greeting.tagline": "Bereit, dir was dazuzuverdienen?",
  "greeting.fallback": "Willkommen",

  "home.eyebrow": "Dokumentiertes Minimum aus {count} Angeboten",
  "home.pending": "noch abzuholen",
  "home.free": "ohne eigenes Geld",
  "home.gated": "erfordern eine Einzahlung",
  "home.gatedMixed": "erfordern eine Einzahlung oder sind noch offen",
  "home.verifiedNone": "Noch keines von uns geprüft",
  "home.verifiedSome": "{count} von {total} von uns geprüft",
  "home.howWeVerify": "Wie wir prüfen",
  "home.title": "Dokumentierte Angebote",

  "group.free": "Ohne Einzahlung",
  "group.deposit": "Mit Einzahlung",
  "group.unknown": "Einzahlung noch offen",
  "count.one": "1 Angebot",
  "count.many": "{count} Angebote",

  "offer.valuePending": "Betrag noch offen",
  "offer.percentDone": "{percent}% erledigt",

  "capital.none": "Nichts",
  "capital.unknown": "Noch offen",
  "capital.refunded": "{amount} € · bekommst du zurück",
  "capital.refundUnknown": "{amount} € · Rückzahlung noch offen",
  "capital.amount": "{amount} €",
  "capital.purchase": "Ein Einkauf",
  "capital.purchaseOf": "Einkauf über {amount} €",
  "capital.depositPlusPurchase": "{deposit} € Einzahlung + Einkauf über {amount} €",
  "capital.depositPlusAnyPurchase": "{deposit} € Einzahlung + ein Einkauf",

  "payout.pending": "Noch offen",
  "payout.instant": "Sofort",
  "payout.days": "{days} Tage",

  "nav.today": "Heute",
  "nav.explore": "Entdecken",
  "nav.wallet": "Konto",
  "nav.account": "Profil",

  "progress.notStarted": "Noch nicht begonnen",
  "progress.inProgress": "Läuft",
  "progress.completed": "Abgeschlossen",
  "progress.allMarked": "Du hast alles abgehakt",
  "progress.ofSteps": "{done} von {total}",
  "progress.restart": "Neu beginnen",
  "progress.disclaimer": "Die Schritte hakst du selbst ab. Das dient deiner Übersicht und deinem Konto und ist keine Bestätigung der Plattform.",

  "detail.opportunity": "Angebot",
  "detail.back": "Zurück",
  "detail.save": "Merken",
  "detail.alerts": "Benachrichtigungen öffnen",
  "detail.reward": "Prämie",
  "detail.commission": "Wir erhalten für dieses Angebot eine Provision.",
  "detail.conditions": "Konditionen",
  "detail.costsYou": "Das kostet dich",
  "detail.payment": "Auszahlung",
  "detail.activeWork": "Aufwand",
  "detail.minutes": "{minutes} Min.",
  "detail.effort": "Schwierigkeit",
  "detail.effort.facil": "Einfach",
  "detail.effort.medio": "Mittel",
  "detail.effort.dificil": "Anspruchsvoll",
  "detail.earnings": "Was dabei herauskommt",
  "detail.whoCanJoin": "Wer teilnehmen kann",
  "detail.riskNotice": "Risikohinweis",
  "detail.toConsider": "Das solltest du wissen",
  "detail.promoCode": "Registrierungscode",
  "detail.copy": "Kopieren",
  "detail.copied": "Kopiert",
  "detail.supportSub": "Direkte Hilfe zu diesem Angebot",
  "detail.stillVerifying": "Wird noch geprüft",
  "detail.howWeEarn": "Womit wir Geld verdienen",

  "wallet.title": "Konto",
  "wallet.eyebrow": "Dein Fortschritt",
  "wallet.marked": "Als erhalten markiert",
  "wallet.inOffers": "aus {count} Angeboten",
  "wallet.inOffer": "aus 1 Angebot",
  "wallet.runningNone": "Gerade läuft nichts",
  "wallet.runningSome": "{amount} € laufen in {count} Angeboten",
  "wallet.runningOne": "{amount} € laufen in 1 Angebot",
  "wallet.seeOffers": "Angebote ansehen",
  "wallet.thisMonth": "Diesen Monat",
  "wallet.averageTime": "Durchschnittliche Dauer",
  "wallet.noData": "Noch zu wenig Daten",
  "wallet.fromClosed": "Aus deinen abgeschlossenen Angeboten",
  "wallet.sixMonths": "Letzte sechs Monate",
  "wallet.chartLabel": "Pro Monat als erhalten markierter Betrag",
  "wallet.milestones": "Meilensteine",
  "wallet.markedAmount": "{amount} € markiert",
  "wallet.reached": "Erreicht",
  "wallet.milestone25": "Die ersten 25 €",
  "wallet.milestone25detail": "Zwei abgeschlossene Angebote reichen dafür.",
  "wallet.milestone50": "50 € markiert",
  "wallet.milestone50detail": "Die Hälfte des Dokumentierten.",
  "wallet.milestone100": "Der ganze Katalog",
  "wallet.milestone100detail": "Alles, was heute dokumentiert ist.",
  "wallet.running": "Läuft gerade",
  "wallet.emptyTitle": "Du hast noch keines begonnen",
  "wallet.emptyBody": "Sobald du den ersten Schritt eines Angebots abhakst, erscheint es hier mit deinem Fortschritt.",
  "wallet.stepsOf": "{done} von {total} Schritten",
  "wallet.disclaimer": "Diese Zahlen stammen aus den Schritten, die du in dieser App abgehakt hast, nicht aus einer Bestätigung der Plattformen. Sie dienen deiner Übersicht.",

  "trust.unverified": "Noch nicht geprüft",
  "language.label": "Sprache",
};

const dictionaries: Record<Locale, Dict> = { pt, de };

export function translate(locale: Locale, key: string, values?: Record<string, string | number>) {
  const template = dictionaries[locale][key] ?? dictionaries.pt[key] ?? key;
  if (!values) return template;
  return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), template);
}

export function useT() {
  const { locale } = useLocale();
  return {
    locale,
    t: (key: string, values?: Record<string, string | number>) => translate(locale, key, values),
    /** "1 oferta" / "3 ofertas", com a forma certa em cada idioma. */
    plural: (count: number) => (count === 1 ? translate(locale, "count.one") : translate(locale, "count.many", { count })),
  };
}
