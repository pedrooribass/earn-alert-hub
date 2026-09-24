/**
 * Transição entre ecrãs.
 *
 * Usa a View Transitions API do browser, que anima a saída do ecrã antigo e a
 * entrada do novo em simultâneo. O sentido do deslize vem da posição na
 * navegação: ir da Carteira para o Perfil desliza para a esquerda, voltar
 * desliza para a direita. É o que um utilizador de telemóvel espera, e sem
 * isso a animação parece aleatória.
 *
 * Onde a API não existe (Firefox, Safari antigo) a navegação continua
 * instantânea, sem salto nem erro.
 */

const order = ["/", "/explorar", "/carteira", "/conta"];

function indexOf(pathname: string) {
  if (pathname === "/") return 0;
  const found = order.findIndex((route) => route !== "/" && pathname.startsWith(route));
  return found === -1 ? order.length : found;
}

export type TransitionDirection = "forward" | "back" | "none";

export function directionBetween(from: string, to: string): TransitionDirection {
  const a = indexOf(from);
  const b = indexOf(to);
  if (a === b) return "none";
  return b > a ? "forward" : "back";
}

/** O sentido é lido pelo CSS através de um atributo em <html>. */
export function setDirection(direction: TransitionDirection) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-nav", direction);
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function supportsViewTransitions() {
  return typeof document !== "undefined" && typeof (document as Document & { startViewTransition?: unknown }).startViewTransition === "function";
}