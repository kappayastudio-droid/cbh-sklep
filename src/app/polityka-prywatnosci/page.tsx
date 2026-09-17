import type { Metadata } from "next"

import { LegalArticle } from "@/components/legal-article"
import { PageBanner } from "@/components/layout/page-banner"
import { Section } from "@/components/ui/section"

export const metadata: Metadata = {
  title: "Polityka prywatności — CBH Polska",
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner
        title="Polityka prywatności"
        crumbs={[
          { href: "/", label: "Strona główna" },
          { label: "Polityka prywatności" },
        ]}
      />
      <Section surface="background" className="lg:!pt-10">
        <LegalArticle>
          <p>
            Właścicielem serwisu{" "}
            <a href="http://cbh-polska.pl">http://cbh-polska.pl</a> jest:
          </p>
          <address>
            Chenice System Polska
            <br />
            Ul. Meissnera 47, 60-408, Poznań
            <br />
            NIP: 7771134877
            <br />
            REGON: 631006741
          </address>

          <p>
            Dokładamy wszelkich starań, aby Państwa prywatność była odpowiednio
            chroniona. W celu realizacji zgodnego z prawem, przejrzystego i
            bezpiecznego przetwarzania Państwa danych osobowych przyjmujemy
            niniejszą Politykę Prywatności, która obowiązuje od dnia 11.07.2018 r.
          </p>
          <p>
            Polityka Prywatności odwołuje się do RODO, czyli Rozporządzenia
            Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia
            2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem
            danych osobowych i w sprawie swobodnego przepływu takich danych oraz
            uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie
            danych). Dokument określa jakie dane i na jakich zasadach
            przetwarzamy i jak dbamy o ich bezpieczeństwo i Państwa prawa.
          </p>

          <h2>Administrator danych osobowych</h2>
          <address>
            Chenice System Polska
            <br />
            Ul. Meissnera 47, 60-408, Poznań
            <br />
            NIP: 7771134877
            <br />
            REGON: 631006741
          </address>
          <p>
            Administrator wyznaczył Inspektora Ochrony Danych. W razie pytań
            dotyczących przetwarzania Państwa danych osobowych oraz
            przysługujących Państwu praw, prosimy o kontakt drogą mailową:{" "}
            <a href="mailto:platforma@cbh-polska.pl">platforma@cbh-polska.pl</a>
          </p>

          <h2>Zakres, cele i podstawy prawne przetwarzania danych osobowych</h2>
          <p>
            W związku z tym, że poprzez serwis umożliwiamy kontakt w różnych
            sprawach, przetwarzamy Państwa dane osobowe w różnych celach, w
            różnych zakresach i na różnych podstawach prawnych. W celu
            precyzyjnego przekazania informacji na temat przetwarzania Państwa
            danych osobowych pogrupowaliśmy je według celu przetwarzania danych.
          </p>

          <h3>Przedstawienie oferty naszych usług</h3>
          <p>
            <strong>Zakres danych:</strong> W celu przygotowania i
            przedstawienia oferty naszych usług przetwarzamy dane osobowe
            przesłane za pomocą formularza kontaktowego: Imię i nazwisko, adres
            e-mail, adres strony www, numer telefonu, treść zapytania.
          </p>
          <p>
            <strong>Podstawa prawna:</strong> Przetwarzanie jest niezbędne do
            podjęcia działań na żądanie osoby, której dane dotyczą, przed
            zawarciem umowy.
          </p>

          <h3>Obsługa pozostałych zapytań z formularza kontaktowego</h3>
          <p>
            <strong>Zakres danych:</strong> W celu odpowiedzi na zapytania nie
            będące prośbą o przedstawienie oferty naszych usług przetwarzamy dane
            przesłane za pomocą formularza kontaktowego: Imię i nazwisko, adres
            e-mail, adres strony www, numer telefonu, treść zapytania.
          </p>
          <p>
            <strong>Podstawa prawna:</strong> Nasz prawnie uzasadniony interes
            (przetwarzanie na żądanie osoby, której dane dotyczą).
          </p>
          <p>
            W przypadku danych osobowych pozyskanych w inny sposób, niż przez
            stronę <a href="http://cbh-polska.pl">http://cbh-polska.pl</a>{" "}
            (telefonicznie, mailowo itd.) również przetwarzamy je wyłącznie w
            celu, w jakim zostały udostępnione i przez czas jaki jest konieczny
            do realizacji tego celu. W przypadku planowanej zmiany celu
            przetwarzania, zawsze pytamy właściciela danych osobowych o zgodę i
            informujemy o zmieniających się warunkach przetwarzania danych.
          </p>

          <h3>Konto w sklepie internetowym B2B</h3>
          <p>
            <strong>Zakres danych:</strong> adres e-mail, hasło (przechowywane
            wyłącznie w postaci zaszyfrowanej), imię i nazwisko, nazwa firmy,
            NIP, numer telefonu.
          </p>
          <p>
            <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. b RODO —
            przetwarzanie jest niezbędne do wykonania umowy o prowadzenie konta
            w serwisie.
          </p>

          <h3>Realizacja zamówień hurtowych</h3>
          <p>
            <strong>Zakres danych:</strong> dane konta, adres dostawy, dane do
            faktury, zawartość i wartość zamówienia oraz indywidualne warunki
            handlowe (przyznany rabat).
          </p>
          <p>
            <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. b RODO
            (wykonanie umowy sprzedaży) oraz art. 6 ust. 1 lit. c RODO —
            wypełnienie obowiązków wynikających z przepisów podatkowych
            i o rachunkowości, które wymagają przechowywania dokumentacji
            sprzedaży przez 5 lat, licząc od końca roku kalendarzowego, w którym
            upłynął termin płatności podatku.
          </p>

          <h3>Płatności online</h3>
          <p>
            <strong>Zakres danych:</strong> dane niezbędne do rozliczenia
            transakcji, przekazywane operatorowi płatności. Nie przechowujemy
            danych Państwa karty płatniczej — obsługuje je wyłącznie operator.
          </p>
          <p>
            <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. b RODO.
          </p>

          <h3>Obsługa stałych klientów hurtowych</h3>
          <p>
            <strong>Zakres danych:</strong> dane kontaktowe i handlowe salonów
            oraz firm, które kupują u nas od lat, pozyskane w związku z
            prowadzoną sprzedażą — telefonicznie, mailowo oraz z dokumentów
            sprzedaży.
          </p>
          <p>
            <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. b RODO
            (wykonanie umowy sprzedaży) oraz art. 6 ust. 1 lit. f RODO — nasz
            prawnie uzasadniony interes polegający na obsłudze i kontynuowaniu
            bieżącej współpracy handlowej.
          </p>

          <h2>Pliki cookies</h2>
          <p>
            Korzystamy wyłącznie z plików cookies niezbędnych do działania
            serwisu. <strong>Nie prowadzimy analityki internetowej, nie
            wyświetlamy reklam i nie profilujemy Państwa na potrzeby
            marketingu.</strong> Nie korzystamy z Google Analytics, Google Ads
            ani z narzędzi reklamowych Meta (Facebook).
          </p>
          <ul>
            <li>
              <strong>Sesja i logowanie</strong> — pliki cookies utrzymujące
              Państwa zalogowanie na koncie B2B. Bez nich logowanie
              i składanie zamówień nie działa.
            </li>
            <li>
              <strong>Zapamiętanie decyzji o cookies</strong> — informacja o
              tym, że baner został już zamknięty, aby nie pojawiał się przy
              każdej wizycie.
            </li>
          </ul>
          <p>
            Zawartość koszyka przechowujemy w pamięci lokalnej przeglądarki
            (localStorage) na Państwa urządzeniu. Dane te pozostają na Państwa
            komputerze i trafiają do nas dopiero w chwili złożenia zamówienia.
          </p>
          <p>
            Mogą Państwo samodzielnie i w każdym czasie zmienić ustawienia
            dotyczące plików cookies, określając warunki ich przechowywania i
            uzyskiwania dostępu do Państwa urządzenia. Zmiany można wprowadzić
            w ustawieniach przeglądarki internetowej — również tak, aby
            blokować obsługę plików cookies lub informować o każdym ich
            zapisaniu. Ograniczenie stosowania plików cookies może wpłynąć na
            działanie serwisu, w szczególności uniemożliwić zalogowanie się.
          </p>

          <h2>Przekazywanie danych osobowych</h2>
          <h3>Dostawcy usług</h3>
          <p>
            Przekazujemy Państwa dane osobowe dostawcom usług, z których
            korzystamy przy prowadzeniu serwisu. W zależności od sytuacji są oni
            podmiotami przetwarzającymi (działają wyłącznie na nasze polecenie)
            albo administratorami (sami ustalają cele i sposoby przetwarzania).
            Wykaz dostawców, z których usług korzystamy:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Świadczone usługi</th>
                  <th>Rola</th>
                  <th>Lokalizacja danych</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Supabase, Inc.</td>
                  <td>
                    baza danych serwisu: konta klientów, zamówienia, adresy
                    dostawy, obsługa logowania
                  </td>
                  <td>Podmiot przetwarzający</td>
                  <td>Irlandia (EOG); spółka z siedzibą w USA</td>
                </tr>
                <tr>
                  <td>Netlify, Inc.</td>
                  <td>hosting i udostępnianie serwisu</td>
                  <td>Podmiot przetwarzający</td>
                  <td>USA (poza EOG)</td>
                </tr>
                <tr>
                  <td>Resend, Inc.</td>
                  <td>
                    wysyłka wiadomości transakcyjnych, np. potwierdzeń zamówień
                  </td>
                  <td>Podmiot przetwarzający</td>
                  <td>USA (poza EOG)</td>
                </tr>
                <tr>
                  <td>PayPro S.A. (Przelewy24)</td>
                  <td>obsługa płatności online</td>
                  <td>Administrator</td>
                  <td>Polska (EOG)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Operatorem płatności Przelewy24 jest PayPro S.A. z siedzibą w
            Poznaniu, ul. Pastelowa 8, 60-198 Poznań, KRS 0000347935. PayPro
            S.A. jest odrębnym administratorem Państwa danych w zakresie obsługi
            płatności i informuje o ich przetwarzaniu we własnej polityce
            prywatności.
          </p>
          <p>
            <strong>Przekazywanie danych poza EOG.</strong> Dane naszego sklepu
            — konta klientów i zamówienia — przechowywane są na serwerach
            w Irlandii, czyli na terenie Europejskiego Obszaru Gospodarczego.
            Część naszych dostawców ma jednak siedzibę w Stanach Zjednoczonych,
            co oznacza, że ich personel może uzyskać dostęp do danych w celu
            świadczenia i utrzymania usługi. Przekazywanie danych odbywa się na
            podstawie standardowych klauzul umownych zatwierdzonych przez
            Komisję Europejską.
          </p>

          <h3>Organy Państwowe</h3>
          <p>
            Udostępniamy Państwa dane osobowe, jeżeli zwrócą się do nas o to
            uprawnione organy państwowe. Administrator przechowuje dane osobowe
            Użytkowników przez okres nie dłuższy, niż jest to niezbędne do
            przygotowania spersonalizowanej oferty / przeprowadzenia procesu
            rekrutacji / odpowiedzi na inne zapytania oraz umożliwiający
            Administratorowi wykonanie ciążących na nim obowiązków. Przypominamy,
            że w każdym czasie Użytkownicy mogą usunąć dane.
          </p>

          <h2>Państwa prawa związane z przetwarzaniem danych osobowych</h2>
          <p>Przysługuje Państwu prawo do:</p>
          <ul>
            <li>dostępu do swoich danych osobowych,</li>
            <li>sprostowania danych osobowych,</li>
            <li>usunięcia danych osobowych,</li>
            <li>ograniczenia przetwarzania danych osobowych,</li>
            <li>przenoszenia danych osobowych,</li>
            <li>wniesienia sprzeciwu do przetwarzania danych osobowych,</li>
            <li>
              cofnięcia wcześniej wyrażonej zgody na przetwarzanie danych
              osobowych.
            </li>
          </ul>
          <p>
            Aby skorzystać ze swoich uprawnień, prosimy o kontakt na adres
            mailowy:{" "}
            <a href="mailto:platforma@cbh-polska.pl">platforma@cbh-polska.pl</a>
          </p>
          <p>
            Jeżeli, występują Państwo do nas z żądaniem związanym z wykonaniem
            wymienionych powyżej praw, odpowiadamy na to żądanie niezwłocznie, nie
            później jednak niż w ciągu miesiąca po jego otrzymaniu. Jeżeli jednak
            – z uwagi na skomplikowany charakter żądania lub liczbę żądań – nie
            będziemy mogli spełnić Państwa żądania w ciągu miesiąca, spełnimy je w
            ciągu kolejnych dwóch miesięcy informując uprzednio o przedłużeniu
            terminu.
          </p>

          <h2>Bezpieczeństwo Państwa danych</h2>
          <p>
            Jako Administrator Danych Osobowych danych osobowych dokładamy
            wszelkich starań, aby zapewnić bezpieczeństwo Państwa danych
            osobowych.
          </p>
          <p>Zobowiązujemy się do:</p>
          <ul>
            <li>
              zabezpieczenia danych przed ich udostępnieniem osobom
              nieupoważnionym, zabraniem przez osobę nieuprawnioną, zmianami,
              uszkodzeniem lub zniszczeniem,
            </li>
            <li>
              dopuszczenia do przetwarzania danych osobowych wyłącznie osób
              posiadających wydane przez nas upoważnienie,
            </li>
            <li>
              zapewnienia kontroli nad prawidłowością przetwarzania danych
              osobowych,
            </li>
            <li>
              prowadzenia ewidencji osób upoważnionych do przetwarzania danych
              osobowych, dochowania szczególnej staranności, aby osoby
              upoważnione do przetwarzania tych danych zachowały je w tajemnicy,
              również po zakończeniu realizacji Usługi,
            </li>
            <li>
              prowadzenia wymaganej przepisami prawa dokumentacji opisującej
              sposób przetwarzania powierzonych danych osobowych oraz środki
              techniczne i organizacyjne zapewniające ochronę przetwarzania tych
              danych,
            </li>
            <li>
              zapewnienia aby urządzenia i systemy informatyczne i
              telekomunikacyjne, służące do przetwarzania danych osobowych, były
              zgodne z wymogami prawa.
            </li>
          </ul>
        </LegalArticle>
      </Section>
    </>
  )
}
