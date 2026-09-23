import type { Locale } from "./i18n";

/**
 * Tudo o que é palavra vive aqui, por idioma. O catálogo em opportunities.ts
 * guarda só factos (valores, prazos, capital), que não se traduzem. Assim, uma
 * correção a um número não obriga a mexer em dois idiomas, e uma tradução nova
 * não pode alterar uma condição por acidente.
 */
export type OfferContent = {
  title: string;
  summary: string;
  actionLabel: string;
  discovery: string[];
  payoutConditions: string;
  steps: { title: string; detail: string }[];
  eligibility: string[];
  risks: string[];
  earnings?: { basis: string; tiers: { label: string; range: string }[]; ceiling: string };
  promoCodeInstruction?: string;
  supportLabel?: string;
};

/** Links e códigos são iguais em qualquer idioma. */
export const offerLinks: Record<string, { url: string; promoCode?: string; supportUrl?: string }> = {
  "myfin-recompensa": { url: "https://ref.myfin.bg/referral/invitation-link", promoCode: "PE00J22Z" },
  "coinbase-recompensa": { url: "https://coinbase.com/join/2GHRFFM?src=ios-link" },
  "robinhood-bonus": { url: "https://robinhood.com/" },
  "bybit-recompensa": { url: "https://www.bybit.eu/invite?ref=4AXQ3G0", promoCode: "4AXQ3G0", supportUrl: "https://wa.me/message/UELHKHECUPWJD1" },
  "kraken-recompensa": { url: "https://invite.kraken.com/JDNW/otqqtx8x" },
  "atapoll-inqueritos": { url: "https://attapoll.app/join/nubuq" },
};

