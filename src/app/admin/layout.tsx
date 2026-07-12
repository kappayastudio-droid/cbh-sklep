import type { Metadata } from "next"
import Link from "next/link"

import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { requireAdmin } from "@/lib/admin"

export const metadata: Metadata = {
  title: "Panel administracyjny — CBH Polska",
}

const tabs = [
  { href: "/admin/zamowienia", label: "Zamówienia" },
  { href: "/admin/ceny", label: "Ceny i stany" },
  { href: "/admin/klienci", label: "Klienci" },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin()

  return (
    <Section surface="background">
      <header className="mb-lg border-b border-border pb-md">
        <Typography variant="h4" as="h1">
          Panel administracyjny
        </Typography>
        <nav className="mt-md flex gap-xs">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-full border border-border px-md py-2xs text-body2 text-foreground/80 transition-colors hover:border-[#787169]/50 hover:text-foreground"
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </Section>
  )
}
