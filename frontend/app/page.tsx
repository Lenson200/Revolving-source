import HeroSection from '@/components/revolvingsource/HeroSection'
import BusinessSections from '@/components/revolvingsource/BusinessSections'
import WhyChooseUs from '@/components/revolvingsource/WhyChooseUs'
import CTASection from '@/components/revolvingsource/CTASection'
import ContactSection from '@/components/revolvingsource/ContactSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <BusinessSections />
      <WhyChooseUs />
      <CTASection />
      <ContactSection />
    </>
  )
}