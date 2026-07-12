import type { Metadata } from "next"
import Link from "next/link"

import { CheckoutForm } from "@/components/checkout-form"
import { PageBanner } from "@/components/layout/page-banner"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { getSession } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Zamówienie — CBH Polska",
}

export const dynamic = "force-dynamic"

export default async function CheckoutPage() {
  const session = await getSession()

  return (
    <>
      <PageBanner
        title="Zamówienie"
        image="/banner-koszyk.jpg"
        crumbs={[
          { href: "/", label: "Strona główna" },
          { href: "/koszyk", label: "Koszyk" },
          { label: "Zamówienie" },
        ]}
      />
      <Section surface="background" className="lg:!pt-10">
        {!session.isApproved ? (
          <div className="mx-auto w-full max-w-[28rem] py-xl text-center">
            <Typography variant="h5" as="h2" className="mb-sm">
              {session.isAuthenticated
                ? "Konto oczekuje na zatwierdzenie"
                : "Zaloguj się, aby zamówić"}
            </Typography>
            <Typography variant="body2" className="mb-lg text-muted-foreground">
              {session.isAuthenticated
                ? "Zamówienia hurtowe będą dostępne po zatwierdzeniu konta B2B."
                : "Składanie zamówień jest dostępne dla zalogowanych, zatwierdzonych klientów B2B."}
            </Typography>
            {!session.isAuthenticated && (
              <Button size="lg" render={<Link href="/login" />}>
                Zaloguj się
              </Button>
            )}
          </div>
        ) : (
          <CheckoutForm defaults={await getInvoiceDefaults()} />
        )}
      </Section>
    </>
  )
}

async function getInvoiceDefaults() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { companyName: null, nip: null, phone: null }
    const { data } = await supabase
      .from("profiles")
      .select("company_name, nip, phone")
      .eq("id", user.id)
      .maybeSingle()
    return {
      companyName: data?.company_name ?? null,
      nip: data?.nip ?? null,
      phone: data?.phone ?? null,
    }
  } catch {
    return { companyName: null, nip: null, phone: null }
  }
}
