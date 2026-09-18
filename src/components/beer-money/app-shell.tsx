import type { ReactNode } from "react";
import { Brand } from "./brand";
import { BottomNav } from "./bottom-nav";
import { SplashScreen } from "./splash-screen";

export function AppShell({ children, title, eyebrow, action }: { children: ReactNode; title?: string; eyebrow?: string; action?: ReactNode }) {
  return <div className="app-frame">
    <SplashScreen />
    <header className="app-header">
      {title ? <div>{eyebrow && <p className="page-context">{eyebrow}</p>}<h1 className="text-xl font-bold">{title}</h1></div> : <Brand compact />}
      {action}
    </header>
    <main className="pb-28">{children}</main>
    <BottomNav />
  </div>;
}
