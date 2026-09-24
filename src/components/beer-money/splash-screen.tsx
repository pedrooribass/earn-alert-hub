import { useEffect, useState } from "react";
import mark from "@/assets/bmc-mark.png.asset.json";
import { useT } from "@/lib/i18n";

/**
 * Só aparece uma vez por sessão e sai sozinho. Mantém-se curto de propósito:
 * um ecrã de arranque longo é tempo roubado a quem já sabe o que vem a seguir.
 */
export function SplashScreen() {
  const [phase, setPhase] = useState<"hidden" | "in" | "out">("hidden");
  const { t } = useT();

  useEffect(() => {
    if (sessionStorage.getItem("bmc-splash-seen")) return;
    setPhase("in");
    const fade = window.setTimeout(() => setPhase("out"), 1100);
    const done = window.setTimeout(() => {
      setPhase("hidden");
      sessionStorage.setItem("bmc-splash-seen", "1");
    }, 1500);
    return () => { window.clearTimeout(fade); window.clearTimeout(done); };
  }, []);

  if (phase === "hidden") return null;
  return (
    <div className="splash-screen" data-phase={phase} role="status" aria-label="Beer Money">
      <div className="splash-mark"><img src={mark.url} alt="" /></div>
      <p className="splash-name">Beer Money</p>
      <p className="splash-slogan">{t("splash.slogan")}</p>
      <p className="splash-description">{t("splash.description")}</p>
    </div>
  );
}