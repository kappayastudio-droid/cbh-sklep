import type { Metadata } from "next"

import { LegalArticle } from "@/components/legal-article"
import { PageBanner } from "@/components/layout/page-banner"
import { Section } from "@/components/ui/section"

export const metadata: Metadata = {
  title: "Polityka cookies — CBH Polska",
  description:
    "Informacje o plikach cookies używanych w sklepie CBH Polska oraz zarządzaniu zgodą.",
}

export default function CookiePolicyPage() {
  return (
    <>
      <PageBanner
        title="Polityka cookies"
        crumbs={[
          { href: "/", label: "Strona główna" },
          { label: "Polityka cookies" },
        ]}
      />
      <Section surface="background" className="lg:!pt-10">
        <LegalArticle>
          <p>
            <em>
              Dokument roboczy (draft) — przed publikacją prosimy o weryfikację
              treści z osobą odpowiedzialną za ochronę danych / prawnikiem.
            </em>
          </p>

          <p>Operatorem serwisu i administratorem danych jest:</p>
          <address>
            Chenice System Polska
            <br />
            ul. Meissnera 47, 60-408 Poznań
            <br />
            NIP: 7771134877, REGON: 631006741
          </address>

          <h2>1. Czym są pliki cookies</h2>
          <p>
            Cookies to niewielkie pliki tekstowe zapisywane na Twoim urządzeniu
            podczas korzystania z serwisu. Umożliwiają m.in. utrzymanie sesji
            logowania, zapamiętanie zawartości koszyka oraz — za Twoją zgodą —
            analizę ruchu i działania marketingowe.
          </p>

          <h2>2. Rodzaje cookies, których używamy</h2>
          <p>
            <strong>Niezbędne</strong> — konieczne do działania sklepu:
            logowanie i sesja, koszyk, bezpieczeństwo. Nie wymagają zgody i nie
            można ich wyłączyć.
          </p>
          <p>
            <strong>Analityczne</strong> — pomagają zrozumieć, jak używasz
            serwisu (np. Google Analytics). Instalowane wyłącznie po wyrażeniu
            zgody.
          </p>
          <p>
            <strong>Marketingowe</strong> — służą do wyświetlania i pomiaru
            reklam (np. Google Ads). Instalowane wyłącznie po wyrażeniu zgody.
          </p>

          <h2>3. Zgoda i jej wycofanie</h2>
          <p>
            Przy pierwszej wizycie wyświetlamy baner, w którym możesz zaakceptować
            wszystkie cookies albo ograniczyć się do niezbędnych. Zgodę możesz w
            każdej chwili zmienić lub wycofać, czyszcząc dane witryny w
            przeglądarce (co spowoduje ponowne wyświetlenie baneru) lub zmieniając
            ustawienia cookies w przeglądarce.
          </p>

          <h2>4. Cookies podmiotów trzecich</h2>
          <p>
            Po wyrażeniu zgody w serwisie mogą działać narzędzia dostawców
            zewnętrznych, w szczególności Google (Google Analytics, Google Ads).
            Przetwarzają one dane zgodnie z własnymi politykami prywatności.
            Płatności obsługuje Przelewy24 (PayPro S.A.).
          </p>

          <h2>5. Zarządzanie cookies w przeglądarce</h2>
          <p>
            Ustawienia cookies możesz zmienić w każdej przeglądarce (Chrome,
            Safari, Firefox, Edge) — w sekcji prywatności/bezpieczeństwa. Wyłączenie
            cookies niezbędnych może uniemożliwić poprawne działanie sklepu (np.
            logowanie i koszyk).
          </p>

          <h2>6. Kontakt</h2>
          <p>
            W sprawach dotyczących cookies i danych osobowych napisz na:{" "}
            <a href="mailto:chenice@list.pl">chenice@list.pl</a>.
          </p>
        </LegalArticle>
      </Section>
    </>
  )
}
