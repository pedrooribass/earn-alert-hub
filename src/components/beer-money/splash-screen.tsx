import { useEffect, useState } from "react";
import mark from "@/assets/bmc-mark.png.asset.json";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("bmc-splash-seen")) return;
    setVisible(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("bmc-splash-seen", "1");
    }, 1900);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;
  return (
    <div className="splash-screen" aria-label="Beer Money App">
      <div className="splash-mark"><img src={mark.url} alt="" /></div>
      <p className="splash-name">Beer Money App</p>
      <p className="splash-slogan">Bónus de registo, verificados.</p>
      <p className="splash-description">Comparamos recompensa, capital exigido e prazo de pagamento.</p>
    </div>
  );
}