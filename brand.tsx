import icon from "@/assets/bmc-app-icon.png.asset.json";
import { cn } from "@/lib/utils";

export function Brand({ compact = false, className }: { compact?: boolean; className?: string }) {
  return <div className={cn("flex items-center gap-2.5", className)} aria-label="Beer Money App">
    <img src={icon.url} alt="Beer Money App" width={1024} height={1024} className="brand-app-icon" />
    <span className="brand-name"><strong>Beer Money</strong> <em>App</em></span>
  </div>;
}
