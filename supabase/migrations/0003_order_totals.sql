-- b2b-shop — utrwalenie kwot zamówienia (Faza 3)
--
-- Powód: od wprowadzenia rabatów ilościowych per produkt (Color Clean od 48 szt.)
-- nie da się odtworzyć sumy zamówienia z samych `order_items` — tabela nie zna
-- sluga produktu, więc nie wie, czy pozycji należał się rabat ilościowy.
-- Dotąd webhook P24, mail potwierdzający i faktura LICZYŁY sumy od nowa, co po
-- każdej zmianie reguł cenowych rozjeżdżało je z kwotą faktycznie pobraną.
--
-- Rozwiązanie: zapisujemy kwoty w chwili złożenia zamówienia i wszędzie dalej
-- już tylko je odczytujemy. Zamówienie z przeszłości nigdy nie zmieni wartości.

alter table orders
  add column if not exists subtotal_net integer,   -- towary przed rabatami (grosze)
  add column if not exists discount_net integer,   -- łączny rabat: ilościowy + progowy
  add column if not exists shipping_net integer;   -- koszt dostawy w chwili zakupu

comment on column orders.subtotal_net is
  'Wartość netto towarów przed rabatami, w groszach. NULL = zamówienie sprzed migracji 0003 (liczone wtedy wstecznie z order_items).';
comment on column orders.discount_net is
  'Łączna kwota rabatu (ilościowy per pozycja + progowy od wartości), w groszach.';
comment on column orders.shipping_net is
  'Koszt dostawy netto w groszach w chwili złożenia zamówienia (0 = gratis).';

-- total_net pozostaje bez zmian i nadal jest kwotą do zapłaty netto:
--   total_net = subtotal_net - discount_net + shipping_net
