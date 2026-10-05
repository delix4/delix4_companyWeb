import type { Metadata } from 'next';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Pricing & Packages – Websites, Apps and AI Solutions',
  description:
    'Delix4 service packages for business websites, web applications, mobile apps and AI solutions. Free consultation and a clear, itemised quote for every project.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <div className="pt-16">
      <PricingSection headingLevel="h1" />
      <FAQSection />
      <CTASection title="Not sure which package fits?" description="Tell us about your goals and we will recommend the right scope — and tell you honestly if you need less than you think." />
    </div>
  );
}
