import { HeroCarousel } from "@/components/hero-carousel"
import { getBanners } from "@/lib/banners"
import { BestsellersSection } from "@/components/sections/bestsellers"
import { CategoriesSection } from "@/components/sections/categories"
import { RegistrationBanner } from "@/components/sections/registration-banner"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { getSession } from "@/lib/auth"
import { SITE_NAME, SITE_URL } from "@/lib/site"

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-black.svg`,
  email: "chenice@list.pl",
  telephone: "+48601715751",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Meissnera 47",
    addressCountry: "PL",
  },
}

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
}

export default async function HomePage() {
  const [session, banners] = await Promise.all([getSession(), getBanners()])
  const heroSlides = banners.map((b) => ({
    src: b.image,
    alt: b.alt,
    eyebrow: b.eyebrow,
    title: b.title,
    subtitle: b.subtitle,
    ctaLabel: b.ctaLabel,
    ctaHref: b.ctaHref,
  }))
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([orgLd, websiteLd]),
        }}
      />
      <HeroCarousel slides={heroSlides} />
      <BestsellersSection />
      <CategoriesSection />
      <RegistrationBanner
        isAuthenticated={session.isAuthenticated}
        isApproved={session.isApproved}
      />
      <TestimonialsSection />
    </>
  )
}
