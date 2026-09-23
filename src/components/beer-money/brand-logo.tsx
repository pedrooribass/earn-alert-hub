import { cn } from "@/lib/utils";
import { siCoinbase, siRobinhood } from "simple-icons";
import myfin from "@/assets/myfin-logo.png.asset.json";
import kraken from "@/assets/kraken-logo.png.asset.json";
import attapoll from "@/assets/attapoll-logo.png.asset.json";

/**
 * Logótipos das plataformas, por ordem de preferência.
 *
 * 1. Um ficheiro em src/assets/logos/ com o nome da marca (myfin.png,
 *    trading212.png, ...). Basta largar lá o ícone e ele aparece: não é preciso
 *    editar este ficheiro nem registar o import.
 * 2. Os assets antigos do Lovable, para as marcas que já os tinham.
 * 3. O desenho vetorial do simple-icons, com a cor oficial da marca.
 * 4. Um monograma com as duas primeiras letras.
 */
const dropped = import.meta.glob("@/assets/logos/*.{png,jpg,jpeg,webp,svg}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

const droppedByKey: Record<string, string> = Object.fromEntries(
  Object.entries(dropped).map(([path, url]) => [path.split("/").pop()!.replace(/\.[^.]+$/, "").toLowerCase(), url]),
);

const legacy: Record<string, string> = { myfin: myfin.url, kraken: kraken.url, attapoll: attapoll.url };
const marks: Record<string, { path: string; hex: string }> = { coinbase: siCoinbase, robinhood: siRobinhood };

export function BrandLogo({ name, logoKey, large = false, className }: { name: string; logoKey?: string; large?: boolean; className?: string }) {
  const key = (logoKey ?? name).toLowerCase().replace(/\s+/g, "");
  const image = droppedByKey[key] ?? legacy[key];
  const mark = marks[key];
  const classes = cn("partner-logo", large && "partner-logo-large", className);

  if (image) {
    return <div className={classes} data-brand={key} aria-hidden="true"><img src={image} alt="" loading="lazy" /></div>;
  }

  if (mark) {
    return <div className={cn(classes, "partner-logo-tinted")} data-brand={key} style={{ "--brand": `#${mark.hex}` } as React.CSSProperties} aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img"><path d={mark.path} fill="currentColor" /></svg>
    </div>;
  }

  return <div className={classes} data-brand={key} aria-hidden="true"><span className="brand-wordmark">{name.slice(0, 2)}</span></div>;
}