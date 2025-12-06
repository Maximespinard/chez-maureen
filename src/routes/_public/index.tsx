import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/features/home/components/HeroSection'
import { FeaturedProducts } from '@/features/home/components/FeaturedProducts'
import { AboutSection } from '@/features/home/components/AboutSection'
import { StoreInfoSection } from '@/features/home/components/StoreInfoSection'
import { CtaSection } from '@/features/home/components/CtaSection'

export const Route = createFileRoute('/_public/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <AboutSection />
      <StoreInfoSection />
      <CtaSection />
    </>
  )
}
