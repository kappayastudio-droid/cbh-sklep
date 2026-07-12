import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { updatePassword } from "@/app/reset-hasla/actions"
import { PageBanner } from "@/components/layout/page-banner"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Ustaw nowe hasło — CBH Polska",
}

const inputClass =
  "h-11 w-full appearance-none rounded-lg border border-border bg-background px-md text-body2 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"

export default async function NoweHasloPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  // Dostęp tylko z ważną sesją recovery (ustanowioną przez /reset-hasla/potwierdz).
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect(
      "/reset-hasla?error=" +
        encodeURIComponent(
          "Otwórz link resetujący z wiadomości e-mail, aby ustawić nowe hasło."
        )
    )
  }

  return (
    <>
      <PageBanner
        title="Ustaw nowe hasło"
        crumbs={[
          { href: "/", label: "Strona główna" },
          { label: "Nowe hasło" },
        ]}
      />
      <Section surface="background" container="narrow" className="lg:!pt-10">
        {error && (
          <div
            role="alert"
            className="mb-md rounded-lg border border-destructive/30 bg-destructive/10 px-md py-sm text-body2 text-destructive"
          >
            {error}
          </div>
        )}
        <Typography variant="body2" className="mb-md text-muted-foreground">
          Wpisz nowe hasło do konta. Musi mieć co najmniej 8 znaków.
        </Typography>
        <form action={updatePassword} className="flex flex-col gap-md">
          <div className="flex flex-col gap-2xs">
            <label
              htmlFor="password"
              className="text-[14px] font-medium text-foreground"
            >
              Nowe hasło<span className="ml-0.5 text-destructive">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2xs">
            <label
              htmlFor="confirm"
              className="text-[14px] font-medium text-foreground"
            >
              Powtórz hasło<span className="ml-0.5 text-destructive">*</span>
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className={inputClass}
            />
          </div>

          <Button type="submit" size="lg" className="h-12 text-base">
            Zapisz nowe hasło
          </Button>
        </form>
      </Section>
    </>
  )
}
