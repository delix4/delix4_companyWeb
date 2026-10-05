import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import { Section, SectionHeading } from '@/components/ui/primitives';
import { differentiators, MissionVision } from '@/components/sections/AboutSection';
import TeamGrid from '@/components/sections/TeamGrid';
import TrustSection from '@/components/sections/TrustSection';
import ProcessSection from '@/components/sections/ProcessSection';
import CTASection from '@/components/sections/CTASection';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Delix4 – Software Development Team',
  description:
    'Delix4 is a focused software development team in Colombo, Sri Lanka, building web, mobile and AI products for clients worldwide. Small team, direct communication, high-quality engineering.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: 'About', href: '/about' }]}
        title="Small team. Direct communication. High-quality engineering."
        description={`Delix4 is a software development company founded in ${site.foundingYear} in ${site.location}. We build web applications, mobile apps and AI-powered products for startups and growing businesses around the world.`}
      />

      <Section className="pt-0! md:pt-0!">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-5 text-lg text-gray-400 leading-relaxed">
            <h2 className="text-3xl font-bold text-white">Who we are</h2>
            <p>
              We are engineers who enjoy building products that people actually use. Our work spans
              modern web platforms, cross-platform mobile apps and applied machine learning — from
              forecasting models to computer vision running on a phone.
            </p>
            <p>
              We deliberately stay focused. Instead of offering every possible service, we go deep
              on web, mobile and AI, and combine them when a product needs all three.
            </p>
            <p>
              Working with a smaller team means you speak directly with the people building your
              product. Decisions are fast, nothing gets lost between departments, and every project
              receives senior attention.
            </p>
          </div>
          <MissionVision />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="What makes us different" title="How we work with clients" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentiators.map((d) => (
            <div key={d.title} className="rounded-2xl border border-white/10 bg-black p-7">
              <d.icon className="h-6 w-6 text-primary" aria-hidden />
              <h3 className="mt-4 text-xl font-bold text-white">{d.title}</h3>
              <p className="mt-2 text-gray-400 leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
        <TeamGrid className="mt-20" />
      </Section>

      <ProcessSection />
      <TrustSection />
      <CTASection title="Let’s build something together" />
    </>
  );
}
