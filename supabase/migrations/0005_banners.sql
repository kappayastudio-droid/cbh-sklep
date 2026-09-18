-- b2b-shop — banery na stronie głównej (Faza 5)
--
-- Dotąd slajdy były zaszyte w kodzie (src/components/hero-carousel.tsx), więc
-- każda zmiana zdjęcia czy zdania wymagała programisty i wdrożenia. Teraz
-- siedzą w bazie i właściciel edytuje je sam w panelu (/admin/banery).

create table if not exists banners (
  id           uuid primary key default gen_random_uuid(),
  sort         int  not null default 0,          -- kolejność na karuzeli, rosnąco
  is_published boolean not null default true,    -- odznaczony = nie pokazuj, ale nie kasuj
  image        text not null default '',         -- ścieżka z /public, np. /banner-colorclean.jpg
  alt          text not null default '',         -- opis zdjęcia dla czytników ekranu
  eyebrow      text not null default '',         -- mała etykieta nad tytułem
  title        text not null default '',
  subtitle     text not null default '',
  cta_label    text not null default '',         -- napis na przycisku
  cta_href     text not null default '',         -- dokąd prowadzi (np. /promocje)
  created_at   timestamptz not null default now()
);

create index if not exists banners_sort_idx on banners(sort);

alter table banners enable row level security;

-- Baner opublikowany widzi każdy — to treść strony głównej, nie dane wrażliwe.
drop policy if exists banners_public_read on banners;
create policy banners_public_read on banners
  for select using (is_published or public.is_admin());

-- Dodawać, zmieniać i usuwać może wyłącznie admin.
drop policy if exists banners_admin_write on banners;
create policy banners_admin_write on banners
  for all using (public.is_admin()) with check (public.is_admin());

-- ── Treść startowa ────────────────────────────────────────────
-- Wstawiamy tylko raz: przy ponownym uruchomieniu migracji nic się nie duplikuje
-- ani nie nadpisuje tekstów, które właściciel zdążył już poprawić w panelu.
insert into banners (sort, image, alt, eyebrow, title, subtitle, cta_label, cta_href)
select * from (values
  (10,
   '/banner-colorclean.jpg',
   'Color Clean — chusteczki do usuwania koloru',
   'Producent',
   'Jesteśmy producentem kultowych chusteczek po koloryzacji Color Clean',
   'Błyskawicznie usuwają plamy z farby ze skóry, bez szorowania i podrażnień. Z Aloe Vera i Pro-Witaminą B5, które pielęgnują skórę.',
   'Zobacz Color Clean',
   '/produkty/color-clean-chusteczki'),
  (20,
   '/hero-lhc.png',
   'LHC · liposomowe farby do włosów z wodą termalną',
   'Nowość',
   'LHC · liposomowe farby do włosów',
   'Nowa generacja koloryzacji: system aktywacji liposomowej, woda termalna i olej arganowy dają trwały, lśniący kolor o niskiej zawartości amoniaku.',
   'Sprawdź',
   '/produkty/liposomowe-farby-do-wlosow-1-1-5-100ml'),
  (30,
   '/hero-2.png',
   'Bottox Effect — kuracja nawilżająca',
   'Kuracja nawilżająca',
   'Bottox Effect · głębokie nawilżenie',
   'Kwas hialuronowy, kolagen i keratyna w jednym zabiegu. Włosy gładkie, błyszczące i odporniejsze na zniszczenie, bez prostowania.',
   'Zobacz produkt',
   '/sklep')
) as seed
where not exists (select 1 from banners);
