-- b2b-shop — weryfikacja firmy po NIP (Faza 6)
--
-- Konta zatwierdzały się wyłącznie ręcznie. Teraz przy rejestracji sprawdzamy
-- NIP w wykazie podatników VAT (biała lista MF) i zatwierdzamy automatycznie,
-- gdy rejestr potwierdza firmę. Wszystko inne trafia do kolejki do człowieka.
--
-- ZASADA: automat mówi „tak" albo „nie wiem". NIGDY „nie".
-- Powód prawny: automatyczna ODMOWA warunków handlowych byłaby zautomatyzowanym
-- podejmowaniem decyzji z art. 22 RODO; automatyczna ZGODA nie jest.
-- Powód praktyczny: rejestracja jako „podatnik VAT zwolniony" jest dobrowolna
-- (art. 96 ust. 3 ustawy o VAT), więc prawdziwy jednoosobowy salon poniżej progu
-- może w wykazie nie figurować. Brak wpisu niczego nie dowodzi.

-- Ślad audytowy: dlaczego to konto zostało (lub nie zostało) zatwierdzone
-- automatycznie. Służy też jako cache — wykaz odświeża się raz na dobę roboczą,
-- a limit to 100 zapytań dziennie na adres IP.
create table if not exists nip_verifications (
  id             uuid primary key default gen_random_uuid(),
  nip            text not null,                    -- znormalizowany, 10 cyfr
  profile_id     uuid references profiles(id) on delete set null,
  outcome        text not null check (outcome in ('approved','review')),
  reason         text not null,                    -- kod techniczny, np. vat_exempt
  note           text not null default '',         -- zdanie po polsku do panelu
  status_vat     text,                             -- Czynny / Zwolniony / Niezarejestrowany
  registry_name  text,                             -- UWAGA: dla JDG to imię i nazwisko, nie szyld
  registry_address text,
  regon          text,
  request_id     text,                             -- identyfikator zapytania MF
  checked_at     timestamptz not null default now()
);

create index if not exists nip_verifications_nip_idx on nip_verifications(nip, checked_at desc);
create index if not exists nip_verifications_profile_idx on nip_verifications(profile_id);

alter table nip_verifications enable row level security;

-- Tylko admin. Klient nie ma po co oglądać danych rejestrowych innych firm.
drop policy if exists nip_verifications_admin on nip_verifications;
create policy nip_verifications_admin on nip_verifications
  for all using (public.is_admin()) with check (public.is_admin());

-- Powód czekania, pokazywany przy kliencie na liście w panelu.
-- Zdenormalizowany celowo: panel ma go wyświetlić bez dodatkowego łączenia tabel.
alter table profiles
  add column if not exists verification_outcome text,
  add column if not exists verification_note text;

comment on column profiles.verification_outcome is
  'approved = zatwierdzone automatycznie po sprawdzeniu NIP; review = czeka na człowieka; NULL = konto sprzed tej funkcji.';
comment on column profiles.verification_note is
  'Powód po polsku, pokazywany właścicielowi w panelu przy koncie oczekującym.';
