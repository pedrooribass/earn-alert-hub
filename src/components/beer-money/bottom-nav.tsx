import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Compass, Home, UserRound } from "lucide-react";

const items = [
  { to: "/" as const, label: "Hoje", icon: Home },
  { to: "/explorar" as const, label: "Explorar", icon: Compass },
  { to: "/alertas" as const, label: "Alertas", icon: Bell },
  { to: "/conta" as const, label: "Conta", icon: UserRound },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return <nav aria-label="Navegação principal" className="bottom-navigation">
    <div className="grid grid-cols-4">
      {items.map(({ to, label, icon: Icon }) => {
        const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
        return <Link key={to} to={to} aria-current={active ? "page" : undefined} onClick={() => navigator.vibrate?.(8)} className={active ? "nav-item nav-item-active" : "nav-item"}>
          <span className="nav-icon"><Icon strokeWidth={active ? 2.25 : 1.75} /></span>
          <span>{label}</span>
        </Link>;
      })}
    </div>
  </nav>;
}
