import type { Metadata } from "next"
import Link from "next/link"

import { redirect } from "next/navigation"

import { login } from "@/app/login/actions"
import { PageBanner } from "@/components/layout/page-banner"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { getSession } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Logowanie — CBH Polska",
  description: "Zaloguj się na konto hurtowe B2B.",
}

const inputClass =
  "h-11 w-full appearance-none rounded-lg border border-border bg-background px-md text-body2 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; reset?: string }>
}) {
  const { error, reset } = await searchParams
  const session = await getSession()
  if (session.isAuthenticated) redirect("/konto")
  return (
    <>
      <PageBanner
        title="Logowanie"
        crumbs={[
          { href: "/", label: "Strona główna" },
          { label: "Logowanie" },
        ]}
      />
      <Section surface="background" container="narrow" className="lg:!pt-10">
        {reset && (
          <div
            role="status"
            className="mb-md rounded-lg border border-[#787169]/30 bg-[#787169]/10 px-md py-sm text-body2 text-foreground"
          >
            Hasło zostało zmienione. Zaloguj się nowym hasłem.
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
        <form action={login} className="flex flex-col gap-md">
          <div className="flex flex-col gap-2xs">
            <label
              htmlFor="identifier"
              className="text-[14px] font-medium text-foreground"
            >
              Nazwa użytkownika lub adres e-mail
              <span className="ml-0.5 text-destructive">*</span>
            </label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              required
              autoComplete="username"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2xs">
            <label
              htmlFor="password"
              className="text-[14px] font-medium text-foreground"
            >
              Hasło<span className="ml-0.5 text-destructive">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={inputClass}
            />
          </div>

          <label className="flex items-center gap-2xs text-body2 text-foreground">
            <input
              type="checkbox"
              name="remember"
              className="size-4 rounded border-border accent-[#787169]"
            />
            Zapamiętaj mnie
          </label>

          <Button type="submit" size="lg" className="h-12 text-base">
            Zaloguj się
          </Button>

          <Link
            href="/reset-hasla"
            className="text-body2 text-muted-foreground transition-colors hover:text-foreground"
          >
            Nie pamiętasz hasła?
          </Link>

          <hr className="my-2xs border-border" />

          <Typography variant="body2" className="text-muted-foreground">
            Nie masz jeszcze konta?{" "}
            <Link
              href="/rejestracja"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Zarejestruj się
            </Link>
          </Typography>
        </form>
      </Section>
    </>
  )
}
