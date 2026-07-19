// AUTO-GENERATED z eksportu WooCommerce (wc-product-export). Nie edytuj ręcznie —
// regeneruj skryptem, jeśli zmieni się źródłowy CSV. Warianty (np. kolory/pojemności)
// są zwinięte do jednego produktu nadrzędnego.

export type ProductVariant = {
  /** UUID wariantu z bazy (do pobrania ceny przez RPC). Brak w statycznym fallbacku. */
  id?: string
  /** Wartość wariantu prezentowana użytkownikowi, np. "6.0 Ciemny Blond" albo "500 ml". */
  value: string
  /** Wariant niedostępny → ukryj / oznacz jako brak. */
  inStock: boolean
}

export type ProductCategory = {
  name: string
  slug: string
}

export type Product = {
  id: string
  slug: string
  name: string
  /** Kategoria główna (pierwsza przypisana) — używana w breadcrumbs. */
  category: string
  categorySlug: string
  /** Wszystkie kategorie produktu — produkt może należeć do kilku naraz. */
  categories: ProductCategory[]
  /** Marka producenta (pusty string gdy brak). */
  brand: string
  brandSlug: string
  shortDescription: string
  /** HTML z WooCommerce (opis pełny). */
  description: string
  image: string
  images: string[]
  inStock: boolean
  /** Nazwa atrybutu wariantu (np. "Kolor", "Pojemność"); pusty gdy brak wariantów. */
  variantAttribute: string
  variants: ProductVariant[]
  /** UUID syntetycznego wariantu „default" (produkt bez wariantów) — nośnik ceny. */
  priceVariantId?: string
}

export type Category = {
  name: string
  slug: string
  count: number
}

export type Brand = {
  name: string
  slug: string
  count: number
}

