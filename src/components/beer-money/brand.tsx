import icon from "@/assets/beer-money-club-icon.png";
import { cn } from "@/lib/utils";

export function Brand({ compact = false, className }: { compact?: boolean; className?: string }) {
  return <div className={cn("flex items-center gap-2.5", className)}>
    <img src={icon} alt="Beer Money Club" width={1024} height={1024} className="size-9 rounded-[10px]" />
    {!compact && <span className="text-[15px] font-extrabold text-foreground">Beer Money Club</span>}
  </div>;
}
