import { cn } from "@/lib/utils";
import { siCoinbase, siRobinhood } from "simple-icons";
import myfin from "@/assets/myfin-logo.png.asset.json";
import kraken from "@/assets/kraken-logo.png.asset.json";
import attapoll from "@/assets/attapoll-logo.png.asset.json";

/**
 * Logótipos das plataformas.
 *
 * Quando existe o ícone da marca, é esse que se usa. Sem ele, o desenho vetorial
 * do simple-icons entra com a cor oficial sobre um fundo tingido, para que todas
 * as linhas da lista tenham o mesmo peso visual em vez de umas com imagem e
 * outras com texto cinzento.
 */
const marks: Record<string, { path: string; hex: string }> = { Coinbase: siCoinbase, Robinhood: siRobinhood };
const images: Record<string, string> = { MyFin: myfin.url, Kraken: kraken.url, AttaPoll: attapoll.url };

export function BrandLogo({ name, large = false, className }: { name: string; large?: boolean; className?: string }) {
  const mark = marks[name];
  const image = images[name];

  if (image) {
    return <div className={cn("partner-logo", large && "partner-logo-large", className)} data-brand={name.toLowerCase()} aria-hidden="true">
      <img src={image} alt="" loading="lazy" />
    </div>;
  }

  if (mark) {
    return <div
      className={cn("partner-logo partner-logo-tinted", large && "partner-logo-large", className)}
      data-brand={name.toLowerCase()}
      style={{ "--brand": `#${mark.hex}` } as React.CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" role="img"><path d={mark.path} fill="currentColor" /></svg>
    </div>;
  }

  return <div className={cn("partner-logo", large && "partner-logo-large", className)} data-brand={name.toLowerCase()} aria-hidden="true">
    <span className="brand-wordmark">{name.slice(0, 2)}</span>
  </div>;
}