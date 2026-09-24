import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MoreVertical, Share, SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "@/components/beer-money/brand";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";
import { isStandalone as inApp, markSeen } from "@/lib/entry-flow";

declare global { interface WindowEventMap { beforeinstallprompt: Event } }
type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };

export const Route = createFileRoute("/instalar")({
  head: () => ({ meta: [
    { title: "Instalar — Beer Money App" },
    { name: "description", content: "Adiciona a Beer Money App ao ecrã principal." },
    { property: "og:title", content: "Instalar Beer Money App" },
    { property: "og:description", content: "Acesso num toque, como qualquer aplicação." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: InstallPage,
});

/** As instruções mudam com o sistema: dizer "toca em Partilhar" a um Android é mandá-lo procurar um botão que não existe. */
function detectPlatform(): "ios" | "android" {
  if (typeof navigator === "undefined") return "ios";
  return /android/i.test(navigator.userAgent) ? "android" : "ios";
}

function InstallPage() {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null);
  const [platform, setPlatform] = useState<"ios" | "android">("ios");
  const [installed, setInstalled] = useState(false);
  const navigate = useNavigate();
  const { t } = useT();

  useEffect(() => {
    setPlatform(detectPlatform());
    setInstalled(inApp());
    const handler = (event: Event) => { event.preventDefault(); setPrompt(event as InstallPromptEvent); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function leave() {
    markSeen("installSeen");
    navigate({ to: "/login", replace: true });
  }

  async function install() {
    if (prompt) { await prompt.prompt(); await prompt.userChoice; }
    leave();
  }

  const icons = [platform === "ios" ? Share : MoreVertical, SquarePlus, SquarePlus];

  return <main className="entry-screen">
    <Brand />
    <div className="entry-body">
      <p className="page-context">{t("install.eyebrow")}</p>
      <h1 className="entry-title">{t("install.title")}</h1>
      <p className="entry-text">{installed ? t("install.installed") : t("install.body")}</p>

      {!installed && !prompt && <ol className="mt-8 space-y-2.5">
        {[1, 2, 3].map((n, index) => {
          const Icon = icons[index] ?? SquarePlus;
          return <li key={n} className="install-step">
            <span className="step-number">{n}</span>
            <div className="flex-1">
              <p className="text-sm font-bold">{t(`install.${platform}.${n}.title`)}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{t(`install.${platform}.${n}.text`)}</p>
            </div>
            <Icon className="size-5 text-muted-foreground" />
          </li>;
        })}
      </ol>}
    </div>

    <div className="space-y-2">
      <Button size="lg" className="h-13 w-full text-base" onClick={install}>
        {prompt && !installed ? t("install.cta") : t("install.open")}
      </Button>
      {!installed && <Button variant="ghost" className="w-full text-muted-foreground" onClick={leave}>{t("install.later")}</Button>}
    </div>
  </main>;
}