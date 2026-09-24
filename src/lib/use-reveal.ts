import { useEffect } from "react";

/**
 * Aparecimento suave ao entrar no ecrã.
 *
 * O estado escondido só é aplicado depois de o observador arrancar, através do
 * atributo em <html>. Assim, se o JavaScript falhar ou o utilizador tiver
 * animações desligadas, o conteúdo fica visível em vez de desaparecer.
 * Cada elemento anima uma vez só: reanimar ao subir e descer a lista dá a
 * sensação de interface instável.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])"));
    if (reduced || typeof IntersectionObserver === "undefined") {
      targets.forEach((element) => element.setAttribute("data-shown", "true"));
      return;
    }

    document.documentElement.setAttribute("data-reveal-ready", "true");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.setAttribute("data-shown", "true");
        observer.unobserve(element);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}