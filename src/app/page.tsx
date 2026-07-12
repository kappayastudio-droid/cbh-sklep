import { HeroCarousel } from "@/components/hero-carousel"
import { BestsellersSection } from "@/components/sections/bestsellers"
import { CategoriesSection } from "@/components/sections/categories"
import { RegistrationBanner } from "@/components/sections/registration-banner"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { getSession } from "@/lib/auth"

export default async function HomePage() {
  const session = await getSession()
  return (
    <>
      <HeroCarousel />
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
