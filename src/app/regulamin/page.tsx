import type { Metadata } from "next"

import { LegalArticle } from "@/components/legal-article"
import { PageBanner } from "@/components/layout/page-banner"
import { Section } from "@/components/ui/section"

export const metadata: Metadata = {
  title: "Regulamin — CBH Polska",
}

export default function TermsPage() {
  return (
    <>
      <PageBanner
        title="Regulamin"
        crumbs={[
          { href: "/", label: "Strona główna" },
          { label: "Regulamin" },
        ]}
      />
      <Section surface="background" className="lg:!pt-10">
        <LegalArticle>
          <p>
            Regulamin dla zamówień za pośrednictwem{" "}
            <a href="http://cbh-polska.pl">http://cbh-polska.pl</a>
          </p>
          <p>
            Poniżej przedstawiamy nasze Ogólne warunki handlowe, stanowiące
            podstawę wszystkich usług świadczonych na{" "}
            <a href="http://cbh-polska.pl">http://cbh-polska.pl</a>. Za pomocą{" "}
            <a href="http://cbh-polska.pl">http://cbh-polska.pl</a> oferujemy
            każdemu użytkownikowi indywidualny proces zakupów i korzystania z
            usług dopasowany do jego zainteresowań i potrzeb.
          </p>

          <h2>1. Zawarcie umowy i dostawa produktów</h2>
          <p>
            <strong>1.1</strong> Na stronie{" "}
            <a href="http://cbh-polska.pl">http://cbh-polska.pl</a> umowy
            zawieramy w języku polskim. W przypadku zamówień na produkty Fablab,
            Chenice, 6.zero stroną umowy jest firma
          </p>
          <address>
            Chenice System Polska, Ul. Meissnera 47, 60-408, Poznań
            <br />
            NIP: 7771134877
            <br />
            REGON: 631006741
          </address>
          <p>
            <strong>1.2</strong> Kliknięcie przycisku „potwierdź zamówienie”
            powoduje złożenie wiążącego zamówienia na produkty znajdujące się w
            koszyku. Złożenie zamówienia potwierdzamy drogą mailową bezpośrednio
            po wysłaniu przez Państwa zamówienia. Zawarcie wiążącej umowy następuje
            wraz z otrzymaniem przez Państwa potwierdzenia zamówienia. Prosimy
            zwrócić uwagę, że produkty zamówione przez Państwa wysłane zostaną po
            opłaceniu przez Państwa ich pełnej ceny (z zastrzeżeniem punktu 3.2
            poniżej) oraz kosztów dostawy, o ile nie są one pokrywane przez nas
            zgodnie z punktem 2.2 poniżej.
          </p>
          <p>
            <strong>1.3</strong> Wyrażacie Państwo zgodę na przelew wierzytelności
            sprzedawcy o zapłatę ceny na rzecz pomiotu trzeciego, w tym na rzecz
            Chenice System Polska.
          </p>
          <p>
            <strong>1.4</strong> Zamówienia realizujemy na terenie Polski. W
            przypadku podania terminu dostawy w dniach roboczych należy rozumieć
            pod tym pojęciem wszystkie dni od poniedziałku do piątku włącznie, z
            wyjątkiem dni ustawowo wolnych od pracy.
          </p>

          <h2>2. Ceny, koszty wysyłki i wysyłka ekspresowa</h2>
          <p>
            <strong>2.1</strong> Obowiązują ceny oferowane w chwili złożenia
            zamówienia. Oferowane ceny są cenami końcowymi, to znaczy, że
            zawierają także podatek VAT w aktualnie obowiązującej wysokości. Aż do
            chwili pełnej zapłaty ceny sprzedaży produkt pozostaje naszą
            własnością.
          </p>
          <p>
            <strong>2.2</strong> Koszty wysyłki, opłacamy my.
          </p>

          <h2>3. Płatności</h2>
          <p>
            <strong>3.1</strong> Zasadniczo oferujemy następujące rodzaje
            płatności: szybki przelew internetowy (Przelewy24.pl), karta kredytowa
            i Paypal. W przypadku każdego zamówienia zastrzegamy sobie prawo
            nieoferowania niektórych rodzajów płatności i oferowania innych.
            Prosimy pamiętać, że akceptujemy jedynie płatności dokonywane z kont
            bankowych prowadzonych w granicach Unii Europejskiej (UE). Wszelkie
            koszty transakcji finansowych ponoszą Państwo.
          </p>
          <p>
            <strong>3.2</strong> W przypadku zakupu przy użyciu karty kredytowej
            obciążenie konta karty kredytowej następuje dopiero wraz z wysłaniem
            przez nas zamówienia.
          </p>
          <p>
            <strong>3.3</strong> Wyrażają Państwo niniejszym zgodę na otrzymywanie
            informacji o uznaniach na rachunku wyłącznie w formie elektronicznej.
          </p>

          <h2>4. Kupony rabatowe i ich wykorzystywanie</h2>
          <p>
            <strong>4.1</strong> Kupony rabatowe to bony, które nie mogą zostać
            nabyte drogą kupna, lecz są wydawane jedynie w ramach kampanii
            reklamowych, i mają określony okres ważności.
          </p>
          <p>
            <strong>4.2</strong> Kupony rabatowe można wykorzystać tylko w
            określonym czasie i tylko w ramach jednego zamówienia. Z akcji
            promocyjnej mogą być wykluczone niektóre marki. Kuponów rabatowych nie
            można wykorzystywać do nabywania kart upominkowych. Prosimy pamiętać,
            że kupony rabatowe mogą być powiązane z minimalną wartością zakupu.
          </p>
          <p>
            <strong>4.3</strong> Wartość produktu musi być nie mniejsza niż kwota
            na kuponie rabatowym. Ewentualna różnica w przypadku wyższej wartości
            produktu może zostać wyrównana płatnością dokonaną na jeden z
            oferowanych sposobów. Kupon rabatowy nie może zostać wypłacony
            gotówką, nie jest także oprocentowany. Nie można otrzymać zwrotu
            kuponu rabatowego, kiedy produkt zostanie całkowicie lub częściowo
            zwrócony.
          </p>
          <p>
            <strong>4.4</strong> Kupony rabatowe mogą zostać wykorzystane jedynie
            przed zakończeniem procedury zamawiania. Wykorzystanie późniejsze nie
            jest możliwe. Kuponów rabatowych nie można przenieść na osoby trzecie.
            W braku innych uzgodnień nie można łączyć kilku kuponów rabatowych.
          </p>
          <p>
            <strong>4.5</strong> Jeśli podczas swoich zakupów skorzystają Państwo
            z kuponu rabatowego, to zastrzegamy sobie prawo do naliczenia
            pierwotnej ceny produktów, które Państwo zachowają, jeżeli – ze
            względu na odstąpienie przez Państwa od umowy – całkowita wartość
            zamówienia spadnie poniżej wartości kuponu rabatowego.
          </p>

          <h2>5. Karty upominkowe i ich wykorzystywanie</h2>
          <p>
            <strong>5.1</strong> Karty upominkowe to bony, które można nabyć drogą
            kupna. Można je wykorzystać wyłącznie do nabycia oferowanych przez nas
            produktów, jednak nie do nabycia dalszych kart upominkowych. Jeśli
            wartość karty upominkowej nie wystarczy do złożenia zamówienia, to
            różnicę można pokryć przy użyciu jednej z oferowanych metod płatności.
          </p>
          <p>
            <strong>5.2</strong> Karty upominkowe i kwoty naliczone na Państwa
            koncie mogą zostać wykorzystane tylko przed zakończeniem procedury
            zamawiania. Kwota karty upominkowej nie może być wypłacona w gotówce,
            nie są na nią także naliczane odsetki.
          </p>

          <h2>
            6. Ustawowe prawo do odstąpienia od umowy zakupu produktów Fablab,
            Chenice oraz 6.Zero
          </h2>
          <p>
            W przypadku nabycia produktów Fablab, Chenice oraz 6.Zero mają Państwo
            ustawowe prawo do odstąpienia od umowy: Przede wszystkim chcemy
            Państwa poinformować, że w przypadku odesłania produktów mogą Państwo
            użyć formularza zwrotu.
          </p>
          <h3>Pouczenie w kwestii prawa do odstąpienia od umowy</h3>
          <p>
            Mają Państwo prawo do odstąpienia od umowy w ciągu czternastu dni bez
            podania przyczyn. Termin na odstąpienie od umowy biegnie od dnia, w
            którym Państwo lub wskazana przez Państwa osoba trzecia niebędąca
            przewoźnikiem weszli/weszła w posiadanie produktu. W celu wykonania
            swojego prawa do odstąpienia od umowy muszą Państwo powiadomić o swojej
            decyzji w tej sprawie firmę Chenice System Polska, Ul. Meissnera 47,
            60-408, Poznań, tel:{" "}
            <a href="tel:+48601715751">601 715 751</a>,{" "}
            <a href="mailto:platforma@cbh-polska.pl">platforma@cbh-polska.pl</a> w
            drodze jednoznacznego oświadczenia woli (np. przy pomocy listu
            wysłanego pocztą lub e-maila). Mogą Państwo wypełnić i przesłać nam
            formularz odstąpienia od umowy albo sporządzić i przesłać jakiekolwiek
            inne oświadczenie woli, także elektronicznie, przy użyciu formularza
            kontaktowego znajdującego się na naszej stronie internetowej. Jeśli
            skorzystają Państwo z tej możliwości, prześlemy Państwu niezwłocznie
            (np. drogą mailową) potwierdzenie otrzymania Państwa oświadczenia. W
            celu wykonania prawa do odstąpienia od umowy wystarczy wysłać
            powiadomienie o skorzystaniu z tego prawa przed upływem terminu na
            odstąpienie od umowy.
          </p>
          <h3>Skutki odstąpienia od umowy</h3>
          <p>
            W przypadku odstąpienia przez Państwa od umowy mamy obowiązek
            niezwłocznie, jednak nie później niż w ciągu czternastu dniu od dnia
            otrzymania Państwa powiadomienia o odstąpieniu od umowy, zwrócić
            Państwu wszystkie otrzymane od Państwa płatności, włącznie z kosztami
            dostawy (z wyjątkiem kosztów dodatkowych, które ewentualnie wynikną w
            związku z wyborem przez Państwa innego sposobu dostawy niż najtańszy
            zwykły oferowany przez nas sposób dostawy). Do zwrotu płatności
            stosujemy ten sam środek płatności, którym posłużyli się Państwo
            podczas pierwotnej transakcji, chyba że jednoznacznie uzgodnimy z
            Państwem inny środek płatności. W żadnym wypadku nie naliczymy Państwu
            za to jakichkolwiek opłat. Możemy natomiast odmówić dokonania zwrotu
            płatności otrzymanej od Państwa do chwili otrzymania zwrotu produktu
            lub do chwili, gdy przedstawią Państwo dowód, że produkt został do nas
            wysłany, w zależności od tego, które z tych zdarzeń nastąpi wcześniej.
            Państwo z kolei mają obowiązek odesłać nam lub przekazać produkt
            niezwłocznie, jednak nie później niż czternaście dni od dnia, w którym
            poinformowali nas Państwo o odstąpieniu od umowy. Termin uważa się za
            dochowany, jeśli produkt zostanie wysłany przed upływem czternastu dni.
            Poniesiemy koszty przesyłki zwrotnej produktów w przypadku przesyłek z
            kraju, w którym doręczono Państwu te towary, jeśli wykorzystają Państwo
            udostępniony przez nas formularz zwrotu (oraz skorzystają z usług
            przewoźnika wskazanego w formularzu zwrotu lub w inny sposób w związku
            ze zwrotem). W przeciwnym razie koszty przesyłki zwrotnej ponoszą
            Państwo. Odpowiadają Państwo za zmniejszenie wartości rzeczy będące
            wynikiem korzystania z niej w sposób wykraczający poza konieczny do
            stwierdzenia charakteru, cech i funkcjonowania rzeczy.
          </p>

          <h2>7. Zwroty płatności</h2>
          <p>
            Wszelkie zwroty płatności wykonywane są automatycznie na konto używane
            przez Państwa do zapłaty. W przypadku zapłaty przelewem na konto
            płatności zostaną zwrócone na konto, z którego dokonano przelewu. W
            przypadku zapłaty przez PayPal lub przy pomocy karty kredytowej zwrot
            nastąpi na powiązane konto PayPal lub konto karty kredytowej. Jeśli w
            czasie zakupu skorzystali Państwo z karty upominkowej, to odpowiednia
            kwota zostanie zwrócona na Państwa saldo i będzie mogła zostać
            wykorzystana podczas kolejnych zakupów.
          </p>

          <h2>10. Ustawowa odpowiedzialność za wady produktów</h2>
          <p>
            <strong>10.1</strong> Zobowiązujemy się do dostarczenia Państwu
            produktów wolnych od wad.
          </p>
          <p>
            <strong>10.2</strong> W przypadku wszelkich wad produktów zamówionych
            za pośrednictwem{" "}
            <a href="http://cbh-polska.pl">http://cbh-polska.pl</a> ponosimy
            ustawową odpowiedzialność z tytułu rękojmi za wady, wynikającą z art.
            556 i następnych ustawy z dnia 23 kwietnia 1964 r. – Kodeks cywilny
            (Dz.U.2016.380 j.t. z późn. zm.).
          </p>

          <h2>11. Reklamacje</h2>
          <p>
            <strong>11.1</strong> Wszelkie reklamacje dotyczące produktów
            zakupionych w naszym sklepie należy składać poprzez formularz
            reklamacyjny. Zapytania związane z przebiegiem realizacji Państwa
            zamówienia należy składać drogą elektroniczną na adres{" "}
            <a href="mailto:platforma@cbh-polska.pl">platforma@cbh-polska.pl</a>.
          </p>
          <p>
            <strong>11.2</strong> W niektórych przypadkach możemy poprosić Państwa
            o przesłanie nam zdjęć produktów podlegających reklamacji.
          </p>
          <p>
            <strong>11.3</strong> Państwa reklamacja zostanie przez nas
            rozpatrzona w terminie 14 dni od daty otrzymania kompletnego
            zgłoszenia reklamacyjnego. O ewentualnych brakach w zgłoszeniu
            reklamacyjnym powiadomieni zostaną Państwo przez nas niezwłoczne. Wraz
            z takim zawiadomieniem przesłana zostanie Państwu informacja, w jaki
            sposób należy uzupełnić braki w zgłoszeniu reklamacyjnym.
          </p>
          <p>
            <strong>11.4</strong> Informujemy jednocześnie, iż przysługuje Państwu
            możliwość skorzystania z pozasądowych sposobów rozpatrywania
            reklamacji i dochodzenia roszczeń zgodnie z procedurą Internetowego
            Rozstrzygania Sporów opracowaną przez Komisję Europejską dostępną na
            stronie internetowej:{" "}
            <a
              href="https://webgate.ec.europa.eu/odr/main/?event=main.home.show"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://webgate.ec.europa.eu/odr/main/?event=main.home.show
            </a>
            .
          </p>
        </LegalArticle>
      </Section>
    </>
  )
}
