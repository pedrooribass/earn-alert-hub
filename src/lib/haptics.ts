/**
 * Resposta tátil.
 *
 * O Safari em iOS não implementa navigator.vibrate, e a maioria dos nossos
 * utilizadores vai abrir a app a partir do ecrã principal de um iPhone. Em vez
 * de deixar a chamada a falhar em silêncio, marcamos o elemento tocado para
 * que o CSS lhe dê uma resposta visual curta: num iPhone é o que substitui a
 * vibração, e num Android acontecem as duas coisas.
 */
export function tap(element?: EventTarget | null) {
  navigator.vibrate?.(8);
  const node = element instanceof HTMLElement ? element.closest<HTMLElement>("[data-tappable], a, button") : null;
  if (!node) return;
  node.setAttribute("data-tapped", "true");
  window.setTimeout(() => node.removeAttribute("data-tapped"), 180);
}