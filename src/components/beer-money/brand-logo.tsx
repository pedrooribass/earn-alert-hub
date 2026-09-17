import { cn } from "@/lib/utils";
import { siCoinbase, siRobinhood } from "simple-icons";

const marks: Record<string, { path: string }> = { Coinbase: siCoinbase, Robinhood: siRobinhood };

export function BrandLogo({ name, large = false, className }: { name: string; large?: boolean; className?: string }) {
  const mark = marks[name];
  return <div className={cn("partner-logo", large && "partner-logo-large", className)} data-brand={name.toLowerCase()} aria-hidden="true">{mark ? <svg viewBox="0 0 24 24" role="img"><path d={mark.path} fill="currentColor" /></svg> : <span className="brand-wordmark">{name}</span>}</div>;
}