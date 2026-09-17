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
    <div className="splash-screen" aria-label="Beer Money Club">
      <div className="splash-mark"><img src={mark.url} alt="" /></div>
      <p className="splash-name">Beer Money Club</p>
      <p className="splash-slogan">Nunca mais percas uma oportunidade.</p>
    </div>
  );
}