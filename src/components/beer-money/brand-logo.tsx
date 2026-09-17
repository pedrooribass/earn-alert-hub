import { cn } from "@/lib/utils";
import { siCoinbase, siRobinhood } from "simple-icons";
import myfin from "@/assets/myfin-logo.png.asset.json";
import bybit from "@/assets/bybit-logo.png.asset.json";
import kraken from "@/assets/kraken-logo.png.asset.json";
import attapoll from "@/assets/attapoll-logo.png.asset.json";

const marks: Record<string, { path: string; hex: string }> = { Coinbase: siCoinbase, Robinhood: siRobinhood };
const images: Record<string, string> = { MyFin: myfin.url, Bybit: bybit.url, Kraken: kraken.url, AttaPoll: attapoll.url };

export function BrandLogo({ name, large = false, className }: { name: string; large?: boolean; className?: string }) {
  const mark = marks[name];
  const image = images[name];
  return <div className={cn("partner-logo", large && "partner-logo-large", className)} data-brand={name.toLowerCase()} aria-hidden="true">
    {image ? <img src={image} alt="" /> : mark ? <svg viewBox="0 0 24 24" role="img"><path d={mark.path} fill="currentColor" /></svg> : <span className="brand-wordmark">{name}</span>}
  </div>;
}
