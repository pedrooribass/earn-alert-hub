import type { Locale } from "./i18n";

/**
 * Uma convenção só para dinheiro em toda a aplicação.
 *
 * Havia quatro formatos a conviver: "50€" escrito à mão nas linhas, um número
 * com o símbolo num <i> separado no painel, e dois moldes diferentes no
 * dicionário. Num produto sobre dinheiro, o valor é o elemento que a pessoa lê
 * primeiro em todos os ecrãs; escrevê-lo de maneiras diferentes é o tipo de
 * incoerência que se nota sem se saber nomear.
 *
 * Regras: o símbolo vem depois do número, colado em português e com espaço
 * inquebrável em alemão, como manda cada convenção. Intervalos usam meia-risca
 * e um só símbolo. Em tamanhos de display o símbolo desce de tamanho e de
 * contraste, porque aí o número é a figura; em texto corrido fica igual, porque
 * aí seria um floreado.
 */

export function moneyText(locale: Locale, min: number, max?: number) {
  const range = max === undefined ? `${min}` : `${min}–${max}`;
  return locale === "de" ? `${range}\u00A0€` : `${range}€`;
}

type Size = "display" | "value" | "inline";

export function Money({ locale, min, max, size = "inline" }: { locale: Locale; min: number; max?: number | undefined; size?: Size | undefined }) {
  const range = max === undefined ? `${min}` : `${min}–${max}`;
  const spaced = locale === "de";

  if (size === "inline") return <>{moneyText(locale, min, max)}</>;

  return (
    <span className="money" data-size={size}>
      <span className="money-figure">{range}</span>
      <span className="money-symbol" data-spaced={spaced}>€</span>
    </span>
  );
}