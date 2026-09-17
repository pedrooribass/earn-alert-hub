import icon from "@/assets/bmc-app-icon.png.asset.json";
import { cn } from "@/lib/utils";

export function Brand({ compact = false, className }: { compact?: boolean; className?: string }) {
  return <div className={cn("flex items-center gap-2.5", className)}>
    <img src={icon.url} alt="Beer Money Club" width={1024} height={1024} className="size-10 rounded-lg" />
    {!compact && <span className="text-[15px] font-extrabold text-foreground">Beer Money <span className="text-primary">Club</span></span>}
  </div>;
}
