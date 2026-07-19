import Link from "next/link"
import { Gift } from "lucide-react"

import { Typography } from "@/components/ui/typography"

// Ikony marek (lucide usunął ikony brandowe) — wbudowane SVG.
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-7h2.3l.4-2.9h-2.7V9.2c0-.8.3-1.4 1.5-1.4h1.3V5.2c-.6-.1-1.4-.2-2.2-.2-2.2 0-3.6 1.3-3.6 3.7v2.2H8.2V14h2.3v7h3z" />
  </svg>
)

const navLinks = [
  { href: "/sklep", label: "Sklep" },
  { href: "/promocje", label: "Promocje" },
  { href: "/marki/chenice", label: "Marki" },
] as const

const legalLinks = [
  { href: "/regulamin", label: "Regulamin" },
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/polityka-cookies", label: "Polityka cookies" },
  { href: "/cookies", label: "Cookies" },
] as const

const socials = [
  {
    href: "https://www.facebook.com/ChenicePolska",
    label: "Facebook",
    Icon: FacebookIcon,
  },
] as const

export function Footer() {
  return (
    <footer className="bg-background px-0 pb-0 pt-md">
      {/* Pasek gratisów nad stopką */}
      <div className="section-x mb-md">
        <p className="mx-auto flex max-w-[var(--container-content)] flex-col items-center justify-center gap-2xs text-center text-[14px] text-muted-foreground md:flex-row md:gap-xs">
          <Gift className="size-4 shrink-0 text-[#787169]" aria-hidden />
          Do każdego zamówienia farb: miseczka, pędzelek do koloryzacji oraz
          pelerynka ochronna gratis!
        </p>
      </div>

      <div className="bg-black py-8 text-[#e9e6da] md:py-14">
        <div className="section-x mx-auto max-w-[var(--container-content)]">
        {/* Top — hasło + CTA */}
        <div className="flex flex-col gap-md md:flex-row md:items-center md:justify-between">
          <Typography
            variant="h5"
            as="p"
            className="max-w-[450px] leading-snug text-[#f3f0e7]"
          >
            Twój salon zaczyna się od dobrych produktów.
          </Typography>
          <div className="flex shrink-0 items-center gap-md">
            <Link
              href="/login"
              className="text-[14px] font-medium text-[#f3f0e7] underline underline-offset-4 transition-colors hover:text-white"
            >
              Zaloguj się
            </Link>
            <Link
              href="/rejestracja"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 py-3.5 text-[14px] font-medium text-[#f3f0e7] transition-colors hover:bg-white/20"
            >
              Załóż konto
            </Link>
          </div>
        </div>

        <hr className="my-lg border-white/15" />

        {/* Marka */}
        <div className="mb-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-white.svg" alt="CBH Polska" className="h-10 w-auto" />
          <p className="mt-sm text-[11px] uppercase tracking-[0.18em] text-white/45">
            Hurtownia kosmetyków fryzjerskich
          </p>
        </div>

        {/* Middle — 2 kolumny na mobile: nawigacja / kontakt, godziny pod spodem */}
        <div className="grid grid-cols-2 gap-x-lg gap-y-lg md:grid-cols-3">
          {/* Nawigacja */}
          <div>
            <h2 className="mb-sm text-[14px] font-medium text-white/55">
              Nawigacja
            </h2>
            <ul className="flex flex-col gap-xs text-[14px]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[#d9d6c9] transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h2 className="mb-sm text-[14px] font-medium text-white/55">
              Kontakt
            </h2>
            <ul className="flex flex-col gap-xs text-[14px] text-[#d9d6c9]">
              <li className="text-white/85">Chenice System Polska</li>
              <li>ul. Meissnera 47</li>
              <li>60-408 Poznań</li>
              <li>NIP: 7771134877</li>
              <li>REGON: 631006741</li>
              <li className="pt-2xs">
                <a href="mailto:chenice@list.pl" className="hover:text-white">
                  chenice@list.pl
                </a>
              </li>
              <li>
                <a href="tel:+48601715751" className="hover:text-white">
                  +48 601 715 751
                </a>
              </li>
            </ul>
          </div>

          {/* Godziny otwarcia — pełna szerokość na mobile */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="mb-sm text-[14px] font-medium text-white/55">
              Godziny otwarcia
            </h2>
            <ul className="flex flex-col gap-xs text-[14px] text-[#d9d6c9]">
              <li>Poniedziałek - Piątek &nbsp;|&nbsp; 9:00 - 17:00</li>
              <li>Sobota &nbsp;|&nbsp; 9:00 - 13:00</li>
              <li>Niedziela &nbsp;|&nbsp; nieczynne</li>
            </ul>
          </div>
        </div>

        <hr className="my-lg border-white/15" />

        {/* Bottom bar — copyright/legal po lewej, social po prawej */}
        <div className="flex flex-col gap-md md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2xs text-[13px] text-white/55 sm:flex-row sm:items-center sm:gap-lg">
            <span>© 2026 CBH Polska</span>
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-sm">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full border border-white/25 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon className="size-[18px]" aria-hidden />
              </a>
            ))}
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}
