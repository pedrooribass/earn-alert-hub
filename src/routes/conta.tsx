import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bookmark, ChevronRight, Download, FileText, HandCoins, History, LogOut, MessageCircle, Users } from "lucide-react";
import { AppShell } from "@/components/beer-money/app-shell";
import { localeNames, locales, supportChannel, useLocale, useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { offers } from "@/lib/opportunities";
import { statusOf, useOpportunityProgress } from "@/lib/opportunity-progress";

export const Route = createFileRoute("/conta")({
  head: () => ({ meta: [
    { title: "Perfil — Beer Money App" },
    { name: "description", content: "Idioma, ofertas guardadas e informação legal." },
    { property: "og:title", content: "Perfil — Beer Money App" },
    { property: "og:description", content: "As tuas definições." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: AccountPage,
});

function AccountPage() {
  const navigate = useNavigate();
  const { locale, setLocale } = useLocale();
  const { t } = useT();
  const { entryFor } = useOpportunityProgress();

  const started = offers.filter((offer) => entryFor(offer.id, offer.stepCount).steps.length > 0);
  const done = offers.filter((offer) => statusOf(entryFor(offer.id, offer.stepCount), offer.stepCount) === "completed");

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  return <AppShell title={t("account.title")} eyebrow={t("account.eyebrow")}>
    <section className="px-5 pt-4">
      <div className="flex items-center gap-4 border-b pb-6">
        <div className="account-monogram">BM</div>
        <div><h2 className="font-extrabold">{t("account.member")}</h2><p className="text-sm text-muted-foreground">Portugal</p></div>
      </div>

      <div className="language-switch">
        <p>{t("language.label")}</p>
        <div role="group" aria-label={t("language.label")}>
          {locales.map((code) => <button key={code} type="button" aria-pressed={code === locale} onClick={() => setLocale(code)}>{localeNames[code]}</button>)}
        </div>
      </div>

      <div className="py-4">
        <Button asChild variant="outline" className="h-12 w-full"><Link to="/instalar"><Download />{t("account.install")}</Link></Button>
      </div>

      <div className="divide-y">
        <Button asChild variant="ghost" className="account-row h-auto rounded-none px-0">
          <a href={supportChannel.url} target="_blank" rel="noreferrer">
            <MessageCircle className="size-5 text-positive" />
            <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold">{t("account.support")}</span><span className="block text-xs text-muted-foreground">{t("account.supportDetail")}</span></span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </a>
        </Button>

        <Button asChild variant="ghost" className="account-row h-auto rounded-none px-0">
          <Link to="/carteira">
            <History className="size-5" />
            <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold">{t("account.history")}</span><span className="block text-xs text-muted-foreground">{done.length} · {t("account.historyDetail")}</span></span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
        </Button>

        <Button asChild variant="ghost" className="account-row h-auto rounded-none px-0">
          <Link to="/carteira">
            <Bookmark className="size-5" />
            <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold">{t("account.saved")}</span><span className="block text-xs text-muted-foreground">{started.length} · {t("account.savedDetail")}</span></span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
        </Button>

        <Button asChild variant="ghost" className="account-row h-auto rounded-none px-0">
          <a href={supportChannel.url} target="_blank" rel="noreferrer">
            <Users className="size-5" />
            <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold">{t("account.community")}</span><span className="block text-xs text-muted-foreground">{t("account.communityDetail")}</span></span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </a>
        </Button>

        <Button asChild variant="ghost" className="account-row h-auto rounded-none px-0">
          <Link to="/como-ganhamos-dinheiro">
            <HandCoins className="size-5" />
            <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold">{t("account.revenue")}</span><span className="block text-xs text-muted-foreground">{t("account.revenueDetail")}</span></span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
        </Button>

        <Button asChild variant="ghost" className="account-row h-auto rounded-none px-0">
          <Link to="/informacao-legal">
            <FileText className="size-5" />
            <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold">{t("account.legal")}</span><span className="block text-xs text-muted-foreground">{t("account.legalDetail")}</span></span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
        </Button>
      </div>

      <Button variant="ghost" className="mt-6 w-full text-muted-foreground" onClick={logout}><LogOut />{t("account.logout")}</Button>
    </section>
  </AppShell>;
}