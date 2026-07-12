import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { requestReset } from "@/app/reset-hasla/actions"
import { PageBanner } from "@/components/layout/page-banner"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { getSession } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Reset hasła — CBH Polska",
  description: "Zresetuj hasło do konta hurtowego B2B.",
}

const inputClass =
  "h-11 w-full appearance-none rounded-lg border border-border bg-background px-md text-body2 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"

export default async function ResetHaslaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>
}) {
  const { error, sent } = await searchParams
  const session = await getSession()
  if (session.isAuthenticated) redirect("/konto")

  return (
    <>
      <PageBanner
        title="Reset hasła"
        crumbs={[
          { href: "/", label: "Strona główna" },
          { label: "Reset hasła" },
        ]}
      />
      <Section surface="background" container="narrow" className="lg:!pt-10">
        {sent ? (
          <div
            role="status"
            className="rounded-lg border border-[#787169]/30 bg-[#787169]/10 px-md py-md text-body2 text-foreground"
          >
            <p className="mb-2xs font-medium">Sprawdź skrzynkę e-mail.</p>
            <p className="text-muted-foreground">
              Jeśli konto z tym adresem istnieje, wysłaliśmy link do ustawienia
              nowego hasła. Link jest ważny przez ograniczony czas.
            </p>
            <Link
              href="/login"
              className="mt-md inline-block font-medium text-foreground underline underline-offset-4"
            >
              Wróć do logowania
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div
                role="alert"
                className="mb-md rounded-lg border border-destructive/30 bg-destructive/10 px-md py-sm text-body2 text-destructive"
              >
                {error}
              </div>
            )}
            <Typography variant="body2" className="mb-md text-muted-foreground">
              Podaj adres e-mail powiązany z kontem. Wyślemy link do ustawienia
              nowego hasła.
            </Typography>
            <form action={requestReset} className="flex flex-col gap-md">
              <div className="flex flex-col gap-2xs">
                <label
                  htmlFor="email"
                  className="text-[14px] font-medium text-foreground"
                >
                  Adres e-mail
                  <span className="ml-0.5 text-destructive">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </div>

              <Button type="submit" size="lg" className="h-12 text-base">
                Wyślij link resetujący
              </Button>

              <Link
                href="/login"
                className="text-body2 text-muted-foreground transition-colors hover:text-foreground"
              >
                Wróć do logowania
              </Link>
            </form>
          </>
        )}
      </Section>
    </>
  )
}