const pt: Record<string, OfferContent> = {
  "myfin-recompensa": {
    title: "Depositar 10€ e fazer uma compra com o cartão",
    summary: "Os 10€ são creditados automaticamente depois da compra.",
    actionLabel: "Instalar a MyFin",
    discovery: ["Destaques", "Dinheiro rápido", "Contas"],
    payoutConditions: "Os 10€ são creditados automaticamente depois da compra.",
    steps: [
      { title: "Criar conta", detail: "Concluir o registo na MyFin." },
      { title: "Esperar pela verificação", detail: "A verificação da conta demora 2 a 3 dias." },
      { title: "Depositar 10€", detail: "O depósito é obrigatório para a campanha contar." },
      { title: "Criar o cartão", detail: "Criar o cartão virtual gratuito." },
      { title: "Fazer uma compra de 10€", detail: "Confirma que o tipo de compra é elegível antes de pagar." },
    ],
    eligibility: ["Cliente novo", "Maior de 18 anos", "Verificação de identidade com documento"],
    risks: [
      "Os 10€ da compra não voltam: a recompensa repõe o valor, não o duplica.",
      "[PREENCHER: confirmar se a compra usa os 10€ depositados ou se é um valor adicional]",
      "Nem todos os tipos de compra contam para a campanha. Confirma antes de pagar.",
    ],
    promoCodeInstruction: "O link de convite está com problemas. Instala a aplicação e introduz este código no registo.",
  },
  "coinbase-recompensa": {
    title: "Depositar 10€ em BTC e receber 10€ em BTC",
    summary: "A recompensa chega ao fim de 3 dias, paga em bitcoin.",
    actionLabel: "Abrir conta na Coinbase",
    discovery: ["Destaques", "Dinheiro rápido", "Crypto"],
    payoutConditions: "A recompensa chega ao fim de 3 dias, paga em BTC.",
    steps: [
      { title: "Criar conta", detail: "Concluir o registo na Coinbase." },
      { title: "Verificar identidade", detail: "Completar a verificação pedida pela plataforma." },
      { title: "Depositar 10€ em BTC", detail: "O depósito tem de ser em bitcoin." },
      { title: "Receber a recompensa", detail: "10€ em BTC, ao fim de 3 dias." },
    ],
    eligibility: ["Cliente novo", "Maior de 18 anos", "Verificação de identidade com documento"],
    risks: [
      "A recompensa é paga em BTC, por isso o valor em euros muda com a cotação.",
      "O depósito de 10€ fica exposto à variação do bitcoin enquanto lá estiver.",
      "Investir em criptoativos é de risco elevado e podes perder o capital.",
    ],
  },
  "robinhood-bonus": {
    title: "Depositar 50€ e manter a recompensa bloqueada",
    summary: "A recompensa em cripto fica bloqueada 180 dias.",
    actionLabel: "Abrir conta na Robinhood",
    discovery: ["Destaques", "Crypto"],
    payoutConditions: "A recompensa fica bloqueada 180 dias.",
    steps: [
      { title: "Criar conta", detail: "Concluir o registo na Robinhood." },
      { title: "Depositar 50€", detail: "O capital depositado é devolvido." },
      { title: "Receber a recompensa", detail: "A recompensa fica bloqueada 180 dias." },
    ],
    eligibility: ["Cliente novo", "Maior de 18 anos", "Verificação de identidade com documento"],
    risks: [
      "A recompensa fica bloqueada 180 dias e é paga em cripto.",
      "O valor em euros da recompensa muda com a cotação durante esses 180 dias.",
      "Investir em criptoativos é de risco elevado e podes perder o capital.",
    ],
  },
  "bybit-recompensa": {
    title: "Depositar 100€ para receber 25€ a 55€",
    summary: "25€ garantidos ao fim de 3 dias, mais até 30€ conforme a recompensa que sair.",
    actionLabel: "Abrir conta na Bybit",
    discovery: ["Destaques", "Crypto"],
    payoutConditions: "25€ ao fim de 3 dias. Os até 30€ adicionais dependem da recompensa que sair.",
    steps: [
      { title: "Criar conta", detail: "Regista-te e envia os documentos de identificação." },
      { title: "Esperar pela verificação", detail: "Costuma ficar feita em menos de um dia." },
      { title: "Depositar 100€", detail: "O depósito é feito pela secção de recompensas, no ícone do presente, ao canto superior direito." },
      { title: "Criar o cartão virtual", detail: "Cartão gratuito, criado com o código 4AXQ3G0." },
      { title: "Vender o BTC do cartão", detail: "O saldo fica em bitcoin; vendes para o teres em euros." },
      { title: "Receber a recompensa", detail: "25€ ao fim de 3 dias, mais até 30€ conforme a recompensa atribuída." },
    ],
    eligibility: ["Cliente novo", "Maior de 18 anos", "Verificação de identidade com documento"],
    risks: [
      "Os 100€ passam por bitcoin, por isso o valor que recuperas depende da cotação e do spread na altura em que venderes.",
      "Só os 25€ são garantidos. Os até 30€ adicionais dependem da recompensa que sair.",
      "Investir em criptoativos é de risco elevado e podes perder o capital.",
    ],
    promoCodeInstruction: "Usa este código ao criar o cartão virtual.",
    supportLabel: "Falar connosco no WhatsApp",
  },
  "kraken-recompensa": {
    title: "Depositar 260€ e levantar logo a seguir",
    summary: "O capital pode sair logo após a criação da conta. A recompensa varia entre 5€ e 200€.",
    actionLabel: "Abrir conta na Kraken",
    discovery: ["Destaques", "Crypto"],
    payoutConditions: "[PREENCHER: prazo em dias]",
    steps: [
      { title: "Criar conta", detail: "Concluir o registo na Kraken." },
      { title: "Depositar 260€", detail: "O depósito cumpre a condição da campanha." },
      { title: "Levantar os 260€", detail: "O capital pode ser levantado logo a seguir à criação da conta." },
      { title: "Receber a recompensa", detail: "Valor variável entre 5€ e 200€." },
    ],
    eligibility: ["Cliente novo", "Maior de 18 anos", "Verificação de identidade com documento"],
    risks: [
      "A recompensa é variável entre 5€ e 200€ e não sabes qual sai antes de cumprires as condições.",
      "Precisas de ter os 260€ disponíveis no momento do depósito, mesmo que os levantes logo a seguir.",
      "[PREENCHER: confirmar se levantar de imediato afeta a atribuição da recompensa]",
      "Investir em criptoativos é de risco elevado e podes perder o capital.",
    ],
  },
  "atapoll-inqueritos": {
    title: "Responder a inquéritos remunerados",
    summary: "Entre 0,20€ e 5€ por inquérito, com média perto de 0,60€.",
    actionLabel: "Instalar a AttaPoll",
    discovery: ["Destaques", "Dinheiro rápido", "Questionários"],
    payoutConditions: "Pagamento ao atingir o mínimo de levantamento.",
    steps: [
      { title: "Instalar a aplicação", detail: "Descarregar a AttaPoll pelo link de convite." },
      { title: "Completar o perfil", detail: "Um perfil completo faz chegar mais inquéritos." },
      { title: "Ativar as notificações", detail: "Os inquéritos esgotam depressa; quem responde primeiro apanha mais." },
      { title: "Responder com regularidade", detail: "[PREENCHER: mínimo de levantamento]" },
    ],
    eligibility: ["Maior de 18 anos", "Perfil completo para receber mais inquéritos"],
    risks: [
      "O rendimento depende do país, da idade e do perfil demográfico. Em Portugal chegam menos inquéritos do que no Reino Unido ou nos Estados Unidos.",
      "Não substitui um salário: a maioria dos utilizadores fica na casa das dezenas de euros por mês.",
      "Podes ser excluído a meio de um inquérito sem receber o valor total.",
    ],
    earnings: {
      basis: "Nos primeiros 3 meses, conforme o tempo que lhe deres",
      tiers: [
        { label: "Uso casual, 5 a 10 min por dia", range: "20€ a 60€" },
        { label: "Uso regular, 20 a 30 min por dia", range: "90€ a 240€" },
        { label: "Uso intensivo, várias vezes ao dia", range: "240€ a 450€" },
      ],
      ceiling: "Há utilizadores a relatar 150€ a 200€ por mês, mas são casos acima da média, com perfis que os anunciantes procuram mais. As médias agregadas de vários países ficam perto dos 15€ a 20€ por mês.",
    },
  },
};

