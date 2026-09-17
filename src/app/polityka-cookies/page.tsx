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
            logowania oraz zapamiętanie Twojej decyzji o cookies.
          </p>

          <h2>2. Rodzaje cookies, których używamy</h2>
          <p>
            <strong>Niezbędne</strong> — konieczne do działania sklepu:
            logowanie i sesja, koszyk, bezpieczeństwo. Nie wymagają zgody i nie
            można ich wyłączyć.
          </p>
          <p>
            <strong>Analityczne i marketingowe — nie używamy ich.</strong> Nie
            prowadzimy analityki internetowej, nie wyświetlamy reklam i nie
            profilujemy Cię na potrzeby marketingu. W serwisie nie działa Google
            Analytics, Google Ads ani narzędzia reklamowe Meta (Facebook).
          </p>
          <p>
            Zawartość koszyka przechowujemy w pamięci lokalnej przeglądarki
            (localStorage), a nie w cookies. Dane te zostają na Twoim urządzeniu
            i trafiają do nas dopiero w chwili złożenia zamówienia.
          </p>

          <h2>3. Zgoda i jej wycofanie</h2>
          <p>
            Ponieważ używamy wyłącznie cookies niezbędnych do działania sklepu,
            nie prosimy Cię o zgodę na cookies — przepisy jej w tym przypadku nie
            wymagają. Przy pierwszej wizycie pokazujemy jedynie krótką informację.
            Wszystkie cookies możesz w każdej chwili usunąć, czyszcząc dane
            witryny w przeglądarce.
          </p>

          <h2>4. Cookies podmiotów trzecich</h2>
          <p>
            Nie osadzamy w serwisie narzędzi reklamowych ani analitycznych
            podmiotów trzecich. Przy płatności online zostajesz przekierowany do
            Przelewy24 (PayPro S.A.), które przetwarza dane zgodnie z własną
            polityką prywatności.
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
