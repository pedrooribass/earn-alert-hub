import type { ReactNode } from "react";
import { Brand } from "./brand";
import { BottomNav } from "./bottom-nav";

export function AppShell({ children, title, eyebrow, action }: { children: ReactNode; title?: string; eyebrow?: string; action?: ReactNode }) {
  return <div className="app-frame">
    <header className="app-header">
      {title ? <div><p className="eyebrow">{eyebrow}</p><h1 className="text-2xl font-extrabold">{title}</h1></div> : <Brand />}
      {action}
    </header>
    <main className="pb-28">{children}</main>
    <BottomNav />
  </div>;
}