const de: Record<string, OfferContent> = {
  "myfin-recompensa": {
    title: "10 € einzahlen und mit der Karte einkaufen",
    summary: "Die 10 € werden nach dem Einkauf automatisch gutgeschrieben.",
    actionLabel: "MyFin installieren",
    discovery: ["Empfohlen", "Schnelles Geld", "Konten"],
    payoutConditions: "Die 10 € werden nach dem Einkauf automatisch gutgeschrieben.",
    steps: [
      { title: "Konto anlegen", detail: "Die Registrierung bei MyFin abschließen." },
      { title: "Prüfung abwarten", detail: "Die Kontoprüfung dauert zwei bis drei Tage." },
      { title: "10 € einzahlen", detail: "Die Einzahlung ist Voraussetzung für die Aktion." },
      { title: "Karte anlegen", detail: "Die kostenlose virtuelle Karte erstellen." },
      { title: "Für 10 € einkaufen", detail: "Prüfe vor dem Bezahlen, ob die Art des Einkaufs zählt." },
    ],
    eligibility: ["Neukunde", "Mindestens 18 Jahre alt", "Identitätsprüfung mit Ausweis"],
    risks: [
      "Die 10 € aus dem Einkauf kommen nicht zurück: die Prämie ersetzt den Betrag, sie verdoppelt ihn nicht.",
      "[PREENCHER: confirmar se a compra usa os 10€ depositados ou se é um valor adicional]",
      "Nicht jede Art von Einkauf zählt für die Aktion. Kläre das vor dem Bezahlen.",
    ],
    promoCodeInstruction: "Der Einladungslink funktioniert derzeit nicht. Installiere die App und gib diesen Code bei der Registrierung ein.",
  },
  "coinbase-recompensa": {
    title: "10 € in BTC einzahlen und 10 € in BTC erhalten",
    summary: "Die Prämie kommt nach drei Tagen, ausgezahlt in Bitcoin.",
    actionLabel: "Konto bei Coinbase eröffnen",
    discovery: ["Empfohlen", "Schnelles Geld", "Krypto"],
    payoutConditions: "Die Prämie kommt nach drei Tagen, ausgezahlt in BTC.",
    steps: [
      { title: "Konto anlegen", detail: "Die Registrierung bei Coinbase abschließen." },
      { title: "Identität bestätigen", detail: "Die von der Plattform verlangte Prüfung durchlaufen." },
      { title: "10 € in BTC einzahlen", detail: "Die Einzahlung muss in Bitcoin erfolgen." },
      { title: "Prämie erhalten", detail: "10 € in BTC, nach drei Tagen." },
    ],
    eligibility: ["Neukunde", "Mindestens 18 Jahre alt", "Identitätsprüfung mit Ausweis"],
    risks: [
      "Die Prämie wird in BTC ausgezahlt, ihr Wert in Euro schwankt also mit dem Kurs.",
      "Die eingezahlten 10 € unterliegen der Kursschwankung von Bitcoin, solange sie dort liegen.",
      "Die Anlage in Kryptowerte ist hochriskant und kann zum Verlust des eingesetzten Kapitals führen.",
    ],
  },
  "robinhood-bonus": {
    title: "50 € einzahlen, Prämie bleibt gesperrt",
    summary: "Die Krypto-Prämie ist 180 Tage lang gesperrt.",
    actionLabel: "Konto bei Robinhood eröffnen",
    discovery: ["Empfohlen", "Krypto"],
    payoutConditions: "Die Prämie ist 180 Tage lang gesperrt.",
    steps: [
      { title: "Konto anlegen", detail: "Die Registrierung bei Robinhood abschließen." },
      { title: "50 € einzahlen", detail: "Das eingezahlte Kapital bekommst du zurück." },
      { title: "Prämie erhalten", detail: "Die Prämie bleibt 180 Tage gesperrt." },
    ],
    eligibility: ["Neukunde", "Mindestens 18 Jahre alt", "Identitätsprüfung mit Ausweis"],
    risks: [
      "Die Prämie ist 180 Tage gesperrt und wird in Krypto ausgezahlt.",
      "Ihr Wert in Euro schwankt während dieser 180 Tage mit dem Kurs.",
      "Die Anlage in Kryptowerte ist hochriskant und kann zum Verlust des eingesetzten Kapitals führen.",
    ],
  },
  "bybit-recompensa": {
    title: "100 € einzahlen und 25 € bis 55 € erhalten",
    summary: "25 € sicher nach drei Tagen, dazu bis zu 30 € je nach zugeteilter Prämie.",
    actionLabel: "Konto bei Bybit eröffnen",
    discovery: ["Empfohlen", "Krypto"],
    payoutConditions: "25 € nach drei Tagen. Die zusätzlichen bis zu 30 € hängen von der zugeteilten Prämie ab.",
    steps: [
      { title: "Konto anlegen", detail: "Registrieren und die Ausweisdokumente hochladen." },
      { title: "Prüfung abwarten", detail: "Sie ist meist in weniger als einem Tag erledigt." },
      { title: "100 € einzahlen", detail: "Die Einzahlung läuft über den Prämienbereich, das Geschenksymbol oben rechts." },
      { title: "Virtuelle Karte anlegen", detail: "Kostenlose Karte, erstellt mit dem Code 4AXQ3G0." },
      { title: "BTC von der Karte verkaufen", detail: "Das Guthaben liegt in Bitcoin; du verkaufst es, um Euro zu haben." },
      { title: "Prämie erhalten", detail: "25 € nach drei Tagen, dazu bis zu 30 € je nach zugeteilter Prämie." },
    ],
    eligibility: ["Neukunde", "Mindestens 18 Jahre alt", "Identitätsprüfung mit Ausweis"],
    risks: [
      "Die 100 € laufen über Bitcoin. Was du zurückbekommst, hängt vom Kurs und vom Spread beim Verkauf ab.",
      "Nur die 25 € sind sicher. Die zusätzlichen bis zu 30 € hängen von der zugeteilten Prämie ab.",
      "Die Anlage in Kryptowerte ist hochriskant und kann zum Verlust des eingesetzten Kapitals führen.",
    ],
    promoCodeInstruction: "Verwende diesen Code beim Anlegen der virtuellen Karte.",
    supportLabel: "Schreib uns auf WhatsApp",
  },
  "kraken-recompensa": {
    title: "260 € einzahlen und direkt wieder abheben",
    summary: "Das Kapital kann gleich nach der Kontoeröffnung wieder abgehoben werden. Die Prämie liegt zwischen 5 € und 200 €.",
    actionLabel: "Konto bei Kraken eröffnen",
    discovery: ["Empfohlen", "Krypto"],
    payoutConditions: "[PREENCHER: prazo em dias]",
    steps: [
      { title: "Konto anlegen", detail: "Die Registrierung bei Kraken abschließen." },
      { title: "260 € einzahlen", detail: "Die Einzahlung erfüllt die Bedingung der Aktion." },
      { title: "260 € abheben", detail: "Das Kapital kann gleich nach der Kontoeröffnung wieder abgehoben werden." },
      { title: "Prämie erhalten", detail: "Variabler Betrag zwischen 5 € und 200 €." },
    ],
    eligibility: ["Neukunde", "Mindestens 18 Jahre alt", "Identitätsprüfung mit Ausweis"],
    risks: [
      "Die Prämie schwankt zwischen 5 € und 200 €, und du weißt vorher nicht, welcher Betrag dabei herauskommt.",
      "Du musst die 260 € zum Zeitpunkt der Einzahlung verfügbar haben, auch wenn du sie danach sofort abhebst.",
      "[PREENCHER: confirmar se levantar de imediato afeta a atribuição da recompensa]",
      "Die Anlage in Kryptowerte ist hochriskant und kann zum Verlust des eingesetzten Kapitals führen.",
    ],
  },
  "atapoll-inqueritos": {
    title: "An bezahlten Umfragen teilnehmen",
    summary: "Zwischen 0,20 € und 5 € pro Umfrage, im Schnitt rund 0,60 €.",
    actionLabel: "AttaPoll installieren",
    discovery: ["Empfohlen", "Schnelles Geld", "Umfragen"],
    payoutConditions: "Auszahlung, sobald der Mindestbetrag erreicht ist.",
    steps: [
      { title: "App installieren", detail: "AttaPoll über den Einladungslink herunterladen." },
      { title: "Profil ausfüllen", detail: "Ein vollständiges Profil bringt mehr passende Umfragen." },
      { title: "Benachrichtigungen einschalten", detail: "Umfragen sind schnell ausgebucht; wer zuerst antwortet, bekommt mehr." },
      { title: "Regelmäßig teilnehmen", detail: "[PREENCHER: mínimo de levantamento]" },
    ],
    eligibility: ["Mindestens 18 Jahre alt", "Vollständiges Profil für mehr Umfragen"],
    risks: [
      "Der Verdienst hängt von Land, Alter und demografischem Profil ab. In Deutschland ist das Angebot anders als in Großbritannien oder den USA.",
      "Das ersetzt kein Gehalt: Die meisten Nutzer landen im Bereich einiger zehn Euro pro Monat.",
      "Du kannst mitten in einer Umfrage aussortiert werden, ohne den vollen Betrag zu erhalten.",
    ],
    earnings: {
      basis: "In den ersten drei Monaten, je nachdem wie viel Zeit du investierst",
      tiers: [
        { label: "Gelegentlich, 5 bis 10 Min. pro Tag", range: "20 € bis 60 €" },
        { label: "Regelmäßig, 20 bis 30 Min. pro Tag", range: "90 € bis 240 €" },
        { label: "Intensiv, mehrmals täglich", range: "240 € bis 450 €" },
      ],
      ceiling: "Einzelne Nutzer berichten von 150 € bis 200 € im Monat, das sind aber Ausnahmen mit Profilen, die für Werbetreibende besonders gefragt sind. Die Durchschnittswerte über mehrere Länder liegen eher bei 15 € bis 20 € im Monat.",
    },
  },
};

const catalogue: Record<Locale, Record<string, OfferContent>> = { pt, de };

export function offerContent(locale: Locale, id: string): OfferContent | undefined {
  return catalogue[locale][id] ?? catalogue.pt[id];
}

export function contentFor(locale: Locale) {
  return catalogue[locale];
}
