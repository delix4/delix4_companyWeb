import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/primitives';
import { ContactDetails, ContactFormWithFallback } from '@/components/sections/ContactSection';
import FAQSection from '@/components/sections/FAQSection';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Us – Start Your Project',
  description: `Tell Delix4 about your web, mobile or AI project. Get a free consultation and a clear estimate — we reply ${site.responseTime}.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: 'Contact', href: '/contact' }]}
        title="Start your project"
        description={`Tell us what you are building. We reply ${site.responseTime} with questions, ideas and a clear estimate — no obligation.`}
      />
      <Section className="pt-0! md:pt-0!">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14">
          <ContactFormWithFallback />
          <div>
            <ContactDetails />
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-6">
              <h2 className="text-lg font-semibold text-white">What happens next?</h2>
              <ol className="mt-4 space-y-3 text-sm text-gray-400 list-decimal pl-5">
                <li>We review your message and reply {site.responseTime}.</li>
                <li>We schedule a short call to understand your goals.</li>
                <li>You receive a clear proposal with scope, timeline and cost.</li>
              </ol>
            </div>
          </div>
        </div>
      </Section>
      <FAQSection />
    </>
  );
}
