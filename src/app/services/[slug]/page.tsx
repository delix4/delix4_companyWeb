import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { ButtonLink, JsonLd, Section, SectionHeading, Tag } from '@/components/ui/primitives';
import ServiceIcon from '@/components/sections/ServiceIcon';
import CaseStudyCard from '@/components/sections/CaseStudyCard';
import ProcessSection from '@/components/sections/ProcessSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { getService, services } from '@/lib/services';
import { getCaseStudy, type CaseStudy } from '@/lib/case-studies';
import { site } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.metaTitle} | Delix4`,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps<'/services/[slug]'>) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.relatedCaseStudies
    .map(getCaseStudy)
    .filter((c): c is CaseStudy => Boolean(c));
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.name,
          serviceType: service.name,
          description: service.metaDescription,
          url: `${site.url}/services/${service.slug}`,
          provider: { '@id': `${site.url}/#organization` },
          areaServed: 'Worldwide',
        }}
      />
      <PageHeader
        breadcrumbs={[
          { name: 'Services', href: '/services' },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
        eyebrow={
          <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest">
            <ServiceIcon slug={service.slug} className="h-4 w-4" /> {service.name}
          </span>
        }
        title={service.headline}
        description={service.intro}
      >
        <div className="mt-9 flex flex-col sm:flex-row gap-3">
          <ButtonLink href={`/contact?service=${service.slug}`} arrow>
            Start Your Project
          </ButtonLink>
          <ButtonLink href="/case-studies" variant="secondary">
            View Our Work
          </ButtonLink>
        </div>
      </PageHeader>

      <Section tone="muted">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white">What we build</h2>
            <ul className="mt-6 space-y-3">
              {service.whatWeBuild.map((item) => (
                <li key={item} className="flex gap-3 text-gray-300 text-lg">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-1" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Key technologies
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.technologies.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Typical use cases</h2>
            <ul className="mt-6 space-y-4">
              {service.useCases.map((u) => (
                <li key={u} className="rounded-2xl border border-white/10 bg-black p-5 text-gray-300">
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Outcomes" title="What you get" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-white/10 bg-white/3 p-7">
              <h3 className="text-xl font-bold text-white">{b.title}</h3>
              <p className="mt-3 text-gray-400 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="muted">
          <SectionHeading eyebrow="Related work" title="See it in practice" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </Section>
      )}

      <ProcessSection />
      <FAQSection tone="default" />

      <Section tone="muted" className="py-14! md:py-16!">
        <h2 className="text-xl font-bold text-white">Other services</h2>
        <ul className="mt-5 flex flex-wrap gap-3">
          {otherServices.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-gray-300 hover:text-primary hover:border-primary/40"
              >
                <ServiceIcon slug={s.slug} className="h-4 w-4" /> {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTASection title={`Planning a ${service.name.toLowerCase()} project?`} />
    </>
  );
}
