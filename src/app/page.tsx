import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import TechStack from '@/components/TechStack';
import ServicesSection from '@/components/sections/ServicesSection';
import WorkSection from '@/components/sections/WorkSection';
import AISection from '@/components/sections/AISection';
import ProcessSection from '@/components/sections/ProcessSection';
import AboutSection from '@/components/sections/AboutSection';
import TrustSection from '@/components/sections/TrustSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

// Order follows the visitor's questions: what you do → proof → how → why trust → cost → contact.
export default function Home() {
  return (
    <>
      <HeroSection />
      <TechStack />
      <ServicesSection />
      <WorkSection />
      <AISection />
      <ProcessSection />
      <AboutSection />
      <TrustSection />
      <PricingSection />
      <FAQSection tone="default" />
      <ContactSection />
    </>
  );
}
