import { cn } from "@/lib/utils";

export function BrandLogo({ name, large = false, className }: { name: string; large?: boolean; className?: string }) {
  const initials = name.replace(/[^a-zA-Z0-9!]/g, "").slice(0, name.length <= 4 ? 3 : 2).toUpperCase();
  return <div className={cn("partner-logo", large && "partner-logo-large", className)} aria-hidden="true"><span>{initials}</span></div>;
}