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

          <h2>Pliki cookies</h2>
          <p>
            Wykorzystujemy pliki cookies w celu zapewnienia poprawnego działania
            serwisu, a w szczególności dostosowania zawartości serwisu do
            preferencji użytkownika oraz optymalizacji korzystania z serwisu. W
            szczególności pliki te pozwalają rozpoznać podstawowe parametry
            urządzenia użytkownika (takie jak: typ urządzenia, rozdzielczość
            ekranu, kraj, z którego dochodzi do wejścia) i dzięki temu
            odpowiednio wyświetlić stronę internetową dostosowaną do jego potrzeb.
          </p>
          <p>
            Wykorzystujemy także cookies w celu zbierania ogólnych i anonimowych
            danych statystycznych za pośrednictwem narzędzi analitycznych i
            marketingowych:
          </p>
          <ul>
            <li>
              Google Analytics (administrator cookies: Google Inc z siedzibą w
              USA),
            </li>
            <li>
              Google AdWords (administrator cookies: Google Ireland Limited z
              siedzibą w Irlandii),
            </li>
            <li>
              Facebook (administrator cookies: Facebook Ireland Ltd. z siedzibą w
              Irlandii),
            </li>
          </ul>
          <p>
            Mogą Państwo samodzielnie i w każdym czasie zmienić ustawienia
            dotyczące plików cookies, określając warunki ich przechowywania i
            uzyskiwania dostępu przez pliki cookies do urządzenia użytkownika.
            Zmiany ustawień można dokonać za pomocą ustawień przeglądarki
            internetowej. Ustawienia te mogą zostać zmienione w taki sposób, aby
            blokować automatyczną obsługę plików cookies bądź informować o
            każdorazowym zamieszczeniu cookies na Państwa urządzeniu. Szczegółowe
            informacje o możliwości i sposobach obsługi plików cookies dostępne
            są w ustawieniach przeglądarki internetowej.
          </p>
          <p>
            Mogą Państwo w każdej chwili usunąć pliki cookies, korzystając z
            dostępnych funkcji w przeglądarce internetowej, której Państwo
            używają.
          </p>
          <p>
            Ograniczenie stosowania plików cookies może wpłynąć na niektóre
            funkcjonalności dostępne na stronie internetowej.
          </p>
          <p>
            W celu wyświetlania Państwu spersonalizowanych reklam, dokonujemy
            profilowania na zasadach przedstawionych poniżej.
          </p>
          <p>
            Wykorzystujemy funkcję remarketingu Google AdWords, dzięki czemu
            wyświetlamy Państwu reklamy naszej firmy w sieci reklamowej Google na
            podstawie Państwa zachowania na stronie – odwiedzania konkretnych
            podstron. Google wykorzystuje pliki cookie do wyświetlania reklam na
            podstawie odwiedzin użytkowników w naszej witrynie. Mogą Państwo
            zrezygnować z wyświetlania personalizowanych reklam Google w
            ustawieniach reklam pod tym adresem:{" "}
            <a
              href="https://adssettings.google.pl/authenticated"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://adssettings.google.pl/authenticated
            </a>
            .
          </p>
          <p>
            Wykorzystujemy również remarketing na portalu Facebook.com, który na
            podstawie plików cookies zbieranych przez Facebooka na naszej stronie
            wyświetla reklamy osobom, które odwiedziły naszą stronę lub są
            podobne do takiej grupy osób. Facebook do celu tworzenia podobnych
            grup odbiorców analizuje informacje udostępnione przez użytkowników
            na portalu, dane z konta Facebook oraz aktywność w witrynach i
            aplikacjach poza Facebookiem.
          </p>
          <p>
            Wykorzystujemy reklamy Gmail Sponsored Promotions wyświetlanie w
            poczcie Gmail. Kierujemy je remarketingowo, do osób odwiedzających
            naszą stronę, a także na podstawie słów kluczowych, które system
            Google dopasowuje do zainteresowań użytkowników oraz na podstawie
            zainteresowań – do osób, które aktywnie poszukują informacji o
            produktach i usługach. Jeśli chcą Państwo zrezygnować z reklam w
            Gmailu personalizowanych na podstawie danych osobowych, prosimy to
            zrobić na stronie:{" "}
            <a
              href="https://adssettings.google.com/authenticated"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://adssettings.google.com/authenticated
            </a>
          </p>
          <p>
            We wszystkich wymienionych wyżej systemach reklamowych dopasowujemy
            również reklamy na podstawie kryteriów demograficznych i lokalizacji.
          </p>
          <p>
            W celach analitycznych wykorzystujemy również narzędzie Google
            Analytics, które za pośrednictwem plików cookies zbiera informacje o
            Państwa zachowaniu na naszej stronie. Mogą państwo usunąć swoje dane
            związane z plikami cookies z naszej bazy instalując dodatek do
            przeglądarki z tej strony:{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://tools.google.com/dlpage/gaoptout
            </a>
            . Dane o użytkownikach i zdarzeniach na naszej stronie przechowujemy
            na serwerach Google Analytics.
          </p>

          <h2>Przekazywanie danych osobowych</h2>
          <h3>Dostawcy usług</h3>
          <p>
            Przekazujemy Państwa dane osobowe dostawcom usług, z których
            korzystamy przy prowadzeniu serwisu. Dostawcy usług, którym
            przekazujemy Państwa dane osobowe, w zależności od sytuacji, są
            podmiotami przetwarzającymi albo administratorami. Wykaz dostawców, z
            których usług korzystamy:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Nazwa spółki</th>
                  <th>Świadczone usługi</th>
                  <th>Rola</th>
                  <th>Lokalizacja</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Facebook Ireland Limited</td>
                  <td>
                    Kampanie reklamowe (w tym remarketing) oraz mierzenie ich
                    skuteczności
                  </td>
                  <td>Administrator</td>
                  <td>Irlandia (Europejski Obszar Gospodarczy)</td>
                </tr>
                <tr>
                  <td>Google Inc. (Google Analytics)</td>
                  <td>Usługi analityczne – mierzenie ruchu na stronie</td>
                  <td>Administrator</td>
                  <td>USA (poza EOG)</td>
                </tr>
                <tr>
                  <td>Google Ireland Limited (Google AdWords)</td>
                  <td>
                    Kampanie reklamowe (w tym remarketing) oraz mierzenie ich
                    skuteczności
                  </td>
                  <td>Administrator</td>
                  <td>Irlandia (EOG)</td>
                </tr>
                <tr>
                  <td>CyberFolks sp. z o.o.</td>
                  <td>hosting i domena</td>
                  <td>Administrator</td>
                  <td>Polska (EOG)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Wykaz jest na bieżąco aktualizowany. Podmioty przetwarzające.
            Korzystamy z dostawców, którzy przetwarzają Państwa dane osobowe
            wyłącznie na nasze polecenie. Świadczą oni dla nas usługę hostingu,
            dostarczają nam systemy do marketingu online, do wysyłki wiadomości
            email, do obsługi systemu komentarzy na blogu oraz do analizy ruchu w
            serwisie. Administratorzy. Korzystamy z dostawców, którzy nie działają
            wyłącznie na nasze polecenie i sami ustalą cele i sposoby
            wykorzystania Państwa danych osobowych. Świadczą oni dla nas usługi
            kampanii reklamowych. Lokalizacja. Nasi dostawcy mają siedzibę głównie
            w Polsce i w innych krajach Europejskiego Obszaru Gospodarczego (EOG),
            np. w Irlandii. Niektórzy z nich mają siedzibę poza terytorium EOG. W
            związku z przekazaniem Państwa danych poza terytorium EOG zadbaliśmy,
            aby nasi dostawcy dawali gwarancje wysokiego stopnia ochrony danych
            osobowych. Gwarancje te wynikają w szczególności ze zobowiązania do
            stosowania standardowych klauzul umownych przyjętych przez Komisję
            (UE) lub uczestnictwa w programie „Tarcza Prywatności” UE-USA. Mają
            Państwo prawo żądać od nas przekazania kopii standardowych klauzul
            umownych kierując zapytanie w sposób wskazany w punkcie 1 Polityki
            Prywatności.
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
