import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/primitives';
import ServiceIcon from '@/components/sections/ServiceIcon';
import ProcessSection from '@/components/sections/ProcessSection';
import CTASection from '@/components/sections/CTASection';
import { services } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Software Development Services – Web, Mobile & AI',
  description:
    'Explore Delix4 services: web development, mobile app development, AI & machine learning solutions and custom software development for startups and businesses.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: 'Services', href: '/services' }]}
        title="Software development services"
        description="We specialise in three areas — web, mobile and AI — and bring them together when your product needs more than one."
      />
      <Section className="pt-0! md:pt-0!">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/3 p-8 hover:border-primary/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                <ServiceIcon slug={s.slug} className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-white">{s.name}</h2>
              <p className="mt-3 text-gray-400 leading-relaxed flex-1">{s.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-primary font-medium">
                Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <ProcessSection />
      <CTASection />
    </>
  );
}
