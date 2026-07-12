import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { signup } from "@/app/rejestracja/actions"
import { PageBanner } from "@/components/layout/page-banner"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { getSession } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Zarejestruj się — CBH Polska",
  description:
    "Załóż konto hurtowe B2B, aby zobaczyć ceny i składać zamówienia.",
}

const inputClass =
  "h-11 w-full appearance-none rounded-lg border border-border bg-background px-md text-body2 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"

function Field({
  id,
  label,
  required,
  type = "text",
  placeholder,
  autoComplete,
}: {
  id: string
  label: string
  required?: boolean
  type?: string
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <div className="flex flex-col gap-2xs">
      <label htmlFor={id} className="text-[14px] font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </div>
  )
}

export default async function RejestracjaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>
}) {
  const { error, success } = await searchParams
  // Zalogowany użytkownik nie potrzebuje strony rejestracji.
  const session = await getSession()
  if (session.isAuthenticated) redirect("/konto")
  return (
    <>
      <PageBanner
        title="Zarejestruj się"
        crumbs={[
          { href: "/", label: "Strona główna" },
          { label: "Zarejestruj się" },
        ]}
      />
      <Section surface="background" container="narrow" className="lg:!pt-10">
        {success && (
          <div
            role="status"
            className="mb-md rounded-lg border border-[#787169]/30 bg-[#787169]/10 px-md py-sm text-body2 text-foreground"
          >
            Konto zostało utworzone. Po weryfikacji adresu e-mail poczekaj na
            zatwierdzenie konta B2B — damy znać, gdy ceny będą widoczne.
          </div>
        )}
        {error && (
          <div
            role="alert"
            className="mb-md rounded-lg border border-destructive/30 bg-destructive/10 px-md py-sm text-body2 text-destructive"
          >
            {error}
          </div>
        )}
        <form className="flex flex-col gap-lg" action={signup}>
          {/* Dane konta */}
          <div className="flex flex-col gap-md">
            <Field
              id="username"
              label="Nazwa użytkownika"
              required
              autoComplete="username"
            />
            <Field
              id="email"
              label="Adres e-mail"
              type="email"
              required
              autoComplete="email"
            />
            <Field
              id="password"
              label="Hasło"
              type="password"
              required
              autoComplete="new-password"
            />
          </div>

          <hr className="border-border" />

          {/* Dane osobowe i firmowe */}
          <div className="flex flex-col gap-md">
            <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
              <Field
                id="firstName"
                label="Imię"
                required
                placeholder="Wpisz swoje imię tutaj..."
                autoComplete="given-name"
              />
              <Field
                id="lastName"
                label="Nazwisko"
                required
                placeholder="Wpisz swoje nazwisko tutaj..."
                autoComplete="family-name"
              />
            </div>
            <Field
              id="company"
              label="Nazwa firmy"
              required
              placeholder="Wpisz tutaj nazwę swojej firmy..."
              autoComplete="organization"
            />
            <Field id="nip" label="NIP" required placeholder="Wpisz NIP" />
            <Field
              id="address1"
              label="Ulica i numer"
              required
              placeholder="Wpisz swój adres tutaj..."
              autoComplete="address-line1"
            />
            <Field
              id="address2"
              label="Linia adresu 2"
              placeholder="Linia adresu 2."
              autoComplete="address-line2"
            />
            <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
              <Field
                id="city"
                label="Miejscowość"
                required
                placeholder="Wpisz tutaj swoje miasto..."
                autoComplete="address-level2"
              />
              <Field
                id="postalCode"
                label="Kod pocztowy"
                required
                placeholder="Wpisz swój kod pocztowy / ZIP tutaj ..."
                autoComplete="postal-code"
              />
            </div>
            <Field
              id="phone"
              label="Numer telefonu"
              type="tel"
              required
              placeholder="Wpisz swój numer telefonu tutaj..."
              autoComplete="tel"
            />
          </div>

          <Typography variant="caption" className="text-muted-foreground">
            Twoje dane osobowe zostaną użyte do obsługi twojej wizyty na naszej
            stronie, zarządzania dostępem do twojego konta i dla innych celów, o
            których mówi nasza{" "}
            <Link
              href="/polityka-prywatnosci"
              className="text-foreground underline underline-offset-4"
            >
              polityka prywatności
            </Link>
            .
          </Typography>

          <Button type="submit" size="lg" className="h-12 text-base">
            Zarejestruj się
          </Button>

          <Typography variant="body2" className="text-muted-foreground">
            Masz już konto?{" "}
            <Link
              href="/login"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Zaloguj się
            </Link>
          </Typography>
        </form>
      </Section>
    </>
  )
}