export const ALL_PRODUCTS: Product[] = [
  {
    "id": "1448",
    "slug": "porosity-equalizer-150ml",
    "name": "Porosity Equalizer 150ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Spray w formie fluidu wyrównujący porowatość włosów przed zabiegami technicznymi. Ujednolica strukturę włosa, poprawia wchłanianie preparatów i optymalizuje efekty koloryzacji oraz innych usług chemicznych.",
    "description": "POROSITY EQUALIZER to specjalistyczny fluid w sprayu przeznaczony do stosowania przed zabiegami technicznymi, takimi jak koloryzacja, rozjaśnianie, trwała ondulacja czy prostowanie. Jego zaawansowana, innowacyjna formuła zawiera składniki aktywne nowej generacji, które działają cementująco na strukturę włosa, wyrównując jego porowatość na całej długości. Produkt ujednolica strukturę włosa, dzięki czemu substancje chemiczne są absorbowane równomiernie, co przekłada się na lepszy, bardziej przewidywalny i trwały efekt końcowy zabiegu. Włókno włosa zostaje wzmocnione, zrewitalizowane i lepiej przygotowane do dalszych procesów technicznych. Formuła zawiera żel aloesowy o właściwościach zmiękczających i nawilżających, który pomaga utrzymać odpowiedni poziom wilgoci we włosach, oraz keratynę roślinną · wielobiałkowy kompleks pochodzenia roślinnego o zbalansowanym składzie. Keratyna roślinna wnika w strukturę włosa, tworząc ochronną sieć, która cementuje, wzmacnia i chroni różnice strukturalne trzonu włosa. Zastosowanie przed koloryzacją pozwala wyrównać strukturę włosów, ujednolicić absorpcję koloru i poprawić ostateczny efekt koloryzacji. Stosowany przed rozjaśnianiem, trwałą ondulacją lub prostowaniem, ujednolica strukturę włosa, wzmacnia włókno i zwiększa skuteczność oraz jakość zabiegu technicznego.",
    "image": "/produkty/Pair.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2024/10/Pair.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1455",
    "slug": "oxicreme",
    "name": "Oxicreme",
    "category": "Koloryzacja",
    "categorySlug": "koloryzacja",
    "categories": [
      {
        "name": "Koloryzacja",
        "slug": "koloryzacja"
      },
      {
        "name": "Produkty Techniczne",
        "slug": "produkty-techniczne"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Utleniacz do stosowania z Liposome Hair Color.",
    "description": "Utleniacz do stosowania z Liposome Hair Color. Jak stosować: Wymieszać jedną część farby z 1,5 części Oxicreme.",
    "image": "/produkty/ActiveLotion.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/10/ActiveLotion.png"
    ],
    "inStock": true,
    "variantAttribute": "Oxicreme %",
    "variants": [
      {
        "value": "20 VOL/ 6%",
        "inStock": true
      },
      {
        "value": "30 VOL / 9%",
        "inStock": true
      },
      {
        "value": "40 VOL / 12%",
        "inStock": true
      }
    ]
  },
  {
    "id": "1459",
    "slug": "gel-strong-200-ml",
    "name": "Gel Strong 200 ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Żel o mocnym utrwaleniu, który zapewnia kontrolę, objętość i strukturę bez obciążania włosów.",
    "description": "Moczno utrwalający żel stylizacyjny, stworzony by nadać włosom pełną kontrolę, zwiększoną objętość i wyrazistą teksturę. Działa bez obciążania · łatwo formuje fryzurę, szybko schnie i nie pozostawia osadów.",
    "image": "/produkty/IfixFixIt.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/10/IfixFixIt.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1461",
    "slug": "forming-glaze-ciekle-szklo-plynny-zel-150ml",
    "name": "Forming Glaze · ciekłe szkło · płynny żel 150ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Płynny żel stylizujący „efekt szkła”, nadający połysk i lekką teksturę.",
    "description": "Lekkie żelowe wykończenie, które modeluje fryzurę, dodaje połysku i podkreśla strukturę bez efektu sztywności. Idealny dla stylizacji wymagających naturalnego blasku i subtelnej kontroli.",
    "image": "/produkty/IfixFormingGlaze.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/10/IfixFormingGlaze.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1463",
    "slug": "forming-lac-strong-hold-lakier-formujacy-mocny-300ml",
    "name": "Forming Lac. Strong Hold · lakier formujący mocny 300ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Mocny lakier formujący fryzurę z trwałym utrwaleniem.",
    "description": "Profesjonalny lakier stylizacyjny o mocnym utrwaleniu, który zamyka fryzurę w pożądanym kształcie i zabezpiecza ją przed utratą formy. Doskonały do użycia jako finałowa stylizacja, zapewniając długotrwały efekt bez sztywnego uczucia.",
    "image": "/produkty/IfixForming.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/10/IfixForming.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1467",
    "slug": "volumizing-mousse-strong-hold-pianka-powiekszajaca-objetosc-mocna-300ml",
    "name": "Volumizing Mousse Strong Hold · pianka powiększająca objętość · mocna 300ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Pianka zwiększająca objętość włosów z mocnym utrwaleniem.",
    "description": "Silnie utrwalająca pianka stylizacyjna, zaprojektowana by dodać włosom objętości i utrzymać fryzurę przez dłuższy czas. Można stosować na włosy suche lub wilgotne · idealna dla osób chcących podkreślić formę fryzury i zapewnić jej długotrwały efekt.",
    "image": "/produkty/IfixVolumizing.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/10/IfixVolumizing.png",
      "https://cbh-polska.pl/wp-content/uploads/2025/10/IfixVolumizing.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1468",
    "slug": "power-shine-nablyszczajacy-lakier-do-wlosow-500-ml",
    "name": "Power Shine · nabłyszczający lakier do włosów 500 ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Lakier nabłyszczający z mocnym utrwaleniem, do wszystkich rodzajów włosów.",
    "description": "Profesjonalny lakier stylizacyjny z linii I-FIX, który modeluje i utrwala fryzurę, tworząc mikrofilm ochronny oraz efekt intensywnego blasku. Zalecany do wszystkich typów włosów, pozwala na formowanie w wybrany kształt z wykończeniem pełnym połysku.",
    "image": "/produkty/power-shine-500ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/10/IfixPowerShine.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1470",
    "slug": "aqua-wax-wodny-wosk-250ml",
    "name": "Aqua Wax - wodny wosk 250ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Wosk na bazie wody, który definiuje i nadaje połysk fryzurze.",
    "description": "Wodna formuła wosku stylizacyjnego zapewnia definicję fryzury oraz jasny połysk · idealna dla włosów, które potrzebują wyrazistego kształtu bez efektu obciążenia. Sprawdza się zarówno na włosach suchych, jak i wilgotnych.",
    "image": "/produkty/IfixAquaWax.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/10/IfixAquaWax.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1472",
    "slug": "ifix-shape-it-guma-modelujaca-100ml",
    "name": "iFix Shape It - guma modelująca 100ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Mocna guma modelująca do stylizacji detali i tekstur.",
    "description": "Stylizacyjna guma o mocnym chwytcie, przeznaczona do kreowania wyrazistych struktur, podkreślania detali i definiowania fryzury · idealna dla krótszych cięć lub miejscowych akcentów. Pozostawia włosy plastyczne i pod kontrolą.",
    "image": "/produkty/IfixShapeItgum.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/10/IfixShapeItgum.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1474",
    "slug": "polishing-serum-serum-wygladzajace-i-nawilzajace-150ml",
    "name": "Polishing Serum - serum wygładzające i nawilżające 150ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Wygładzające serum bez spłukiwania, które ujarzmia niesforne włosy i dodaje blasku.",
    "description": "Koncentrat serum stylizacyjno-pielęgnacyjny, stworzony do włosów średnich i grubych · wygładza puszące się i oporne kosmyki, skraca czas suszenia oraz nadaje jedwabisty połysk. Zawiera olej ze słodkich migdałów i olejek z pestek winogron, które działają zmiękczająco i przeciwutleniająco.",
    "image": "/produkty/IfixPolishing.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/10/IfixPolishing.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1477",
    "slug": "biological-wawing-system-pn-wlosy-zniszczone-lub-naturalne-100mlx2",
    "name": "Biological Wawing System PN - włosy zniszczone lub naturalne 100ml x2",
    "category": "Produkty Techniczne",
    "categorySlug": "produkty-techniczne",
    "categories": [
      {
        "name": "Produkty Techniczne",
        "slug": "produkty-techniczne"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Biologiczny system trwałej ondulacji bez amoniaku i kwasu tioglikolowego, wzmacnia włosy dzięki proteinom sojowym i aminokwasom kolagenu morskiego.",
    "description": "System przeznaczony do naturalnych i zniszczonych włosów · obejmuje emulsję ondulacyjną i neutralizator, które po nawinięciu na wałki pozwalają stworzyć trwałe fale lub loki. Formuła wzbogacona proteinami sojowymi oraz aminokwasami kolagenu morskiego działa odżywczo i poprawia elastyczność włosa, zapobiegając rozdwajaniu końcówek i utrzymując strukturę włosa nawet po zabiegu",
    "image": "/produkty/WavingSystem.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/10/WavingSystem.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1479",
    "slug": "regal-wash-shampoo",
    "name": "Regal Wash Shampoo",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Szampon Regal Wash został stworzony, by wspierać walkę z przerzedzaniem i osłabieniem włosów. Zawiera wodę termalną, keratynę, aminokwasy (m.in. argininę i prolinę) oraz kompleks witamin (np. niacynamid, pro-witamina B5), które oczyszczają skórę głowy, stymulują mikrokrążenie i wzmacniają strukturę włosa od cebulki.",
    "description": "Delikatny, a jednocześnie skuteczny szampon przeciw wypadaniu włosów, wspierający zdrową skórę głowy i mocniejsze korzenie.",
    "image": "/produkty/KerabondRegalWashShampoo.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/10/KerabondRegalWashShampoo.png"
    ],
    "inStock": true,
    "variantAttribute": "Pojemność",
    "variants": [
      {
        "value": "1L",
        "inStock": true
      },
      {
        "value": "250 ml",
        "inStock": true
      },
      {
        "value": "100 ml",
        "inStock": true
      }
    ]
  },
  {
    "id": "1483",
    "slug": "regal-life-ampulki-kuracja-12-x-6-ml",
    "name": "Regal Life · ampułki - kuracja 12 x 6 ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Ampułki Regal Life to intensywna kuracja, która wzmacnia włókno włosa, stymuluje skórę głowy i pomaga zapobiegać wypadaniu włosów.",
    "description": "Ampułki Regal Life zawierają liposomy, Bioprolinę oraz prowitaminy B5 i są przeznaczone do włosów cienkich, osłabionych i ze skłonnością do wypadania. Dzięki aktywnej formule, kuracja stymuluje mikrokrążenie skóry głowy, wzmacnia cebulki włosowe oraz poprawia tonus i strukturę włosa · dla widocznej poprawy gęstości i komfortu skóry głowy.",
    "image": "/produkty/KerabondRegalLife.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/10/KerabondRegalLife.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1487",
    "slug": "liposomowe-farby-do-wlosow-1-1-5-100ml",
    "name": "Liposomowe farby do włosów 1:1.5 100ml",
    "category": "Koloryzacja",
    "categorySlug": "koloryzacja",
    "categories": [
      {
        "name": "Koloryzacja",
        "slug": "koloryzacja"
      },
      {
        "name": "Produkty Techniczne",
        "slug": "produkty-techniczne"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Kompaktowa farba do włosów z wodą termalną w jakości HD.",
    "description": "Kompaktowa farba do włosów z wodą termalną w jakości HD. LHC Kolor HD to najbardziej innowacyjny produkt na rynku fryzjerskim. System aktywacji liposomowej oraz woda termalna i olej arganowy gwarantują najwyższą jakość i trwałość koloru. Takie połączenie składników przemienia zabieg koloryzacji w prawdziwy zabieg kosmetyczny, pozostawiając włosy lśniące i świetliste. Jest to nowa generacja koloru o niskiej zawartości amoniaku, przyjemnym zapachu i delikatnej konsystencji. Kremowo-żelowa formuła łatwa w przygotowaniu. Keratyna odbudowująca o niskiej masie cząsteczkowej ochrania strukturę włosów przed zniszczeniem. Synergia minerałów z ultra-czystymi pigmentami zapewnia doskonałe pokrycie siwych włosów i maksymalną trwałość koloru oraz ich blask. 75 odcieni (standardowe i straightlight) z możliwością stworzenia 792 kombinacji kolorystycznych. Liposomowy nośnik pigmentów i substancji odżywczych. Gwarancja całkowitego pokrycia siwych włosów. Farby nie wymagające stosowania produktów zakwaszających.",
    "image": "/produkty/LiposomeHairColor.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2021/07/LHC-astuccio-e-tubo-def-e1509388439323.png"
    ],
    "inStock": true,
    "variantAttribute": "Kolor",
    "variants": [
      {
        "value": "1 N · CZARNY",
        "inStock": true
      },
      {
        "value": "10 AG · ULTRA JASNY SREBRNY BLOND",
        "inStock": true
      },
      {
        "value": "10 BG · ULTRA JASNY BEŻOWY BLOND",
        "inStock": true
      },
      {
        "value": "10 BNE · ULTRA JASNY PERŁOWY BLOND",
        "inStock": true
      },
      {
        "value": "10 CN · ULTRA JASNY POPIELATY BLOND",
        "inStock": true
      },
      {
        "value": "10 N · ULTRA JASNY NATURALNY BLOND",
        "inStock": true
      },
      {
        "value": "10 PA · ULTRA JASNY PLATYNOWO SREBRNY BLOND",
        "inStock": true
      },
      {
        "value": "10 RR · BARDZO JASNY CZERWONY",
        "inStock": true
      },
      {
        "value": "10 RRI · BARDZO JASNY AMARANT",
        "inStock": true
      },
      {
        "value": "11 CC · HD EXTRA JASNA PLATYNA",
        "inStock": true
      },
      {
        "value": "2 N · CIEMNY BRĄZ",
        "inStock": true
      },
      {
        "value": "3 N · CIEMNY ORZECH",
        "inStock": true
      },
      {
        "value": "4 N · KASZTANOWY",
        "inStock": true
      },
      {
        "value": "5 N · JASNY KASZTANOWY",
        "inStock": true
      },
      {
        "value": "5 NN · JASNY KASZTANOWY STRONG",
        "inStock": true
      },
      {
        "value": "5C - JASNY KASZTANOWY POPIEL",
        "inStock": true
      },
      {
        "value": "6 N · CIEMNY BLOND",
        "inStock": true
      },
      {
        "value": "6 NN· CIEMNY BLOND STRONG",
        "inStock": true
      },
      {
        "value": "7 N · BLOND",
        "inStock": true
      },
      {
        "value": "7 NN · BLOND STRONG",
        "inStock": true
      },
      {
        "value": "8 N · JANSY BLOND",
        "inStock": true
      },
      {
        "value": "8 NN · JANSY BLOND STRONG",
        "inStock": true
      },
      {
        "value": "9 N · BARDZO JASNY BLOND",
        "inStock": true
      },
      {
        "value": "2 IR · IRYSOWO BRĄZOWY",
        "inStock": true
      },
      {
        "value": "2 K · COLA",
        "inStock": true
      },
      {
        "value": "3 K · KASZTANOWY BRĄZ",
        "inStock": true
      },
      {
        "value": "3 RM · INTENSYWNY MIEDZIANY BRĄZ",
        "inStock": true
      },
      {
        "value": "3.78 -CIEMNY BURSZTYNOWY KASZTAN",
        "inStock": true
      },
      {
        "value": "4 IR · KOASZTANOWO IRYSOWY",
        "inStock": true
      },
      {
        "value": "4 K · KASZTAN HAVANA",
        "inStock": true
      },
      {
        "value": "4 M · CIEMNY MAHOŃ",
        "inStock": true
      },
      {
        "value": "4 MD · KAKAO",
        "inStock": true
      },
      {
        "value": "4 RM · CIEMNY MIEDZIANY BRĄZ",
        "inStock": true
      },
      {
        "value": "4 RR · CZERWONO KASZTANOWY",
        "inStock": true
      },
      {
        "value": "5 CN · NATURALNY KASZT. LEKKI POPIEL",
        "inStock": true
      },
      {
        "value": "5 D · JASNY ZŁOTY KASZTAN",
        "inStock": true
      },
      {
        "value": "5 IR · JASNY KASZTANOWO IRYSOWY",
        "inStock": true
      },
      {
        "value": "5 K · JASNY KASZTAN HAVANA",
        "inStock": true
      },
      {
        "value": "5 M · MAHOŃ",
        "inStock": true
      },
      {
        "value": "5 MD · CZEKOLADA",
        "inStock": true
      },
      {
        "value": "5 MR · JASNY MAHOŃ MIEDZIANO KASZTANOWY",
        "inStock": true
      },
      {
        "value": "5 MRR -JASNO BEZOWY MAGENTA",
        "inStock": true
      },
      {
        "value": "5 RM · MIEDZIANY BRĄZ",
        "inStock": true
      },
      {
        "value": "5 RRE · INTENSYWNA KASZTANOWA LEKKA CZERWIEŃ",
        "inStock": true
      },
      {
        "value": "5 VI - INTENSYWNY FIOLETOWY JASNY BLOND",
        "inStock": true
      },
      {
        "value": "55.66 - JASNY WIŚNIOWY KASZTAN",
        "inStock": true
      },
      {
        "value": "6 CN · NATURALNY CIEMNY POPIEL",
        "inStock": true
      },
      {
        "value": "6 D · CIEMNY ZŁOTY KASZTAN",
        "inStock": true
      },
      {
        "value": "6 K · CIEMNY BLOND HAVANA",
        "inStock": true
      },
      {
        "value": "6 M · JASNY MAHOŃ",
        "inStock": true
      },
      {
        "value": "6 MD · CAPPUCINO",
        "inStock": true
      },
      {
        "value": "6 R · CIEMNY MIEDZIANY BLOND",
        "inStock": true
      },
      {
        "value": "6 RM · JASNY MIEDZIANY BRĄZ",
        "inStock": true
      },
      {
        "value": "6 RR · CIEMNY CZEROWNY BLOND",
        "inStock": true
      },
      {
        "value": "6C - CIEMNY POPIELATY BLOND",
        "inStock": true
      },
      {
        "value": "7 CN · NATURALNY POPIEL BLOND",
        "inStock": true
      },
      {
        "value": "7 D · ZŁOTY BLOND",
        "inStock": true
      },
      {
        "value": "7 K · BLOND HAVANA",
        "inStock": true
      },
      {
        "value": "7 MD · KARMEL",
        "inStock": true
      },
      {
        "value": "7 R · MIEDZIANY BLOND",
        "inStock": true
      },
      {
        "value": "7 S · PIASKOWY JASNY",
        "inStock": true
      },
      {
        "value": "7.32 - KARMELOWY BLAND",
        "inStock": true
      },
      {
        "value": "7C - POPIELATY BLOND",
        "inStock": true
      },
      {
        "value": "7CT - BLOND TEAK",
        "inStock": true
      },
      {
        "value": "7RR - CZERWONY BLOND",
        "inStock": true
      },
      {
        "value": "8 BCC · JASNY KONIAKOWY BLOND",
        "inStock": true
      },
      {
        "value": "8 BG · JASNY BEŻOWY BLOND",
        "inStock": true
      },
      {
        "value": "8 BP - JASNY PERŁOWY BLOND",
        "inStock": true
      },
      {
        "value": "8 CN · NATURALNY JASNY POPIEL BLOND",
        "inStock": true
      },
      {
        "value": "8 D · JASNY ZŁOTY BLOND",
        "inStock": true
      },
      {
        "value": "8 MD · ORZECH LASKOWY",
        "inStock": true
      },
      {
        "value": "8 R · JASNY MIEDZIANY BLOND",
        "inStock": true
      },
      {
        "value": "8 RI · JASNY GŁĘBOKI MIEDZIANY BLOND",
        "inStock": true
      },
      {
        "value": "01 · NIEBIESKO-CZARNY",
        "inStock": true
      },
      {
        "value": "8C - JASNY POPIELATY BLOND",
        "inStock": true
      },
      {
        "value": "8MATT - JASNY MATOWY BLOND",
        "inStock": true
      },
      {
        "value": "9 BCH · BARDZO JASNY SZAMPAŃSKI BLOND",
        "inStock": true
      },
      {
        "value": "9 BG · BARDZO JASNY BEŻOWY BLOND",
        "inStock": true
      },
      {
        "value": "9 BP - BARDZO JASNY PERŁOWY BLOND",
        "inStock": true
      },
      {
        "value": "9 D · BARDZO JASNY ZŁOTY BLOND",
        "inStock": true
      }
    ]
  },
  {
    "id": "1565",
    "slug": "botanical-farby-permanentne-bez-amoniaku-100-ml-1-1",
    "name": "Botanical - farby permanentne bez amoniaku 100 ml 1:1",
    "category": "Koloryzacja",
    "categorySlug": "koloryzacja",
    "categories": [
      {
        "name": "Koloryzacja",
        "slug": "koloryzacja"
      },
      {
        "name": "Produkty Techniczne",
        "slug": "produkty-techniczne"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Trwała farba bez amoniaku i P-fenylenodiaminy, która rozjaśnia włosy do 3 poziomów, gwarantując pełne pokrycie siwych oraz głęboki, żywy kolor.",
    "description": "Formuła Botanical Hair Color została stworzona z myślą o pielęgnacji · bez amoniaku i P-fenylenodiaminy, z bogactwem składników roślinnych takich jak olej kakaowca oraz ekstrakty z hamamelisu, babki, rumianku, brzozy, skrzypu, kasztanowca i dziurawca, które odżywiają, nawilżają i tonizują włosy. Farba zapewnia równomierne pokrycie siwych włosów, nie plami skóry i łatwo się spłukuje, a przy tym nadaje włosom elastyczność, blask i naturalną jasność",
    "image": "/produkty/BotanicalHairColor.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/10/BotanicalHairColor.png"
    ],
    "inStock": true,
    "variantAttribute": "Botanical Kolor",
    "variants": [
      {
        "value": "001 - POPIELATY",
        "inStock": true
      },
      {
        "value": "013 - BEŻOWY",
        "inStock": true
      },
      {
        "value": "1 - CZARNY",
        "inStock": true
      },
      {
        "value": "1.1 - NIEBIESKO CZARNY",
        "inStock": true
      },
      {
        "value": "103.1 - BLOND OWIES NEW",
        "inStock": true
      },
      {
        "value": "3 - CIEMNY BRĄZ",
        "inStock": true
      },
      {
        "value": "3.8 - CIEMNY KASZTAN",
        "inStock": true
      },
      {
        "value": "4 - BRĄZ",
        "inStock": true
      },
      {
        "value": "4.2 - BRĄZOWY FIOLET",
        "inStock": true
      },
      {
        "value": "4.3 - ZŁOTY BRĄZ",
        "inStock": true
      },
      {
        "value": "4.8 - KASZTANOWY BRĄZ",
        "inStock": true
      },
      {
        "value": "4.81 - CIEMNY GRONOWY NEW",
        "inStock": true
      },
      {
        "value": "5 - JASNY BRĄZ",
        "inStock": true
      },
      {
        "value": "5.1 - JASNY POPIELATY BRĄZ",
        "inStock": true
      },
      {
        "value": "5.3 - JASNY ZŁOTY BRĄZ",
        "inStock": true
      },
      {
        "value": "5.35 - JASNOMAHONIOWY ZŁOTY BRĄZ",
        "inStock": true
      },
      {
        "value": "5.5 - JASNY MAHONIOWY BRĄZ",
        "inStock": true
      },
      {
        "value": "5.6 - CZERWONY JASNY BRĄZ",
        "inStock": true
      },
      {
        "value": "5.8 - JASNY KASZTANOWY BRĄZ",
        "inStock": true
      },
      {
        "value": "5.81 - KASZTANOWY NEW",
        "inStock": true
      },
      {
        "value": "6 - CIEMNY BLOND",
        "inStock": true
      },
      {
        "value": "6.1 - CIEMNY POPIELATY BLOND",
        "inStock": true
      },
      {
        "value": "6.2 - CIEMNY FIOLETOWY BLOND",
        "inStock": true
      },
      {
        "value": "6.3 - CIEMNY ZŁOTY BLOND",
        "inStock": true
      },
      {
        "value": "6.35 - CIEMNOMAHONIOWY ZŁOTY BLOND",
        "inStock": true
      },
      {
        "value": "6.4 - CIEMNY MIEDZIANY BLOND",
        "inStock": true
      },
      {
        "value": "6.6 - CIEMNY MOCNO CZERWONY BLOND",
        "inStock": true
      },
      {
        "value": "6.8 - CIEMNY KASZTANOWY BLOND",
        "inStock": true
      },
      {
        "value": "7 - BLOND",
        "inStock": true
      },
      {
        "value": "7.1 - POPIELATY BLOND",
        "inStock": true
      },
      {
        "value": "7.3 - ZŁOTY BLOND",
        "inStock": true
      },
      {
        "value": "7.35 - MAHONIOWY ZŁOTY BLOND",
        "inStock": true
      },
      {
        "value": "7.8 - KASZTANOWY BLOND",
        "inStock": true
      },
      {
        "value": "8 - JASNY BLOND",
        "inStock": true
      },
      {
        "value": "8.1 - JASNY POPIELATY BLOND",
        "inStock": true
      },
      {
        "value": "8.43 - ORZECH LASKOWY NEW",
        "inStock": true
      },
      {
        "value": "8.56 - CZERWONY MAHONIOWY BRĄZ",
        "inStock": true
      },
      {
        "value": "8.8 - JASNY KASZTANOWY BLOND",
        "inStock": true
      },
      {
        "value": "9 - BARDZO JASNY BLOND",
        "inStock": true
      }
    ]
  },
  {
    "id": "1611",
    "slug": "active-lotion-balsam-katalizujacy-3-1l",
    "name": "Active Lotion · balsam katalizujący 3% 1L",
    "category": "Koloryzacja",
    "categorySlug": "koloryzacja",
    "categories": [
      {
        "name": "Koloryzacja",
        "slug": "koloryzacja"
      },
      {
        "name": "Produkty Techniczne",
        "slug": "produkty-techniczne"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Balsam katalizujący 3% Active Lotion to profesjonalny preparat wspomagający zabiegi chemiczne, który aktywuje i utrwala strukturę włosa, zapewniając długotrwały efekt i optymalną pielęgnację.",
    "description": "Active Lotion 3% działa jako katalizator w zabiegach fryzjerskich, wzmacniając włókno włosa dzięki starannie dobranym składnikom aktywnym i odpowiedniemu stężeniu. Kremowa formuła przygotowuje włosy do kolejnych etapów zabiegu, zapewniając równomierne działanie, poprawę wytrzymałości i trwałość efektu stylizacji. Idealny do zastosowania w profesjonalnych warunkach salonowych.",
    "image": "/produkty/ActiveLotion.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/ActiveLotion.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1624",
    "slug": "color-clean-chusteczki",
    "name": "Color Clean chusteczki",
    "category": "Koloryzacja",
    "categorySlug": "koloryzacja",
    "categories": [
      {
        "name": "Koloryzacja",
        "slug": "koloryzacja"
      },
      {
        "name": "Produkty Techniczne",
        "slug": "produkty-techniczne"
      }
    ],
    "brand": "Color Clean",
    "brandSlug": "color-clean",
    "shortDescription": "Chusteczki do zmywania zabrudzeń po koloryzacji",
    "description": "Kultowe chusteczki do zmywania zabrudzeń po koloryzacji  · teraz w nowej formule! Skuteczniejsze działanie, ochrona skóry dzięki aloesowi i witaminie B5 oraz przepiękny zapach.",
    "image": "/produkty/ColorClean.png",
    "images": [
      "/produkty/ColorClean.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1627",
    "slug": "bleach-powder-diamond-puder-szary-500g",
    "name": "Bleach Powder Diamond / puder szary / 500g",
    "category": "Koloryzacja",
    "categorySlug": "koloryzacja",
    "categories": [
      {
        "name": "Koloryzacja",
        "slug": "koloryzacja"
      },
      {
        "name": "Produkty Techniczne",
        "slug": "produkty-techniczne"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Profesjonalny proszek rozjaśniający „Diamond”, bezpyłowy i o wysokiej mocy działania, który rozjaśnia włosy nawet do 9 poziomów, jednocześnie neutralizując niepożądane żółte odcienie.",
    "description": "„Diamond Bleach Powder” to ultra-wysokiej jakości rozjaśniacz przeznaczony dla salonów fryzjerskich, oferujący aż do 8·9 poziomów podniesienia koloru i wolny od pyłu dla bezpieczniejszej pracy. Dzięki specjalnej formule z „Diamond Technology” lub składnikami kondycjonującymi, minimalizuje obciążenie struktury włosa, zapobiega nadmiernemu pęcznieniu i zapewnia czystą, jasną bazę pod koloryzację. Idealny dla technik typu balayage, pełnych głów czy kreatywnego rozjaśniania, kiedy wymagany jest maksymalny efekt.",
    "image": "/produkty/DarkDiamond.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/DarkDiamond.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1629",
    "slug": "bleach-powder-plus-puder-ziolowy-500g",
    "name": "Bleach Powder Plus / puder ziołowy / 500g",
    "category": "Koloryzacja",
    "categorySlug": "koloryzacja",
    "categories": [
      {
        "name": "Koloryzacja",
        "slug": "koloryzacja"
      },
      {
        "name": "Produkty Techniczne",
        "slug": "produkty-techniczne"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Profesjonalny proszek rozjaśniający „Dust Free”, który pozwala rozjaśnić włosy do 6 poziomów z jednoczesną neutralizacją żółtych tonów.",
    "description": "Bleach Powder Plus to innowacyjna formuła proszku rozjaśniającego o właściwościach „dust-free”, przeznaczona do użytku profesjonalnego. Dzięki fioletowym pigmentom neutralizuje typowe żółte odcienie powstające przy rozjaśnianiu, jednocześnie umożliwiając podniesienie koloru aż do 6 tonów.",
    "image": "/produkty/BleachPowder.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/BleachPowder.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1631",
    "slug": "kerabond-zestaw-podrozny",
    "name": "Kerabond · zestaw podróżny",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      },
      {
        "name": "Zestawy",
        "slug": "zestawy"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Zestaw podróżny Kerabond · szampon Hydro-Keratin 100 ml + maska Kerabonding 75 ml + olejek Multivitamin · intensywnie odbudowuje włosy po zabiegach chemicznych, przywracając im blask i siłę.",
    "description": "Zestaw Kerabond Travel Kit marki Chenice został stworzony z myślą o włosach zniszczonych, po koloryzacji lub zabiegach fryzjerskich · kolejno: szampon Hydro-Keratin oczyszcza i przygotowuje strukturę włosa, maska Kerabonding głęboko odbudowuje mostki keratynowe, a olejek Multivitamin wprasowuje się w końcówki, dostarczając skoncentrowaną dawkę witamin i minerałów. Efekt to wyraźnie mocniejsze, elastyczne i pełne blasku włosy · idealny do stosowania w podróży lub jako kuracja podtrzymująca w domu.",
    "image": "/produkty/KerabondHydroKeratinSet.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/KerabondHydroKeratinSet.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1633",
    "slug": "kerabond-hydrokeratin-shampoo",
    "name": "Kerabond Hydrokeratin Shampoo",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Delikatny szampon odbudowujący z keratyną i intensywnym nawilżeniem, idealny dla włosów suchych, zniszczonych lub po zabiegach chemicznych.",
    "description": "Hydro-Keratin Shampoo skutecznie oczyszcza, jednocześnie wnikając w strukturę włosa dzięki aktywowanej keratynie i składnikom nawilżającym. Przywraca włosom elastyczność, redukuje łamliwość i puszenie się, pozostawiając je miękkie, gładkie i łatwiejsze w układaniu.",
    "image": "/produkty/KerabondHydroKeratinShampoo.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/KerabondHydroKeratinShampoo.png"
    ],
    "inStock": true,
    "variantAttribute": "Pojemność",
    "variants": [
      {
        "value": "1L",
        "inStock": true
      },
      {
        "value": "250 ml",
        "inStock": true
      }
    ]
  },
  {
    "id": "1637",
    "slug": "kerabond-multi-vitamin-oil",
    "name": "Kerabond Multi-Vitamin Oil",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Olejek rekonstrukcyjny z linii Kerabond, zawierający kompleks multiwitamin i keratynę, który odbudowuje włosy, nadając im miękkość, sprężystość i wyjątkowy połysk.Multi-Vitamin Oil marki Chenice to zaawansowany olejek odbudowujący, opracowany z myślą o włosach zniszczonych zabiegami chemicznymi. Zawiera skoncentrowany kompleks witamin i minerałów oraz technologię liposomową, która dostarcza substancje aktywne w głąb struktury włosa · chroni przed starzeniem, redukuje łamliwość i rozdwajanie końcówek, a przy tym intensywnie nawilża i nabłyszcza.",
    "description": "Multi-Vitamin Oil marki Chenice to zaawansowany olejek odbudowujący, opracowany z myślą o włosach zniszczonych zabiegami chemicznymi. Zawiera skoncentrowany kompleks witamin i minerałów oraz technologię liposomową, która dostarcza substancje aktywne w głąb struktury włosa · chroni przed starzeniem, redukuje łamliwość i rozdwajanie końcówek, a przy tym intensywnie nawilża i nabłyszcza.",
    "image": "/produkty/KerabondHydroKeratinOil.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/KerabondHydroKeratinOil.png"
    ],
    "inStock": true,
    "variantAttribute": "Pojemność",
    "variants": [
      {
        "value": "150 ml",
        "inStock": true
      },
      {
        "value": "500 ml",
        "inStock": true
      }
    ]
  },
  {
    "id": "1641",
    "slug": "kerabond-maska",
    "name": "Kerabond maska",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Maska Kerabonding to intensywnie odbudowująca kuracja z keratyną i aminokwasami, przeznaczona dla włosów zniszczonych zabiegami chemicznymi · przywraca im miękkość, sprężystość i blask.",
    "description": "Maska Kerabonding została opracowana z myślą o głębokiej odbudowie struktury włosa · technologia Liposom® i aktywne aminokwasy wnikają w głąb włosa, wypełniając ubytki keratyny spowodowane rozjaśnianiem, farbowaniem lub innymi zabiegami chemicznymi. Dzięki temu włosy odzyskują równowagę pH, stają się elastyczne, mniej podatne na łamanie i uzyskują zdrowy wygląd z naturalnym połyskiem.",
    "image": "/produkty/KerabondHydroKeratinMask.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/KerabondHydroKeratinMask.png"
    ],
    "inStock": true,
    "variantAttribute": "Pojemność",
    "variants": [
      {
        "value": "200 ml",
        "inStock": true
      },
      {
        "value": "500 ml",
        "inStock": true
      }
    ]
  },
  {
    "id": "1648",
    "slug": "keep-in-color-moisturizing-wash-shampoo",
    "name": "Keep in Color Moisturizing Wash Shampoo",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Szampon po koloryzacji, który delikatnie oczyszcza, silnie nawilża oraz pomaga utrzymać kolor włosów świeży i pełen blasku.",
    "description": "Keep In Color Moisturizing Wash to profesjonalna formuła przeznaczona dla włosów po farbowaniu · zawiera składniki aktywne, które przenikają w strukturę włosa, działając zmiękczająco, nawilżająco i odżywczo, jednocześnie respektując naturalną hydro-lipidową warstwę skóry. Efekt: włosy są miękkie, elastyczne, lśniące, a kolor utrzymuje się dłużej, nie blaknie i wygląda profesjonalnie.",
    "image": "/produkty/KeepinColorShampoo.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/KeepinColorShampoo.png"
    ],
    "inStock": true,
    "variantAttribute": "Pojemność",
    "variants": [
      {
        "value": "1L",
        "inStock": true
      },
      {
        "value": "250 ml",
        "inStock": true
      }
    ]
  },
  {
    "id": "1652",
    "slug": "keep-in-color-moisturizing-mask",
    "name": "Keep in Color Moisturizing Mask",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Maska po koloryzacji, bogata w wodę termalną, przeznaczona dla włosów suchych i farbowanych · intensywnie nawilża, chroni kolor i nadaje włosom jedwabistą miękkość.",
    "description": "Keep in Color Moisturizing Mask została stworzona z myślą o włosach farbowanych, suchych lub odwodnionych. Jej formuła oparta na wodzie termalnej, polimerach ochronnych, aloesie i witaminie E pomaga utrzymać odpowiedni poziom nawilżenia, przedłużyć intensywność koloru oraz chronić przed promieniowaniem UVA/UVB i zanieczyszczeniami. Dodatkowo ułatwia rozczesywanie, nadaje blask i sprawia, że włosy stają się wyjątkowo miękkie i jedwabiste w dotyku.",
    "image": "/produkty/KeepinColorMask.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/KeepinColorMask.png"
    ],
    "inStock": true,
    "variantAttribute": "Pojemność",
    "variants": [
      {
        "value": "200 ml",
        "inStock": true
      }
    ]
  },
  {
    "id": "1656",
    "slug": "synergy-wash-szampon-antylojotokowy",
    "name": "Synergy Wash · szampon antyłojotokowy",
    "category": "Szampony",
    "categorySlug": "szampony",
    "categories": [
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Szampon Synergy Wash skutecznie reguluje nadmierne wydzielanie sebum i zwalcza łupież, jednocześnie łagodząc stany zapalne skóry głowy.",
    "description": "Synergy Wash to liposomowy szampon z formułą zawierającą m.in. Piroctone Olamine i Capryloyl Glycina, przeznaczony dla włosów tłustych i ze skłonnością do łupieżu. Dzięki zawartości ziołowych ekstraktów i naturalnej lecytyny działa antybakteryjnie, koi podrażnienia skóry głowy i zapobiega nawrotom łojotoku oraz łupieżu.",
    "image": "/produkty/KerabondSynergyWashShampoo.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/KerabondSynergyWashShampoo.png"
    ],
    "inStock": true,
    "variantAttribute": "Pojemność",
    "variants": [
      {
        "value": "1L",
        "inStock": true
      },
      {
        "value": "250 ml",
        "inStock": true
      }
    ]
  },
  {
    "id": "1663",
    "slug": "bottox-effect-4x50-ml",
    "name": "Bottox Effect 4x50 ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Kuracja Bottox Effect to intensywna regeneracja włosów każdego rodzaju · głębokie nawilżenie dzięki kwasowi hialuronowemu, odbudowa keratyną i kolagenem oraz natychmiastowy połysk i miękkość.",
    "description": "Bottox Effect to profesjonalna kuracja włosów, która dzięki zawartości kwasu hialuronowego potrafi utrzymać dużą ilość wody we włosach, zapewniając im głębokie nawilżenie. Dodatkowo kolagen i keratyna wspierają odbudowę włókna włosa, a olej pistacjowy działa jako naturalny anty‑aging, wzmacniając i chroniąc włosy przed zniszczeniem. Rezultatem są włosy gładkie, błyszczące i odżywione · idealne jako zamiennik zabiegów prostujących.",
    "image": "/produkty/BottoxSet.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/BottoxSet.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1665",
    "slug": "clarifying-shampoo-500ml",
    "name": "Clarifying Shampoo 500ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Szampon oczyszczający o pH 9 z keratyną i składnikami aktywnymi, przeznaczony jako przygotowanie do zabiegu · usuwa osady i otwiera łuski włosa dla lepszego wchłaniania kuracji.",
    "description": "Ten keratynowy szampon clarifying o wysokim pH (pH 9) skutecznie usuwa pozostałości po produktach stylizujących, nadmiar sebum i zanieczyszczenia, otwierając łuski włosa i tworząc optymalną bazę pod zabiegi regeneracyjne lub prostujące. Dzięki zawartości keratyny oraz składników wspierających przygotowuje włosy do dalszych etapów pielęgnacji, poprawiając przyczepność aktywnych substancji. Idealny jako pierwszy krok w profesjonalnej kuracji, zapewnia czystą, przygotowaną powierzchnię włosa gotową na działanie kolejnych produktów.",
    "image": "/produkty/CalrifyingShampoo.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/CalrifyingShampoo.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1667",
    "slug": "greencare-szampon-250ml",
    "name": "Greencare szampon 250ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Szampon GREENCARE 250 ml to profesjonalna kuracja przeciw łupieżowi i nadmiernej produkcji sebum · skutecznie oczyszcza skórę głowy i włosy, przywracając im uczucie świeżości.",
    "description": "Szampon GREENCARE działa wielotorowo: dzięki kompozycji aktywnych aminokwasów (m.in. cysteina, ornityna, biotyna, metionina) wspiera oczyszczanie i normalizację skóry głowy oraz zapobiega problemom takim jak łupież, przetłuszczanie się i osłabienie włosów. W efekcie włosy są lżejsze, mniej obciążone i wyglądają na zdrowsze · linia została specjalnie zaprojektowana, by wspierać skórę głowy wymagającą głębszego wsparcia.",
    "image": "/produkty/GreenLifeShampoo.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/GreenLifeShampoo.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1669",
    "slug": "greencare-fluid-100ml",
    "name": "Greencare fluid 100ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Fluid GREENCARE 100 ml to intensywna kuracja oczyszczająca skóry głowy, przeznaczona do włosów z problemami takimi jak przetłuszczanie i łupież.",
    "description": "Fluid GREENCARE działa detoksykująco i rewitalizująco · poprawia mikrokrążenie skóry głowy oraz wspiera jej czystość i zdrowy wygląd. Zawiera składniki aktywne, które pomagają zwalczać nadmierne wydzielanie sebum oraz problemy związane z łupieżem, oferując profesjonalną kurację skóry głowy.",
    "image": "/produkty/GreenLifeLotion.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/GreenLifeTreatment.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1671",
    "slug": "greencare-emulsja-100-ml",
    "name": "Greencare emulsja 100 ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Emulsja GREENCARE 100 ml to lekki balsam oczyszczający i tonizujący do skóry głowy, który nie wymaga spłukiwania, wspomagając codzienną pielęgnację i świeżość włosów.",
    "description": "GREENCARE Emulsja 100 ml to innowacyjny produkt łączący działanie oczyszczające i tonizujące · wzmacnia skórę głowy, reguluje wydzielanie sebum i łagodzi podrażnienia. Formuła bez spłukiwania ułatwia codzienną pielęgnację, pozostawiając włosy lekkie, świeże i gotowe do stylizacji, jednocześnie poprawiając komfort skóry głowy.",
    "image": "/produkty/GreenLifeTreatment.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/GreenLifeTreatment.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1676",
    "slug": "urbn-puryfing-shampoo",
    "name": "Urbn Puryfing Shampoo",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Szampon URBN Purifying 1000 ml to profesjonalna kąpiel oczyszczająca, która usuwa zanieczyszczenia środowiskowe i nadmiar sebum, pozostawiając włosy lekkie i świeże.",
    "description": "Formuła URBN Purifying Shampoo zawiera likopen HYDROPOM pozyskiwany ze skórek pomidorów, który działa detoksykująco i chroni włosy oraz skórę głowy przed szkodliwym wpływem środowiska. Szampon skutecznie usuwa nadmiar sebum, osady i resztki produktów, odblokowując pory skóry głowy i przywracając uczucie odświeżenia oraz czystości.",
    "image": "/produkty/UrbanShampoo.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/UrbanShampoo.png"
    ],
    "inStock": true,
    "variantAttribute": "Pojemność",
    "variants": [
      {
        "value": "1L",
        "inStock": true
      },
      {
        "value": "250 ml",
        "inStock": true
      }
    ]
  },
  {
    "id": "1681",
    "slug": "urbn-nourishing-maska",
    "name": "Urbn Nourishing maska",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Maska URBN Nourishing to intensywna kuracja na bazie składników przeciw‑zanieczyszczeniowych (m.in. likopen ze skórek pomidorów), która odżywia włosy, przywraca im siłę i blask.",
    "description": "Formuła URBN Nourishing Mask zawiera likopen o działaniu detoksykującym oraz filtr UV, a także proteiny pszenicy i ryżu, które regenerują i wzmacniają włosy narażone na zanieczyszczenia środowiska. Chenice +1 Dzięki temu włosy stają się gładkie, bardziej podatne na rozczesywanie i odzyskują zdrowy połysk · idealna jako ostatni krok po oczyszczającym szamponie z tej samej linii.",
    "image": "/produkty/UrbanMask.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/UrbanMask.png"
    ],
    "inStock": true,
    "variantAttribute": "Pojemność",
    "variants": [
      {
        "value": "1L",
        "inStock": true
      },
      {
        "value": "200 ml",
        "inStock": true
      }
    ]
  },
  {
    "id": "1683",
    "slug": "urbn-whytwelve-150-ml",
    "name": "Urbn Whytwelve 150 ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Wielofunkcyjny spray leave‑in WHYTWELVE 150 ml to lekkie wykończenie pielęgnacyjne z działaniem detoksykującym, który kondycjonuje, nabłyszcza i chroni włosy przed zanieczyszczeniami.",
    "description": "Spray WHYTWELVE zawiera likopen o działaniu przeciwzanieczyszczeniowym oraz olej arganowy i białka ryżu, pszenicy i jedwabiu, które wspierają odbudowę i nadają elastyczność włóknu włosa. Formuła „12 efektów w 1 produkcie” obejmuje m.in. kondycjonowanie, nabłyszczanie, ochronę koloru, termoochronę i zapobieganie rozdwajaniu się końcówek · może być stosowana zarówno na mokre, jak i suche włosy.",
    "image": "/produkty/UrbanWhyTwelve.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/UrbanWhyTwelve.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "1685",
    "slug": "urbn-nourishing-mousse-200-ml",
    "name": "Urbn Nourishing Mousse 200 ml",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Odżywcza pianka do stylizacji, która nawilża, wygładza i nadaje włosom lekkość oraz naturalny blask bez obciążania.",
    "description": "URBN NOURISHING MOUSSE to lekka, odżywcza pianka przeznaczona do codziennej stylizacji i pielęgnacji włosów. Jej formuła pomaga nawilżyć i wygładzić pasma, poprawiając ich elastyczność oraz ułatwiając modelowanie. Pianka nadaje włosom miękkość, sprężystość i naturalny połysk, jednocześnie zachowując ich lekkość i objętość. Idealnie sprawdzi się zarówno do włosów prostych, jak i falowanych, pomagając kontrolować puszenie i podkreślić naturalną strukturę fryzury. Produkt nie skleja włosów i nie pozostawia osadu, dzięki czemu fryzura wygląda świeżo i naturalnie przez cały dzień. Sposób użycia Nałożyć niewielką ilość pianki na wilgotne, osuszone ręcznikiem włosy. Rozprowadzić równomiernie, a następnie przystąpić do stylizacji lub suszenia według potrzeb.",
    "image": "/produkty/UrbanMousse.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/11/UrbanMousse-2.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2115",
    "slug": "zel-koloryzujacy-semipermanentny",
    "name": "Żel koloryzujący semipermanentny",
    "category": "Koloryzacja",
    "categorySlug": "koloryzacja",
    "categories": [
      {
        "name": "Koloryzacja",
        "slug": "koloryzacja"
      },
      {
        "name": "Produkty Techniczne",
        "slug": "produkty-techniczne"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Pół‑trwała koloryzacja włosów o intensywnych odcieniach",
    "description": "Chenice Vitamin Colors to pół‑trwałe koloryzacje włosów w intensywnych, kreatywnych odcieniach, idealne dla osób, które chcą dodać włosom wyrazistego stylu i modowego charakteru. Paleta obejmuje Niebieski, Różowy, Fioletowy, Szary, Jasnoczerwony i Fuksja · kolory, które możesz mieszać ze sobą, by stworzyć unikalne efekty. Formuła farb Vitamin Colors nie zawiera amoniaku i nie wymaga dodawania oksydantu, dzięki czemu aplikacja jest szybka i wygodna. Produkt najlepiej sprawdza się na jasnych lub rozjaśnionych włosach, gdzie intensywność pigmentów jest najbardziej widoczna. Kolory utrzymują się przez kilka myć, stopniowo się wypłukując, co daje efekt miękkiej transformacji i kreatywnego miksu barw bez długotrwałego zobowiązania.",
    "image": "/produkty/VitaminColors.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/12/VitaminColors.png"
    ],
    "inStock": true,
    "variantAttribute": "Kolor",
    "variants": [
      {
        "value": "Niebieski",
        "inStock": true
      },
      {
        "value": "Fuksja",
        "inStock": true
      },
      {
        "value": "Jasnoczerwony",
        "inStock": true
      },
      {
        "value": "Fioletowy",
        "inStock": true
      },
      {
        "value": "Szary",
        "inStock": true
      },
      {
        "value": "Różowy",
        "inStock": true
      }
    ]
  },
  {
    "id": "2132",
    "slug": "karta-kolorow",
    "name": "Karta kolorów",
    "category": "Akcesoria fryzjerskie",
    "categorySlug": "akcesoria-fryzjerskie",
    "categories": [
      {
        "name": "Akcesoria fryzjerskie",
        "slug": "akcesoria-fryzjerskie"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Profesjonalna karta kolorów Chenice umożliwia precyzyjny dobór odcienia farby do włosów. Niezastąpione narzędzie w pracy stylisty oraz przy świadomym wyborze koloru przez klienta.",
    "description": "Karta kolorów Chenice to praktyczne i profesjonalne narzędzie, które ułatwia dokładny dobór odcienia farby do włosów. Zawiera pełną paletę kolorów dostępnych w ofercie Chenice, umożliwiając realistyczną ocenę tonu, głębi i intensywności pigmentu przed koloryzacją. Dzięki fizycznym próbom kolorów karta pozwala: precyzyjnie dobrać odcień do typu urody i oczekiwań klienta, porównać kolory bazowe, refleksy oraz odcienie specjalne, uniknąć nieporozumień przy wyborze koloru farby, usprawnić pracę w salonie fryzjerskim oraz sprzedaż detaliczną. Karta kolorów Chenice sprawdzi się zarówno w profesjonalnych salonach fryzjerskich, jak i przy sprzedaży farb klientom indywidualnym, którzy chcą świadomie wybrać odpowiedni odcień. To niezbędne wsparcie w planowaniu koloryzacji i prezentacji oferty kolorystycznej marki Chenice.",
    "image": "/produkty/LiposomeHairColorCart.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/12/Cartella-Liposome_copertina-1024x1024-1.png",
      "https://cbh-polska.pl/wp-content/uploads/2025/12/Cartella-Liposome_interna4-1024x284-1.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2137",
    "slug": "karta-kolorow-botanical",
    "name": "Karta kolorów Botanical",
    "category": "Akcesoria fryzjerskie",
    "categorySlug": "akcesoria-fryzjerskie",
    "categories": [
      {
        "name": "Akcesoria fryzjerskie",
        "slug": "akcesoria-fryzjerskie"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Profesjonalna karta kolorów Botanical umożliwia precyzyjny dobór odcieni farb i produktów koloryzujących z linii Botanical. Idealna do pracy w salonie oraz świadomego wyboru koloru.",
    "description": "Karta kolorów Botanical to praktyczne narzędzie stworzone z myślą o profesjonalnych fryzjerach oraz klientach, którzy oczekują precyzyjnego i świadomego doboru koloru. Zawiera pełną paletę odcieni dostępnych w linii Botanical, inspirowanej naturalnymi tonami i roślinną koloryzacją. Fizyczne próbki kolorów pozwalają realnie ocenić: odcień, głębię i intensywność koloru, naturalność tonów oraz refleksy, dopasowanie koloru do typu włosów i oczekiwanego efektu. Karta kolorów Botanical ułatwia planowanie koloryzacji, minimalizuje ryzyko nietrafionego wyboru koloru oraz usprawnia komunikację z klientem. Doskonale sprawdzi się w profesjonalnych salonach fryzjerskich oraz punktach sprzedaży oferujących produkty koloryzujące Botanical.",
    "image": "https://cbh-polska.pl/wp-content/uploads/2025/12/Botanical-Hair-Color-Cart.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/12/Botanical-Hair-Color-Cart.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2139",
    "slug": "anti-age-complex-c18",
    "name": "Anti-Age Complex C18",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "ANTI-AGE COMPLEX C18 to lekka, płynna emulsja o działaniu przeciwstarzeniowym i regenerującym. Nadaje włosom jedwabistą miękkość, objętość i naturalny blask, bez ich obciążania.",
    "description": "ANTI-AGE COMPLEX C18 to miękka i lekka emulsja o płynnej konsystencji, która łatwo się rozprowadza i szybko wchłania. Została stworzona z myślą o pielęgnacji włosów wymagających regeneracji i ochrony przed oznakami starzenia. Formuła produktu działa przeciwstarzeniowo i odbudowująco, poprawiając kondycję włosów na całej długości. Włosy stają się wyraźnie gładsze, bardziej sprężyste i pełne objętości, a ich powierzchnia nabiera zdrowego połysku i jedwabistego wykończenia. Emulsja nie wymaga spłukiwania, dzięki czemu idealnie sprawdza się jako etap pielęgnacji przed stylizacją. Nie obciąża włosów, ułatwia ich rozczesywanie i przygotowuje do suszenia lub modelowania. Sposób użycia Po umyciu włosów szamponem nałóż niewielką ilość produktu na wilgotne, osuszone ręcznikiem włosy. Rozprowadź równomiernie pasmo po paśmie, od końcówek w kierunku nasady i odwrotnie. Pozostaw na 4·5 minut, aby ułatwić wchłanianie. Nie spłukuj. Następnie wysusz włosy wybraną techniką.",
    "image": "/produkty/AntiAge.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/12/AntiAge.png"
    ],
    "inStock": true,
    "variantAttribute": "Pojemność",
    "variants": [
      {
        "value": "100 ml",
        "inStock": true
      },
      {
        "value": "50 ml",
        "inStock": true
      }
    ]
  },
  {
    "id": "2147",
    "slug": "greencare-zestaw-fluid-szampon-emulsja-100-ml",
    "name": "Greencare zestaw · fluid, szampon, emulsja 100 ml",
    "category": "Zestawy",
    "categorySlug": "zestawy",
    "categories": [
      {
        "name": "Zestawy",
        "slug": "zestawy"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "GREENCARE Zestaw to profesjonalny system pielęgnacyjny składający się z fluidu, szamponu i emulsji, stworzony z myślą o regeneracji, ochronie i przywróceniu równowagi włosom oraz skórze głowy. Idealny po zabiegach technicznych i do intensywnej pielęgnacji.",
    "description": "GREENCARE Zestaw to kompleksowy, profesjonalny program pielęgnacyjny, który działa synergicznie na włosy i skórę głowy. Zestaw składa się z trzech produktów: fluidu, szamponu oraz emulsji, które wspólnie zapewniają oczyszczenie, regenerację oraz ochronę włókna włosa. Formuły produktów z linii GREENCARE bazują na starannie dobranych składnikach aktywnych, które wspierają naturalną równowagę włosów i skóry głowy. Szampon delikatnie oczyszcza, usuwając zanieczyszczenia i pozostałości po zabiegach chemicznych, jednocześnie przygotowując włosy do dalszej pielęgnacji. Fluid działa ochronnie i regenerująco, wzmacnia strukturę włosa oraz poprawia jego kondycję. Emulsja intensywnie pielęgnuje, nawilża i wygładza włókno włosa, przywracając mu miękkość, elastyczność i naturalny blask. GREENCARE Zestaw polecany jest szczególnie do włosów osłabionych, uwrażliwionych, po koloryzacji, rozjaśnianiu lub innych zabiegach technicznych. Regularne stosowanie pomaga poprawić wygląd włosów, ułatwia rozczesywanie oraz chroni przed dalszymi uszkodzeniami, pozostawiając włosy zdrowe, lekkie i pełne życia.",
    "image": "/produkty/GreenLifeSet.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/12/GreenLifeSet.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2149",
    "slug": "peach-shampoo-szampon-oczyszczajacy-10l",
    "name": "Peach Shampoo - szampon oczyszczający 10L",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Brzoskwiniowy szampon oczyszczający Chenice delikatnie, a jednocześnie skutecznie usuwa zanieczyszczenia i pozostałości po zabiegach stylizacyjnych. Odświeża włosy i skórę głowy, pozostawiając je lekkie, czyste i pełne blasku.",
    "description": "PEACH SHAMPOO Chenice to profesjonalny szampon oczyszczający, stworzony do dokładnego, ale łagodnego mycia włosów i skóry głowy. Jego formuła skutecznie usuwa nadmiar sebum, zanieczyszczenia środowiskowe oraz pozostałości kosmetyków do stylizacji, nie naruszając naturalnej równowagi włosów. Szampon przygotowuje włosy do dalszych zabiegów pielęgnacyjnych i technicznych, poprawiając wchłanianie składników aktywnych stosowanych w kolejnych etapach. Lekka, brzoskwiniowa formuła odświeża włosy, nadaje im miękkość i naturalny połysk, nie obciążając ich. PEACH SHAMPOO polecany jest do każdego rodzaju włosów, szczególnie przed zabiegami regeneracyjnymi, koloryzacją lub intensywną pielęgnacją. Regularne stosowanie pomaga zachować świeżość, lekkość i zdrowy wygląd włosów oraz skóry głowy.",
    "image": "/produkty/Peach10L.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/12/Peach10L.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2151",
    "slug": "kerabond-summer-shampoo-250-ml",
    "name": "Kerabond Summer Shampoo 250 ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Szampon ochronny do włosów narażonych na słońce, sól morską i chlor. Delikatnie oczyszcza, nawilża i pomaga zachować miękkość oraz blask włosów w okresie letnim.",
    "description": "KERABOND SUMMER SHAMPOO Chenice to łagodny szampon przeznaczony do pielęgnacji włosów podczas ekspozycji na słońce, wodę morską i basenową. Skutecznie usuwa zanieczyszczenia, sól i chlor, jednocześnie dbając o odpowiedni poziom nawilżenia włókna włosa. Formuła pomaga chronić strukturę włosów przed przesuszeniem, utratą elastyczności i matowieniem. Włosy po umyciu stają się miękkie, łatwe do rozczesania i pełne naturalnego blasku. Szampon polecany do codziennego stosowania latem, dla każdego rodzaju włosów, również farbowanych.",
    "image": "/produkty/HAIR-BODY-SHAMPOO-1.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/12/HAIR-BODY-SHAMPOO-1.png",
      "https://cbh-polska.pl/wp-content/uploads/2025/12/Espositore-Kerond-Summer-1024x831-1.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2157",
    "slug": "kerabond-summer-mask-200-ml",
    "name": "Kerabond Summer Mask 200 ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Maska regenerująca do włosów osłabionych przez słońce, sól i chlor. Intensywnie odżywia, nawilża i przywraca włosom miękkość oraz elastyczność.",
    "description": "KERABOND SUMMER MASK Chenice to intensywna maska pielęgnacyjna, stworzona z myślą o włosach narażonych na letnie czynniki zewnętrzne. Pomaga regenerować włókno włosa, uzupełniając utracone nawilżenie i poprawiając jego kondycję. Regularne stosowanie maski sprawia, że włosy stają się bardziej elastyczne, gładkie i odporne na łamliwość. Produkt ułatwia rozczesywanie, wygładza powierzchnię włosa i pomaga przywrócić zdrowy wygląd po ekspozycji na słońce, wiatr oraz wodę morską lub basenową.",
    "image": "/produkty/HYDRATING-MASK-1.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/12/HYDRATING-MASK-1.png",
      "https://cbh-polska.pl/wp-content/uploads/2025/12/Espositore-Kerond-Summer-1024x831-1.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2158",
    "slug": "kerabond-summer-spray-150-ml",
    "name": "Kerabond Summer Spray 150 ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Ochronny spray bez spłukiwania do włosów wystawionych na działanie słońca. Chroni, nawilża i zapobiega przesuszeniu oraz puszeniu się włosów.",
    "description": "KERABOND SUMMER SPRAY Chenice to lekki spray bez spłukiwania, przeznaczony do ochrony włosów w trakcie ekspozycji na słońce. Tworzy na włosach warstwę ochronną, która pomaga ograniczyć negatywne działanie promieni UV, soli morskiej i chloru. Produkt nawilża włosy, zapobiega ich przesuszeniu oraz ułatwia stylizację. Może być stosowany na suche lub wilgotne włosy, zarówno na plaży, jak i w codziennej pielęgnacji. Włosy pozostają miękkie, lekkie i bardziej odporne na uszkodzenia.",
    "image": "/produkty/PROTECTIVE-SPRAY-1.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/12/PROTECTIVE-SPRAY-1.png",
      "https://cbh-polska.pl/wp-content/uploads/2025/12/Espositore-Kerond-Summer-1024x831-1.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2159",
    "slug": "kerabond-summer-shiny-body-krem-150ml",
    "name": "Kerabond Summer Shiny Body krem 150ml",
    "category": "Inne",
    "categorySlug": "inne",
    "categories": [
      {
        "name": "Inne",
        "slug": "inne"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Emolientowy krem do ciała z drobinkami rozświetlającymi. Pozostawia skórę jedwabiście gładką, nawilżoną i subtelnie rozświetloną, podkreślając opaleniznę.",
    "description": "SHINY BODY CREAM to lekka, emolientowa emulsja do pielęgnacji ciała, wzbogacona drobinkami rozświetlającymi. Krem nadaje skórze jedwabistą miękkość oraz naturalny blask, pomagając podkreślić i uwydatnić opaleniznę. Formuła łatwo się rozprowadza i szybko wchłania, nie pozostawiając uczucia lepkości. Regularne stosowanie sprawia, że skóra wygląda na gładką, zadbaną i promienną. Produkt idealnie sprawdzi się do codziennej pielęgnacji, szczególnie po kąpieli lub prysznicu. Sposób użycia Nałożyć na całe ciało i delikatnie wmasować do całkowitego wchłonięcia. Idealny do stosowania po prysznicu.",
    "image": "/produkty/Shiny-body-cream-1.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2025/12/Shiny-body-cream-1.png",
      "https://cbh-polska.pl/wp-content/uploads/2025/12/Espositore-Kerond-Summer-1024x831-1.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2416",
    "slug": "he-she-spray-direct-400ml",
    "name": "He.She Spray Direct 400ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Precyzyjny spray kierunkowy o silnym utrwaleniu.",
    "description": "Spray kierunkowy bez gazu idealny do fryzur strukturalnych. Pozwala na precyzyjne kształtowanie włosów według własnych upodobań, nadając im definicję i kształt przy zachowaniu elastyczności.",
    "image": "/produkty/6zero/spray-direzionale-400-ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/spray-direzionale-400-ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2417",
    "slug": "he-she-spray-gloss-300ml",
    "name": "He.She Spray Gloss 300ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Spray nabłyszczający z efektem anti-frizz.",
    "description": "Unikalna formuła przeciw puszeniu chroni włosy przed wilgocią i nadaje ekstra błyszczące wykończenie. Włosy stają się miękkie, niezwykle lśniące i chronione przed elektryzowaniem.",
    "image": "/produkty/6zero/262465_sei_punto_zero_heshe_spray_gloss_shining_300ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262465_sei_punto_zero_heshe_spray_gloss_shining_300ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2418",
    "slug": "anti-orange-500-ml",
    "name": "Anti Orange 500 ml",
    "category": "Szampony",
    "categorySlug": "szampony",
    "categories": [
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon anty-pomarańczowy",
    "description": "Szampon Take Over Out Orange został stworzony, aby zredukować pomarańczowe tony, które mogą pojawić się na ciemnych włosach. Łączy delikatne oczyszczanie z intensywnym działaniem nawilżającym, neutralizując ciepłe miedziane i rude odcienie. Włosy są bardziej promienne, a ciemne tony głębsze. Ten szampon anty-pomarańczowy został specjalnie zaprojektowany, aby chronić piękno naturalnych lub farbowanych włosów.",
    "image": "/produkty/6zero/262670_sei_punto_zero_take_over_out_orange_shampoo_500ml-1.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262670_sei_punto_zero_take_over_out_orange_shampoo_500ml-1.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2419",
    "slug": "he-she-therm-screen-200ml",
    "name": "He.She Therm Screen 200ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      },
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Termoochronny spray wygładzający.",
    "description": "Chroni włosy przed wysokimi temperaturami podczas stylizacji. Dzięki kwasowi hialuronowemu w składzie, włosy zachowują nawilżenie, połysk i miękkość, minimalizując uszkodzenia spowodowane gorącem.",
    "image": "/produkty/6zero/262656_sei_punto_zero_heshe_therm_screen_smoothing_spray_200ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262656_sei_punto_zero_heshe_therm_screen_smoothing_spray_200ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2421",
    "slug": "hairzoe-shampoo-300ml",
    "name": "Hairzoe Shampoo 300ml",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon do pielęgnacji specjalnej.",
    "description": "Profesjonalny szampon z linii HQ zapewniający delikatne oczyszczanie i intensywną pielęgnację włosów wymagających szczególnej uwagi.",
    "image": "/produkty/6zero/263141_sei_punto_zero_restructuring_maintenance_shampoo_hairzoe_shampoo_300ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263141_sei_punto_zero_restructuring_maintenance_shampoo_hairzoe_shampoo_300ml.png"
    ],
    "inStock": true,
    "variantAttribute": "Pojemność",
    "variants": [
      {
        "value": "1L",
        "inStock": true
      },
      {
        "value": "300 ml",
        "inStock": true
      }
    ]
  },
  {
    "id": "2422",
    "slug": "hairzoe-cream-500ml",
    "name": "Hairzoe Cream 500ml",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Kremowa kuracja do włosów.",
    "description": "Bogata kremowa kuracja zapewniająca głębokie odżywienie i regenerację włosów. Idealna do stosowania w salonie lub w domu jako intensywna terapia pielęgnacyjna.",
    "image": "/produkty/6zero/263158_sei_punto_zero_hairzoe_restructuring_base_cream_500ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263158_sei_punto_zero_hairzoe_restructuring_base_cream_500ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2423",
    "slug": "hairzoe-mask-250ml",
    "name": "Hairzoe Mask 250ml",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Maska regenerująca do włosów.",
    "description": "Intensywna maska do włosów wymagających regeneracji. Formuła wzbogacona składnikami aktywnymi przywraca włosom zdrowy wygląd, miękkość i blask.",
    "image": "/produkty/6zero/263189_sei_punto_zero_hairzoe_post_restructuring_mask_250ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263189_sei_punto_zero_hairzoe_post_restructuring_mask_250ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2424",
    "slug": "hairzoe-spray-150ml",
    "name": "Hairzoe Spray 150ml",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Spray pielęgnacyjny bez spłukiwania.",
    "description": "Spray Hairzoe to końcowy etap zabiegu salonowego, oferujący działanie regenerujące i rozświetlające. Został zaprojektowany, aby nadać włosom energii oraz poprawić ich siłę i blask. Formuła chroni długości, zamyka łuski włosa i przygotowuje go do szczotkowania. Koncentracja kwasu hialuronowego i komórek macierzystych winogron wzmacnia właściwości regenerujące i ochronne zabiegu dla suchych, łamliwych i zniszczonych włosów.",
    "image": "/produkty/6zero/263172_sei_punto_zero_hairzoe_restructuring_spray_150ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263172_sei_punto_zero_hairzoe_restructuring_spray_150ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2425",
    "slug": "ampulki-hairzoe-12x10",
    "name": "Ampułki Hairzoe 12x10",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Profesjonalna kuracja w dużym opakowaniu.",
    "description": "Serum regenerujące Hairzoe to intensywny zabieg oferujący działanie rozświetlające i kondycjonujące. Ta silna formuła boosterowa może być mieszana z kremem bazowym, aby zapewnić włosom lepszą strukturę, miękkość i objętość. Serum składa się ze składników aktywnych o silnych właściwościach regenerujących: kwas hialuronowy oferuje wypełniający efekt pluming, pomagając włosom utrzymać odpowiedni poziom nawilżenia, podczas gdy komórki macierzyste winogron chronią włosy i zapewniają działanie przeciwstarzeniowe, neutralizując wolne rodniki.",
    "image": "/produkty/6zero/263165_sei_punto_zero_hairzoe_restructuring_booster_serum_10ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263165_sei_punto_zero_hairzoe_restructuring_booster_serum_10ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2427",
    "slug": "sun-mask-300ml",
    "name": "Sun Mask 300ml",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Maska po ekspozycji na słońce.",
    "description": "Regenerująca maska dla włosów eksponowanych na promienie UV. Przywraca nawilżenie, chroni kolor i zapobiega wysuszeniu spowodowanemu słońcem.",
    "image": "/produkty/6zero/263233_sei_punto_zero_take_over_sun_deluxe_mask_300ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263233_sei_punto_zero_take_over_sun_deluxe_mask_300ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2428",
    "slug": "sun-oil-150ml",
    "name": "Sun Oil 150ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Olejek ochronny z filtrem UV.",
    "description": "Lekki olejek ochronny zapewniający ochronę przed promieniowaniem UV, solą morską i chlorem. Nadaje włosom blask i chroni przed uszkodzeniami związanymi z ekspozycją na słońce.",
    "image": "/produkty/6zero/263240_sei_punto_zero_take_over_sun_deluxe_oil_150ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263240_sei_punto_zero_take_over_sun_deluxe_oil_150ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2429",
    "slug": "smooth-mask-300ml",
    "name": "Smooth Mask 300ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Maska wygładzająca do włosów prostych.",
    "description": "Maska Take Over Perfect Smooth przeznaczona dla włosów prostych i niezdyscyplinowanych. Wygładza, kontroluje puszenie się i zapewnia gładkość na długo.",
    "image": "/produkty/6zero/262243-sei-punto-zero-take-over-perfect-smooth-mask-300ml.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262243-sei-punto-zero-take-over-perfect-smooth-mask-300ml.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2430",
    "slug": "smooth-shampoo-300-ml",
    "name": "Smooth Shampoo 300 ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon wygładzający do włosów prostych.",
    "description": "Szampon Take Over Perfect Smooth wzbogacony proteinami jedwabiu i aminokwasami keratyny. Oczyszcza i wygładza włosy proste i niezdyscyplinowane, ułatwiając stylizację.",
    "image": "/produkty/6zero/263301_sei_punto_zero_take_over_protective_color_shampoo_300ml-1.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263301_sei_punto_zero_take_over_protective_color_shampoo_300ml-1.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2431",
    "slug": "define-curl-mask-300ml",
    "name": "Define Curl Mask 300ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Maska definiująca loki.",
    "description": "Maska Take Over Define Curl z kaszmirem keratyny dla włosów falowanych i kręconych. Bogata, intensywna tekstura poskramia nawet najbardziej dzika loki i walczy z puszeniem.",
    "image": "/produkty/6zero/262229-sei-punto-zero-take-over-define-curl-mask-300ml.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262229-sei-punto-zero-take-over-define-curl-mask-300ml.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2432",
    "slug": "define-curl-shampoo-300ml",
    "name": "Define Curl Shampoo 300ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon do włosów falowanych i kręconych.",
    "description": "Szampon Take Over Define Curl wzbogacony kaszmirem keratyny. Delikatnie oczyszcza i nadaje wyjątkową elastyczność, pozostawiając włosy miękkie, lżejsze i bardziej zdefiniowane.",
    "image": "/produkty/6zero/263271_sei_punto_zero_take_over_define_curl_shampoo_300ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263271_sei_punto_zero_take_over_define_curl_shampoo_300ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2433",
    "slug": "full-expand-mask-300ml",
    "name": "Full Expand Mask 300ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Maska dodająca objętości.",
    "description": "Maska Take Over Full Expand dla włosów cienkich i pozbawionych objętości. Nadaje włosom gęstość, unosi je u nasady i zapewnia długotrwałą objętość bez obciążania.",
    "image": "/produkty/6zero/262267-sei-punto-zero-take-over-full-expand-mask-300ml.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262267-sei-punto-zero-take-over-full-expand-mask-300ml.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2434",
    "slug": "full-expand-shampoo-300ml",
    "name": "Full Expand Shampoo 300ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon zwiększający objętość.",
    "description": "Szampon Take Over Full Expand przeznaczony dla włosów cienkich i płaskich. Oczyszcza delikatnie, dodając objętości i lekkości od samych korzeni.",
    "image": "/produkty/6zero/263288-sei-punto-zero-take-over-full-expand-shampoo-300ml.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263288-sei-punto-zero-take-over-full-expand-shampoo-300ml.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2435",
    "slug": "full-expand-spray-150ml",
    "name": "Full Expand Spray 150ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Spray zwiększający objętość.",
    "description": "Spray bez spłukiwania dodający objętości i lekkości włosom. Idealny do włosów cienkich, które potrzebują uniesienia u nasady bez obciążenia.",
    "image": "/produkty/6zero/263370_sei_punto_zero_take_over_full_expand_spray_150ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263370_sei_punto_zero_take_over_full_expand_spray_150ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2436",
    "slug": "rich-shine-mask-300ml",
    "name": "Rich & Shine Mask 300ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Maska nadająca blask suchym włosom.",
    "description": "Maska Take Over Absolute Rich & Shine dla włosów suchych i matowych. Formuła bogata w składniki odżywcze z witaminą B5 (Pantenol) nawilża i przywraca blask, pozostawiając włosy elastyczne i niezwykle lśniące.",
    "image": "/produkty/6zero/262281_sei_punto_zero_take_over_absolute_rich_shine_mask_300ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262281_sei_punto_zero_take_over_absolute_rich_shine_mask_300ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2437",
    "slug": "rich-shine-ampulki",
    "name": "Rich & Shine ampułki",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Ampułki olejkowe do włosów.",
    "description": "Intensywne ampułki olejkowe zapewniające natychmiastowe odżywienie i blask. Idealne do włosów bardzo suchych i zniszczonych wymagających głębokiej regeneracji.",
    "image": "/produkty/6zero/sei_punto_zero_take_over_absolute_rich_shine_olio_mineralizzante.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/sei_punto_zero_take_over_absolute_rich_shine_olio_mineralizzante.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2438",
    "slug": "rich-shine-shampoo-300ml",
    "name": "Rich & Shine Shampoo 300ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon nadający blask.",
    "description": "Szampon Take Over Absolute Rich & Shine do włosów suchych i matowych. Delikatnie oczyszcza i nawilża, przywracając włosom blask i żywotność.",
    "image": "/produkty/6zero/263318_sei_punto_zero_take_over_absolute_rich_shine_shampoo_300ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263318_sei_punto_zero_take_over_absolute_rich_shine_shampoo_300ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2439",
    "slug": "protective-color-mask-300ml",
    "name": "Protective Color Mask 300ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Maska ochronna dla włosów koloryzowanych.",
    "description": "Maska chroniąca i przedłużająca trwałość koloru włosów farbowanych. Zapobiega utlenianiu pigmentu i utracie intensywności koloru, dodając jednocześnie połysku.",
    "image": "/produkty/6zero/262304-sei-punto-zero-take-over-protective-color-mask-300ml.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262304-sei-punto-zero-take-over-protective-color-mask-300ml.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2440",
    "slug": "protective-color-shampoo",
    "name": "Protective Color Shampoo",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon chroniący kolor.",
    "description": "Szampon Take Over Protected Color przeznaczony do włosów koloryzowanych. Delikatnie oczyszcza, chroni pigment koloryzujący i przedłuża intensywność koloru.",
    "image": "/produkty/6zero/263301_sei_punto_zero_take_over_protective_color_shampoo_300ml-1.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263301_sei_punto_zero_take_over_protective_color_shampoo_300ml-1.png"
    ],
    "inStock": true,
    "variantAttribute": "Pojemność",
    "variants": [
      {
        "value": "300 ml",
        "inStock": true
      }
    ]
  },
  {
    "id": "2441",
    "slug": "silver-mask-500ml",
    "name": "Silver Mask 500ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Maska neutralizująca żółte tony.",
    "description": "Maska Take Over Pure Silver z działaniem anty-żółtym dla włosów białych i siwych. Neutralizuje niepożądane żółte odcienie, stabilizuje kolor i pozostawia włosy jasne i żywe.",
    "image": "/produkty/6zero/262632_sei_punto_zero_take_over_pure_silver_mask_500ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262632_sei_punto_zero_take_over_pure_silver_mask_500ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2442",
    "slug": "silver-shampoo-300ml",
    "name": "Silver Shampoo 300ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon anty-żółty.",
    "description": "Szampon Take Over Pure Silver do włosów białych i siwych. Oczyszcza, neutralizuje żółte odcienie i stabilizuje kolor, pozostawiając włosy jasne, chłodne i pełne blasku.",
    "image": "/produkty/6zero/263387_sei_punto_zero_take_over_pure_silver_shampoo_300ml-1.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263387_sei_punto_zero_take_over_pure_silver_shampoo_300ml-1.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2443",
    "slug": "active-ampulki",
    "name": "Active ampułki",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Kuracja dla włosów delikatnych i wrażliwych.",
    "description": "Specjalistyczna kuracja Active dla włosów porowych, delikatnych i wrażliwych. Wzmacnia strukturę, chroni przed uszkodzeniami i przywraca zdrowy wygląd.",
    "image": "/produkty/6zero/262496_sei_punto_zero_take_over_active_power_hair_loss_prevention_treatment-1.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262496_sei_punto_zero_take_over_active_power_hair_loss_prevention_treatment-1.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2445",
    "slug": "active-power-shampoo-300ml",
    "name": "Active Power Shampoo 300ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon do włosów wrażliwych.",
    "description": "Delikatny szampon Active dla włosów porowych i wrażliwych. Oczyszcza bez podrażnień, wzmacnia i chroni strukturę włosa.",
    "image": "/produkty/6zero/263257_sei_punto_zero_take_over_active_power_shampoo_300ml-1.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263257_sei_punto_zero_take_over_active_power_shampoo_300ml-1.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2447",
    "slug": "nutri-shampoo-1l",
    "name": "Nutri Shampoo 1L",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon odżywczy profesjonalny.",
    "description": "Szampon Nutri Salon zapewniający głębokie odżywienie suchym i zniszczonym włosom. Zapobiega rozdwajaniu końcówek, wzmacnia i odżywia włókna włosów.",
    "image": "/produkty/6zero/262137_sei_punto_zero_nutri_salon_shampoo_1000ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262137_sei_punto_zero_nutri_salon_shampoo_1000ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2449",
    "slug": "post-color-shampoo-1l",
    "name": "Post Color Shampoo 1L",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon dla włosów koloryzowanych.",
    "description": "Szampon Post Color Salon specjalnie opracowany dla włosów farbowanych. Łączy delikatne oczyszczanie z ochroną koloru, zapobiegając utlenianiu i utracie intensywności. Wzbogacony olejkiem arganowym i ekstraktem z granatu.",
    "image": "/produkty/6zero/262144_sei_punto_zero_post_color_salon_shampoo_1000ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262144_sei_punto_zero_post_color_salon_shampoo_1000ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2450",
    "slug": "herbal-mask-1000ml",
    "name": "Herbal Mask 1000ml",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Maska regenerująca z ziołami.",
    "description": "Maska Herb Treatment regenerująca dla włosów suchych i matowych. Profesjonalne opakowanie 1000ml z formułą wzbogaconą ekstraktami roślinnymi zapewniającymi głęboką regenerację.",
    "image": "/produkty/6zero/262175_sei_punto_zero_herb_treatment_regenerating_mask_1000ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262175_sei_punto_zero_herb_treatment_regenerating_mask_1000ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2451",
    "slug": "almond-karite-mask-1000-ml",
    "name": "Almond&Karite Mask 1000 ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Maska odżywcza z migdałem i masłem shea.",
    "description": "Odżywcza maska Almond & Karité Treatment dla włosów farbowanych i zniszczonych. Mleko migdałowe nawilża i zmiękcza, a masło shea intensywnie odżywia.",
    "image": "/produkty/6zero/262182_sei_punto_zero_almond_karite_treatment_mask_1000ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262182_sei_punto_zero_almond_karite_treatment_mask_1000ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2452",
    "slug": "he-she-dust-up-7g",
    "name": "He.She Dust Up 7g",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Puder teksturyzujący matujący.",
    "description": "Puder nadający teksturę idealny do zwiększania objętości włosów. Działa na nasadę, unosząc włosy bez obciążania. Doskonały dla włosów cienkich i płaskich, zapewnia matowe wykończenie.",
    "image": "/produkty/6zero/262519-sei-punto-zero-dust-up-7g.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262519-sei-punto-zero-dust-up-7g.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2453",
    "slug": "multi-witamin-shampoo-salon-10l",
    "name": "Multi-Witamin Shampoo Salon 10L",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon salonowy profesjonalny 10L.",
    "description": "Ekonomiczne opakowanie profesjonalnego szamponu do codziennego użytku w salonie. Delikatnie oczyszcza, pozostawia włosy nawilżone i pełne blasku.",
    "image": "/produkty/6zero/262151_sei_punto_zero_professiona_multi_vitamin_shampoo_10lt.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262151_sei_punto_zero_professiona_multi_vitamin_shampoo_10lt.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2454",
    "slug": "shampoo-salon-latte-10l",
    "name": "Shampoo Salon Latte 10L",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon salonowy odżywczy 10L.",
    "description": "Profesjonalny szampon w dużym opakowaniu z mleczną formułą. Odżywia i zmiękcza włosy podczas oczyszczania, idealny do częstego stosowania w salonie.",
    "image": "/produkty/6zero/262168_sei_punto_zero_almond_milk_shampoo_10lt.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262168_sei_punto_zero_almond_milk_shampoo_10lt.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2455",
    "slug": "xy-maska-10w1-200-ml",
    "name": "XY maska 10w1 200 ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Maski i Odżywki",
        "slug": "maski-i-odzywki"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Maska w sprayu bez spłukiwania. Formuła oparta na oleju z czarnej porzeczki i kolagenie roślinnym.",
    "description": "Connection X10, maska w sprayu bez spłukiwania. Formuła oparta na oleju z czarnej porzeczki i kolagenie roślinnym, do natychmiastowego działania wielofunkcyjnego, która daje włosom dziesięć niesamowitych korzyści: odżywia, rozplątuje i regeneruje, zapobiega rozdwajaniu się końcówek, zwalcza puszenie, dodaje tekstury, blasku i miękkości, chroni przed wysoką temperaturą, ułatwia stylizację i sprawia, że trwa dłużej. Butelka 200 ml",
    "image": "/produkty/6zero/262199_sei_punto_zero_connection_x10_multiaction_instant_spray_mask_200ml-1.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262199_sei_punto_zero_connection_x10_multiaction_instant_spray_mask_200ml-1.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2456",
    "slug": "xy-olio-ampulki-10w1-100ml",
    "name": "XY Olio ampułki 10w1 100ml",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Olejek z aktywnym tlenem - zestaw.",
    "description": "Zestaw 16 olejków jednokrotnych z zaawansowaną formułą tlenową. Intensywnie odżywia, nadaje blask i chroni włosy przed uszkodzeniami.",
    "image": "/produkty/6zero/262625-sei-punto-zero-take-over-absolute-rich-shine-mineralizing-oil.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262625-sei-punto-zero-take-over-absolute-rich-shine-mineralizing-oil.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2457",
    "slug": "he-she-sea-salt-200g",
    "name": "He.She Sea Salt 200g",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Sól do peelingu skóry głowy.",
    "description": "Profesjonalna sól morska do peelingu skóry głowy. Oczyszcza, złuszcza martwy naskórek, stymuluje mikrokrążenie i przygotowuje skórę głowy do zabiegów.",
    "image": "/produkty/6zero/262328-sei-punto-zero-heshe-sea-salt-marine-spray-200ml.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262328-sei-punto-zero-heshe-sea-salt-marine-spray-200ml.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2458",
    "slug": "he-she-water-wax-100ml",
    "name": "He.She Water Wax 100ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Wosk do włosów z wodą.",
    "description": "Innowacyjny wosk z dodatkiem wody zapewniający elastyczne utrwalenie i naturalny wygląd. Idealny do definiowania i teksturyzowania włosów.",
    "image": "/produkty/6zero/262335-sei-punto-zero-heshe-water-wax-100ml.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262335-sei-punto-zero-heshe-water-wax-100ml.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2459",
    "slug": "he-she-matt-wax-100ml",
    "name": "He.She Matt Wax 100ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Wosk matujący do stylizacji.",
    "description": "Wosk He.She Matt Wax Definer z matowym wykończeniem. Zapewnia stabilne utrwalenie i kształtuje włosy, tworząc gładkie wykończenie bez efektu mokrych włosów.",
    "image": "/produkty/6zero/262359-sei-punto-zero-heshe-matt-wax-100ml.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262359-sei-punto-zero-heshe-matt-wax-100ml.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2460",
    "slug": "he-she-curl-cream-90ml",
    "name": "He.She Curl Cream 90ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Krem definiujący loki.",
    "description": "Krem He.She Curl Cream do rewitalizacji i tworzenia dobrze zdefiniowanych, elastycznych loków. Idealny do nadawania objętości i intensywnej miękkości włosom naturalnie kręconym i falowanym.",
    "image": "/produkty/6zero/262366-sei-punto-zero-heshe-curl-cream-90ml.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262366-sei-punto-zero-heshe-curl-cream-90ml.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2461",
    "slug": "he-she-smooth-cream-200ml",
    "name": "He.She Smooth Cream 200ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Krem wygładzający bez spłukiwania.",
    "description": "Krem He.She Smooth Cream przeciw puszeniu, kontrolujący elektryzowanie się włosów. Utrzymuje odpowiednie nawilżenie i miękkość, otulając włosy niewidzialną warstwą ochronną.",
    "image": "/produkty/6zero/262373-sei-punto-zero-finish-styling-heshe-smooth-cream-200ml.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262373-sei-punto-zero-finish-styling-heshe-smooth-cream-200ml.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2462",
    "slug": "he-she-oil-non-oil-200ml",
    "name": "He.She Oil Non Oil 200ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Olejek ochronny nieobciążający.",
    "description": "Olejek He.She Oil Non Oil przeciw puszeniu i nadający blask. Idealny dla włosów zniszczonych, suchych i matowych. Lekka formuła nie obciąża włosów.",
    "image": "/produkty/6zero/262380-sei-punto-zero-finish-styling-heshe-oil-non-oil-200ml.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262380-sei-punto-zero-finish-styling-heshe-oil-non-oil-200ml.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2463",
    "slug": "he-she-spray-bifasico-200ml",
    "name": "He.She Spray Bifasico 200ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Dwufazowy spray odżywczy.",
    "description": "Spray He.She hydro-odżywczy i ochronny dodający blasku, miękkości i nawilżenia. Chroni włosy przed stresem czynników zewnętrznych dzięki unikalnym właściwościom kondycjonującym.",
    "image": "/produkty/6zero/262397-sei-punto-zero-finish-styling-heshe-spray-bifasico-200ml.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262397-sei-punto-zero-finish-styling-heshe-spray-bifasico-200ml.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2464",
    "slug": "he-she-gel-in-mousse-300ml",
    "name": "He.She Gel in Mousse 300ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Pianka-żel do stylizacji.",
    "description": "He.She Gel in Mousse wzbogacony keratyną i olejem makadamia. Miękka, lekka tekstura dodaje objętości i witalności włosom. Idealny do definiowania stylizacji na umytych, osuszonych ręcznikiem włosach.",
    "image": "/produkty/6zero/262403-sei-punto-zero-finish-styling-heshe-gel-in-mousse-300ml.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262403-sei-punto-zero-finish-styling-heshe-gel-in-mousse-300ml.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2465",
    "slug": "he-she-lacca-eco-400ml",
    "name": "He.She Lacca Eco 400ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Lakier ekologiczny bez gazu.",
    "description": "Lakier He.She Ecological zwiększający objętość, bez gazu, odpowiedni do wszystkich typów włosów. Utrwala fryzurę, szanując naturalną strukturę włosów, zapewniając zdrowy, lśniący wygląd.",
    "image": "/produkty/6zero/lacca-ecologica-400ml.webp",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/lacca-ecologica-400ml.webp"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2569",
    "slug": "oxy-20-vol-200-ml",
    "name": "Oxy 20 vol 200 ml",
    "category": "Koloryzacja",
    "categorySlug": "koloryzacja",
    "categories": [
      {
        "name": "Koloryzacja",
        "slug": "koloryzacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Emulsja utleniająca do koloryzacji.",
    "description": "Zapachowa emulsja utleniająca do koloryzacji kosmetycznej. Kremowa, delikatnie zapachowa emulsja utleniająca jest idealnym uzupełnieniem koloryzacji 6.Zero, podkreślając jej właściwości, jednocześnie kondycjonując i chroniąc oraz zatrzymując wilgoć i blask włosów podczas koloryzacji. Wysoce stabilny zemulgowany nadtlenek wodoru 6.Zero pozwala na całkowitą swobodę koloryzacji lub rozjaśniania włosów z poszanowaniem włókna włosowatego włosa. Wyłącznie do użytku profesjonalnego. Butelka 200 ml",
    "image": "/produkty/6zero/262052_sei_punto_zero_oxidizing_emulsion_20vol_200ml-1.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262052_sei_punto_zero_oxidizing_emulsion_20vol_200ml-1.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2571",
    "slug": "oxy-30-vol-200-ml",
    "name": "Oxy 30 vol 200 ml",
    "category": "Koloryzacja",
    "categorySlug": "koloryzacja",
    "categories": [
      {
        "name": "Koloryzacja",
        "slug": "koloryzacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Emulsja utleniająca do koloryzacji.",
    "description": "Zapachowa emulsja utleniająca do koloryzacji kosmetycznej. Kremowa, delikatnie zapachowa emulsja utleniająca jest idealnym uzupełnieniem koloryzacji 6.Zero, podkreślając jej właściwości, jednocześnie kondycjonując i chroniąc oraz zatrzymując wilgoć i blask włosów podczas koloryzacji. Wysoce stabilny zemulgowany nadtlenek wodoru 6.Zero pozwala na całkowitą swobodę koloryzacji lub rozjaśniania włosów z poszanowaniem włókna włosowatego włosa. Wyłącznie do użytku profesjonalnego. Butelka 200 ml",
    "image": "/produkty/6zero/262069_sei_punto_zero_oxidizing_emulsion_30vol_200ml-2.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262069_sei_punto_zero_oxidizing_emulsion_30vol_200ml-2.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2573",
    "slug": "he-she-mocny-lakier-500-ml",
    "name": "He.She mocny lakier 500 ml",
    "category": "Stylizacja",
    "categorySlug": "stylizacja",
    "categories": [
      {
        "name": "Stylizacja",
        "slug": "stylizacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Mocny lakier He.She dodający objętości i chroniący przed wilgocią.",
    "description": "Mocny lakier He.She dodający objętości i chroniący przed wilgocią, pozwala na szybkie uformowanie włosów i utrzymuje je elastycznymi i pełnymi objętości przez dłuższy czas. Dodaje naturalnego blasku i miękkości, nie obciążając włosów, i łatwo się wyczesuje. Tworząc niewidzialną warstwę, która osłania włosy, mocny lakier zapobiega niszczeniu fryzury przez wilgoć",
    "image": "/produkty/6zero/lacca-spray-500ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/lacca-spray-500ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2576",
    "slug": "cream-color-off-250-ml",
    "name": "Cream Color Off 250 ml",
    "category": "Koloryzacja",
    "categorySlug": "koloryzacja",
    "categories": [
      {
        "name": "Koloryzacja",
        "slug": "koloryzacja"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Krem Color Off chroni skórę przed plamami podczas procesu koloryzacji.",
    "description": "Krem Color Off chroni skórę przed plamami podczas procesu koloryzacji. Ochronne działanie tworzące film osłania skórę podczas zabiegów koloryzacyjnych i zapobiega niepożądanym zaczerwienieniom: dzięki składnikom izolującym, które tworzą potężny film ochronny, krem jest w stanie stworzyć barierę zapobiegającą jakiemukolwiek kontaktowi między skórą a środkami barwiącymi farby. Prawdziwy must-have w salonie.",
    "image": "/produkty/6zero/262649_sei_punto_zero_cream_color_off_anti_stain_protective_cream_250ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262649_sei_punto_zero_cream_color_off_anti_stain_protective_cream_250ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2578",
    "slug": "sun-deluxe-szampon-300-ml",
    "name": "Sun Deluxe szampon 300 ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon/żel pod prysznic po opalaniu Take Over Sun Deluxe zapewnia wzmocniony blask i ochronę.",
    "description": "Szampon/żel pod prysznic po opalaniu Take Over Sun Deluxe zapewnia wzmocniony blask i ochronę. Delikatnie oczyszcza ciało i włosy po narażeniu na czynniki zewnętrzne: promienie UV, sól i chlor. Jego formuła, wzbogacona witaminą E i polifenolami, zapewnia właściwości ochronne i przywraca naturalne nawilżenie, przynosząc miękkość skórze i blask włosom. 300 ml",
    "image": "/produkty/6zero/263226_sei_punto_zero_take_over_sun_deluxe_shampoo_300ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263226_sei_punto_zero_take_over_sun_deluxe_shampoo_300ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2580",
    "slug": "hy-plex-zestaw-1-1-2-2",
    "name": "Hy-Plex zestaw 1+1+ 2+2",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      }
    ],
    "brand": "",
    "brandSlug": "",
    "shortDescription": "",
    "description": "599Innowacja zaczyna się od wewnątrz: HY-PLEX to ekskluzywny zabieg, który rewolucjonizuje podejście do usług technicznych, rewitalizując włosy uszkodzone przez zabiegi chemiczne. Specjalna formuła z technologią HP2 oferuje włosom maksymalną ochronę przed i po usługach koloryzacji, rozjaśniania i trwałej ondulacji. Rezultat: miękkie włosy o niespotykanym blasku. Zestaw zawiera: 1 butelkę HY-PLEX No.1 (500 ml): Dodatek ochronny do usług technicznych 2 butelki HY-PLEX No.2 (500 ml): Wzmacniająca maska po zabiegu",
    "image": "/produkty/6zero/263158_sei_punto_zero_hairzoe_restructuring_base_cream_500ml262991_sei_punto_zero_hy_plex_kit_2.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263158_sei_punto_zero_hairzoe_restructuring_base_cream_500ml262991_sei_punto_zero_hy_plex_kit_2.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2582",
    "slug": "active-sheer-shampoo-300-ml",
    "name": "Active Sheer Shampoo 300 ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Szampon podwójnego działania do przetłuszczającej się skóry głowy.",
    "description": "TAKE OVER · ACTIVE SHEER Szampon podwójnego działania do przetłuszczającej się skóry głowy, z łupieżem i suchymi włosami Szampon podwójnego działania do przetłuszczającej się skóry głowy, z łupieżem i suchymi włosami o delikatnie oczyszczającym działaniu. Oczyszcza skórę głowy, dzięki Piroctone Olamine i kwasowi salicylowemu, które pomagają zmniejszyć powstawanie łupieżu i redukują nadmiar sebum, przywracając równowagę i świeżość włosom. Ekstrakt z rozmarynu wspomaga głębokie oczyszczanie włosów, z intensywnym działaniem antyoksydacyjnym. Butelka 300 ml",
    "image": "/produkty/6zero/263264_sei_punto_zero_take_over_active_sheer_shampoo_300ml-1.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/263264_sei_punto_zero_take_over_active_sheer_shampoo_300ml-1.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "2586",
    "slug": "regular-salon-shampoo-1l",
    "name": "Regular Salon Shampoo 1L",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      },
      {
        "name": "Szampony",
        "slug": "szampony"
      }
    ],
    "brand": "6 Zero",
    "brandSlug": "6-zero",
    "shortDescription": "Regular Salon, szampon do częstego stosowania.",
    "description": "Regular Salon, szampon do częstego stosowania ma innowacyjną i łagodną formułę, która delikatnie oczyszcza, usuwając zanieczyszczenia bez uszkadzania włosów. Specjalnie zaprojektowany do częstego mycia w salonach, szampon 6.Zero pozostawia włosy nawilżone i lśniące, dzięki połączeniu Aloe Vera i ekstraktu z bambusa. Wyłącznie do użytku profesjonalnego Butelka 1000 ml",
    "image": "/produkty/6zero/262120_sei_punto_zero_regular_salon_shampoo_1000ml.png",
    "images": [
      "https://cbh-polska.pl/wp-content/uploads/2026/02/262120_sei_punto_zero_regular_salon_shampoo_1000ml.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "m-argan",
    "slug": "olejek-arganowy-50ml",
    "name": "Olejek arganowy 50ml",
    "category": "Odbudowa włosów",
    "categorySlug": "odbudowa-wlosow",
    "categories": [
      {
        "name": "Odbudowa włosów",
        "slug": "odbudowa-wlosow"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Regenerujący olejek arganowy do włosów suchych i zniszczonych. Nabłyszcza i wygładza bez obciążania.",
    "description": "",
    "image": "/produkty/ArganComplex.png",
    "images": [
      "/produkty/ArganComplex.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "m-bottox50",
    "slug": "bottox-effect-50ml",
    "name": "Bottox Effect 50ml",
    "category": "Ochrona włosów",
    "categorySlug": "ochrona-wlosow",
    "categories": [
      {
        "name": "Ochrona włosów",
        "slug": "ochrona-wlosow"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Kuracja bottox w pojedynczej fiolce 50 ml. Głębokie nawilżenie i wygładzenie włosów.",
    "description": "<p>Specjalistyczny balsam bogaty w składniki aktywne (ceramidy, keratyna, kolagen roślinny, kwas hialuronowy, olej pistacjowy). Odbudowuje i rewitalizuje włosy dzięki synergicznemu działaniu, tworząc efekt „bottox”: nadaje włosom blask, odżywia łodygę włosa, dzięki czemu wyglądają na pełniejsze i bogatsze.</p><p><strong>Uwaga:</strong> produkt krystalizuje się w temperaturze poniżej 15°C — proces jest odwracalny. Zanurz fiolkę w misce z gorącą wodą na kilka minut, aż preparat się rozpuści i stanie przezroczysty.</p>",
    "image": "/produkty/BottoxSet.png",
    "images": [
      "/produkty/BottoxSet.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "m-kerabox",
    "slug": "kerabond-box-m-oil",
    "name": "Kerabond Box +M+Oil",
    "category": "Zestawy",
    "categorySlug": "zestawy",
    "categories": [
      {
        "name": "Zestawy",
        "slug": "zestawy"
      }
    ],
    "brand": "Chenice",
    "brandSlug": "chenice",
    "shortDescription": "Zestaw KeraBond: maska odbudowująca i olejek multiwitaminowy do włosów suchych i zniszczonych.",
    "description": "",
    "image": "/produkty/KerabondHydroKeratinSet.png",
    "images": [
      "/produkty/KerabondHydroKeratinSet.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "m-acc-noz55",
    "slug": "nozyczki-fryzjerskie-cbh-5-5",
    "name": "Nożyczki fryzjerskie CBH 5,5\"",
    "category": "Akcesoria fryzjerskie",
    "categorySlug": "akcesoria-fryzjerskie",
    "categories": [
      {
        "name": "Akcesoria fryzjerskie",
        "slug": "akcesoria-fryzjerskie"
      }
    ],
    "brand": "",
    "brandSlug": "",
    "shortDescription": "Profesjonalne nożyczki fryzjerskie ze stali nierdzewnej, rozmiar 5,5 cala.",
    "description": "",
    "image": "/produkty/placeholder-accessory.png",
    "images": [
      "/produkty/placeholder-accessory.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "m-acc-noz50",
    "slug": "nozyczki-fryzjerskie-cbh-5-0",
    "name": "Nożyczki fryzjerskie CBH 5,0\"",
    "category": "Akcesoria fryzjerskie",
    "categorySlug": "akcesoria-fryzjerskie",
    "categories": [
      {
        "name": "Akcesoria fryzjerskie",
        "slug": "akcesoria-fryzjerskie"
      }
    ],
    "brand": "",
    "brandSlug": "",
    "shortDescription": "Profesjonalne nożyczki fryzjerskie ze stali nierdzewnej, rozmiar 5,0 cala.",
    "description": "",
    "image": "/produkty/placeholder-accessory.png",
    "images": [
      "/produkty/placeholder-accessory.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "m-acc-szczotka",
    "slug": "szczotka-do-wlosow",
    "name": "Szczotka do włosów",
    "category": "Akcesoria fryzjerskie",
    "categorySlug": "akcesoria-fryzjerskie",
    "categories": [
      {
        "name": "Akcesoria fryzjerskie",
        "slug": "akcesoria-fryzjerskie"
      }
    ],
    "brand": "",
    "brandSlug": "",
    "shortDescription": "Szczotka do stylizacji i rozczesywania włosów.",
    "description": "",
    "image": "/produkty/placeholder-accessory.png",
    "images": [
      "/produkty/placeholder-accessory.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "m-acc-prostownica",
    "slug": "prostownica-do-wlosow",
    "name": "Prostownica do włosów",
    "category": "Akcesoria fryzjerskie",
    "categorySlug": "akcesoria-fryzjerskie",
    "categories": [
      {
        "name": "Akcesoria fryzjerskie",
        "slug": "akcesoria-fryzjerskie"
      }
    ],
    "brand": "",
    "brandSlug": "",
    "shortDescription": "Profesjonalna prostownica do włosów.",
    "description": "",
    "image": "/produkty/placeholder-accessory.png",
    "images": [
      "/produkty/placeholder-accessory.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "m-acc-miseczka",
    "slug": "miseczka-do-farby-color-bowl",
    "name": "Miseczka do farby (Color Bowl)",
    "category": "Akcesoria fryzjerskie",
    "categorySlug": "akcesoria-fryzjerskie",
    "categories": [
      {
        "name": "Akcesoria fryzjerskie",
        "slug": "akcesoria-fryzjerskie"
      }
    ],
    "brand": "",
    "brandSlug": "",
    "shortDescription": "Miseczka do mieszania farby i preparatów koloryzujących.",
    "description": "",
    "image": "/produkty/placeholder-accessory.png",
    "images": [
      "/produkty/placeholder-accessory.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "m-acc-pedzelek",
    "slug": "pedzelek-do-koloryzacji-color-brush",
    "name": "Pędzelek do koloryzacji (Color Brush)",
    "category": "Akcesoria fryzjerskie",
    "categorySlug": "akcesoria-fryzjerskie",
    "categories": [
      {
        "name": "Akcesoria fryzjerskie",
        "slug": "akcesoria-fryzjerskie"
      }
    ],
    "brand": "",
    "brandSlug": "",
    "shortDescription": "Pędzelek do aplikacji farby i preparatów.",
    "description": "",
    "image": "/produkty/placeholder-accessory.png",
    "images": [
      "/produkty/placeholder-accessory.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  },
  {
    "id": "m-acc-pelerynki",
    "slug": "pelerynki-ochronne-30-szt",
    "name": "Pelerynki ochronne (30 szt.)",
    "category": "Akcesoria fryzjerskie",
    "categorySlug": "akcesoria-fryzjerskie",
    "categories": [
      {
        "name": "Akcesoria fryzjerskie",
        "slug": "akcesoria-fryzjerskie"
      }
    ],
    "brand": "",
    "brandSlug": "",
    "shortDescription": "Jednorazowe pelerynki ochronne do zabiegów koloryzacji, opakowanie 30 szt.",
    "description": "",
    "image": "/produkty/placeholder-accessory.png",
    "images": [
      "/produkty/placeholder-accessory.png"
    ],
    "inStock": true,
    "variantAttribute": "",
    "variants": []
  }
]

export const CATEGORIES: Category[] = [
  {
    "name": "Ochrona włosów",
    "slug": "ochrona-wlosow",
    "count": 45
  },
  {
    "name": "Szampony",
    "slug": "szampony",
    "count": 26
  },
  {
    "name": "Stylizacja",
    "slug": "stylizacja",
    "count": 23
  },
  {
    "name": "Odbudowa włosów",
    "slug": "odbudowa-wlosow",
    "count": 22
  },
  {
    "name": "Maski i Odżywki",
    "slug": "maski-i-odzywki",
    "count": 15
  },
  {
    "name": "Koloryzacja",
    "slug": "koloryzacja",
    "count": 11
  },
  {
    "name": "Produkty Techniczne",
    "slug": "produkty-techniczne",
    "count": 9
  },
  {
    "name": "Akcesoria fryzjerskie",
    "slug": "akcesoria-fryzjerskie",
    "count": 9
  },
  {
    "name": "Zestawy",
    "slug": "zestawy",
    "count": 3
  },
  {
    "name": "Inne",
    "slug": "inne",
    "count": 1
  }
]

export const BRANDS: Brand[] = [
  {
    "name": "6 Zero",
    "slug": "6-zero",
    "count": 52
  },
  {
    "name": "Chenice",
    "slug": "chenice",
    "count": 47
  },
  {
    "name": "Color Clean",
    "slug": "color-clean",
    "count": 1
  }
]

/**
 * Publiczny katalog: pokazujemy tylko produkty dostępne na stanie.
 * Reguła domenowa — nie uzupełniamy ilości, tylko ukrywamy produkt gdy brak w magazynie.
 */
export function getVisibleProducts(): Product[] {
  return ALL_PRODUCTS.filter((p) => p.inStock)
}

export function getProductBySlug(slug: string): Product | undefined {
  return getVisibleProducts().find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getVisibleProducts().filter((p) =>
    p.categories.some((c) => c.slug === categorySlug)
  )
}

export function getCategories(): Category[] {
  return CATEGORIES
}

export function getBrands(): Brand[] {
  return BRANDS
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return getVisibleProducts().filter((p) => p.brandSlug === brandSlug)
}

/** Produkty powiązane: ta sama kategoria, z pominięciem bieżącego. Uzupełniane innymi, gdy za mało. */
export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const current = getProductBySlug(slug)
  if (!current) return []
  const currentCats = new Set(current.categories.map((c) => c.slug))
  const shares = (p: Product) => p.categories.some((c) => currentCats.has(c.slug))
  const sameCat = getVisibleProducts().filter(
    (p) => p.slug !== slug && shares(p)
  )
  if (sameCat.length >= limit) return sameCat.slice(0, limit)
  const others = getVisibleProducts().filter(
    (p) => p.slug !== slug && !shares(p)
  )
  return [...sameCat, ...others].slice(0, limit)
}

/** Wybrane produkty na stronę główną (bestsellery). */
export function getFeaturedProducts(limit = 4): Product[] {
  return getVisibleProducts().slice(0, limit)
}
