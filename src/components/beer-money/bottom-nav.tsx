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
        return <Link key={to} to={to} className={active ? "nav-item text-primary" : "nav-item text-muted-foreground"}>
          <span className={active ? "nav-icon bg-accent" : "nav-icon"}><Icon strokeWidth={active ? 2.4 : 1.8} /></span>
          <span>{label}</span>
        </Link>;
      })}
    </div>
  </nav>;
}
