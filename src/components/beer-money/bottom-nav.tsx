import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Home, UserRound, Wallet } from "lucide-react";
import { useT } from "@/lib/i18n";

const items = [
  { to: "/" as const, key: "nav.today", icon: Home },
  { to: "/explorar" as const, key: "nav.explore", icon: Compass },
  { to: "/carteira" as const, key: "nav.wallet", icon: Wallet },
  { to: "/conta" as const, key: "nav.account", icon: UserRound },
];

export function BottomNav() {
  const { t } = useT();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return <nav aria-label="Beer Money" className="bottom-navigation">
    <div className="grid grid-cols-4">
      {items.map(({ to, key, icon: Icon }) => {
        const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
        return <Link key={to} to={to} aria-current={active ? "page" : undefined} onClick={() => navigator.vibrate?.(8)} className={active ? "nav-item nav-item-active" : "nav-item"}>
          <span className="nav-icon"><Icon strokeWidth={active ? 2.25 : 1.75} /></span>
          <span>{t(key)}</span>
        </Link>;
      })}
    </div>
  </nav>;
}