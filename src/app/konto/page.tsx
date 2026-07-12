import type { Metadata } from "next"
import Link from "next/link"

import { updateProfile } from "@/app/konto/actions"
import { logout } from "@/lib/actions/auth"
import { PageBanner } from "@/components/layout/page-banner"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { getSession } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import { formatDate, formatPriceNet, ORDER_STATUS_LABELS } from "@/lib/format"

export const metadata: Metadata = {
  title: "Moje konto — CBH Polska",
}

export const dynamic = "force-dynamic"

const inputClass =
  "h-11 w-full appearance-none rounded-lg border border-border bg-background px-md text-body2 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
const readonlyClass =
  "h-11 w-full rounded-lg border border-border bg-surface-2 px-md text-body2 text-muted-foreground flex items-center"

type OrderRow = {
  id: string
  status: string
  total_net: number
  created_at: string
}
type ItemRow = {
  order_id: string
  name_snapshot: string
  unit_price_net: number
  qty: number
}

function Field({
  id,
  label,
  defaultValue,
  type = "text",
  autoComplete,
}: {
  id: string
  label: string
  defaultValue?: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div className="flex flex-col gap-2xs">
      <label htmlFor={id} className="text-[14px] font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </div>
  )
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string }>
}) {
  const { updated } = await searchParams
  const session = await getSession()

  if (!session.isAuthenticated) {
    return (
      <>
        <PageBanner
          title="Moje konto"
          crumbs={[{ href: "/", label: "Strona główna" }, { label: "Konto" }]}
        />
        <Section surface="background" className="lg:!pt-10">
          <div className="mx-auto w-full max-w-[28rem] py-xl text-center">
            <Typography variant="h5" as="h2" className="mb-sm">
              Zaloguj się
            </Typography>
            <Typography variant="body2" className="mb-lg text-muted-foreground">
              Zaloguj się, aby zobaczyć swoje konto i zamówienia.
            </Typography>
            <Button size="lg" render={<Link href="/login" />}>
              Zaloguj się
            </Button>
          </div>
        </Section>
      </>
    )
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const meta = (user?.user_metadata ?? {}) as Record<string, string>

  const { data: profile } = await supabase
    .from("profiles")
    .select("company_name, nip, phone")
    .eq("id", user?.id ?? "")
    .maybeSingle()

  const { data: address } = await supabase
    .from("addresses")
    .select("line1, line2, city, postal_code")
    .eq("profile_id", user?.id ?? "")
    .eq("is_default", true)
    .maybeSingle()

  const { data: ordersData } = await supabase
    .from("orders")
    .select("id, status, total_net, created_at")
    .order("created_at", { ascending: false })
  const orders = (ordersData ?? []) as OrderRow[]

  const itemsByOrder = new Map<string, ItemRow[]>()
  if (orders.length) {
    const { data: itemsData } = await supabase
      .from("order_items")
      .select("order_id, name_snapshot, unit_price_net, qty")
      .in(
        "order_id",
        orders.map((o) => o.id)
      )
    for (const it of (itemsData ?? []) as ItemRow[]) {
      const arr = itemsByOrder.get(it.order_id) ?? []
      arr.push(it)
      itemsByOrder.set(it.order_id, arr)
    }
  }

  return (
    <>
      <PageBanner
        title="Moje konto"
        crumbs={[{ href: "/", label: "Strona główna" }, { label: "Konto" }]}
      />
      <Section surface="background" innerClassName="flex flex-col gap-xl" className="lg:!pt-10">
        {updated && (
          <div
            role="status"
            className="rounded-lg border border-[#787169]/30 bg-[#787169]/10 px-md py-sm text-body2 text-foreground"
          >
            Dane zostały zapisane.
          </div>
        )}

        {/* Dane konta — edycja */}
        <div className="rounded-lg border border-border bg-surface-1 p-lg">
          <div className="mb-md flex flex-wrap items-center justify-between gap-sm">
            <Typography variant="subtitle1" as="h2" className="font-semibold">
              Dane konta
            </Typography>
            <span className="text-caption">
              Status B2B:{" "}
              {session.isApproved ? (
                <span className="font-medium text-[#787169]">
                  zatwierdzone — ceny widoczne
                </span>
              ) : (
                <span className="text-muted-foreground">
                  oczekuje na zatwierdzenie
                </span>
              )}
            </span>
          </div>

          <form action={updateProfile} className="flex flex-col gap-lg">
            {/* Dane osobowe / kontaktowe */}
            <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
              <Field
                id="firstName"
                label="Imię"
                defaultValue={meta.first_name}
                autoComplete="given-name"
              />
              <Field
                id="lastName"
                label="Nazwisko"
                defaultValue={meta.last_name}
                autoComplete="family-name"
              />
              <div className="flex flex-col gap-2xs">
                <span className="text-[14px] font-medium text-foreground">
                  E-mail
                </span>
                <div className={readonlyClass}>{session.email}</div>
                <span className="text-caption text-muted-foreground">
                  Aby zmienić e-mail, skontaktuj się z nami.
                </span>
              </div>
              <Field
                id="phone"
                label="Telefon"
                type="tel"
                defaultValue={profile?.phone ?? ""}
                autoComplete="tel"
              />
            </div>

            <hr className="border-border" />

            {/* Dane firmowe */}
            <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
              <Field
                id="company"
                label="Nazwa firmy"
                defaultValue={profile?.company_name ?? ""}
                autoComplete="organization"
              />
              <div className="flex flex-col gap-2xs">
                <span className="text-[14px] font-medium text-foreground">
                  NIP
                </span>
                <div className={readonlyClass}>{profile?.nip || "—"}</div>
                <span className="text-caption text-muted-foreground">
                  NIP powiązany z kontem — zmiana przez kontakt z nami.
                </span>
              </div>
            </div>

            <hr className="border-border" />

            {/* Adres */}
            <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field
                  id="line1"
                  label="Ulica i numer"
                  defaultValue={address?.line1 ?? ""}
                  autoComplete="address-line1"
                />
              </div>
              <div className="sm:col-span-2">
                <Field
                  id="line2"
                  label="Linia adresu 2"
                  defaultValue={address?.line2 ?? ""}
                  autoComplete="address-line2"
                />
              </div>
              <Field
                id="city"
                label="Miejscowość"
                defaultValue={address?.city ?? ""}
                autoComplete="address-level2"
              />
              <Field
                id="postalCode"
                label="Kod pocztowy"
                defaultValue={address?.postal_code ?? ""}
                autoComplete="postal-code"
              />
            </div>

            <Button type="submit" size="lg" className="h-12 self-start px-lg">
              Zapisz zmiany
            </Button>
          </form>

          <form action={logout} className="mt-md border-t border-border pt-md">
            <Button type="submit" variant="outline" size="lg" className="h-12">
              Wyloguj
            </Button>
          </form>
        </div>

        {/* Historia zamówień */}
        <div className="flex flex-col gap-md">
          <Typography variant="subtitle1" as="h2" className="font-semibold">
            Historia zamówień
          </Typography>

          {orders.length === 0 ? (
            <Typography variant="body2" className="text-muted-foreground">
              Nie masz jeszcze żadnych zamówień.{" "}
              <Link
                href="/sklep"
                className="font-medium text-foreground underline underline-offset-2"
              >
                Przejdź do sklepu
              </Link>
              .
            </Typography>
          ) : (
            orders.map((o) => (
              <article
                key={o.id}
                className="rounded-lg border border-border bg-surface-1 p-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-sm">
                  <p className="text-caption text-muted-foreground">
                    {formatDate(o.created_at)} · #{o.id.slice(0, 8)} ·{" "}
                    {ORDER_STATUS_LABELS[o.status] ?? o.status}
                  </p>
                  <span className="font-semibold tabular-nums">
                    {formatPriceNet(o.total_net)}
                  </span>
                </div>
                <ul className="mt-sm flex flex-col gap-2xs border-t border-border pt-sm text-body2">
                  {(itemsByOrder.get(o.id) ?? []).map((it, i) => (
                    <li key={i} className="flex justify-between gap-sm">
                      <span className="text-muted-foreground">
                        {it.qty} × {it.name_snapshot}
                      </span>
                      <span className="shrink-0 tabular-nums">
                        {formatPriceNet(it.unit_price_net * it.qty)}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))
          )}
        </div>
      </Section>
    </>
  )
}
