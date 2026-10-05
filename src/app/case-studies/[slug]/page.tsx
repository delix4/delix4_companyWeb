import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { JsonLd, Section, Tag } from '@/components/ui/primitives';
import { CaseStudyCover, ProjectTypeBadge } from '@/components/sections/CaseStudyCard';
import CTASection from '@/components/sections/CTASection';
import { caseStudies, getCaseStudy } from '@/lib/case-studies';
import { getService } from '@/lib/services';
import { site } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<'/case-studies/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.name} – Case Study`,
    description: study.metaDescription,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      type: 'article',
      title: `${study.name} – Case Study | Delix4`,
      description: study.metaDescription,
      url: `/case-studies/${study.slug}`,
      images: study.screenshots[0] ? [{ url: study.screenshots[0].src, alt: study.screenshots[0].alt }] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<'/case-studies/[slug]'>) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const service = getService(study.service);
  const next = caseStudies[(caseStudies.indexOf(study) + 1) % caseStudies.length];

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: study.name,
          headline: `${study.name} – Case Study`,
          description: study.metaDescription,
          url: `${site.url}/case-studies/${study.slug}`,
          dateCreated: String(study.year),
          keywords: study.technologies.join(', '),
          creator: { '@id': `${site.url}/#organization` },
        }}
      />
      <PageHeader
        breadcrumbs={[
          { name: 'Case Studies', href: '/case-studies' },
          { name: study.name, href: `/case-studies/${study.slug}` },
        ]}
        eyebrow={
          <div className="flex flex-wrap items-center gap-3">
            <ProjectTypeBadge type={study.type} />
            <span className="text-sm text-gray-500">
              {study.category} · {study.year}
            </span>
          </div>
        }
        title={study.name}
        description={study.tagline}
      />

      {study.screenshots.length > 0 && (
        <div className="bg-black px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-7xl mx-auto aspect-[21/9] min-h-[220px] rounded-3xl overflow-hidden border border-white/10">
            <CaseStudyCover study={study} priority />
          </div>
        </div>
      )}

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16">
          <div className="space-y-14">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">The problem</h2>
              <p className="mt-4 text-xl text-gray-300 leading-relaxed">{study.problem}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">Our solution</h2>
              <p className="mt-4 text-xl text-gray-300 leading-relaxed">{study.solution}</p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Key features</h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {study.features.map((f) => (
                  <div key={f.title} className="rounded-2xl border border-white/10 bg-white/3 p-6">
                    <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                    <p className="mt-2 text-gray-400 leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 self-start space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Technologies</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {study.technologies.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              {service && (
                <>
                  <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-gray-500">Service</h2>
                  <Link href={`/services/${service.slug}`} className="mt-2 inline-flex items-center gap-1.5 text-primary hover:text-yellow-300">
                    {service.name} <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </>
              )}
              {study.links?.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center gap-2 text-gray-300 hover:text-primary">
                  <ExternalLink className="h-4 w-4" aria-hidden /> {l.label}
                </a>
              ))}
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <h2 className="text-lg font-bold text-white">Building something similar?</h2>
              <p className="mt-2 text-sm text-gray-400">We will reply {site.responseTime} with honest feedback on your idea.</p>
              <Link
                href={`/contact?service=${study.service}`}
                className="mt-5 inline-flex w-full justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-300"
              >
                Start Your Project
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      {study.architecture && (
        <Section tone="muted">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Architecture</h2>
          <p className="mt-3 text-gray-400 max-w-2xl">How the main components fit together.</p>
          <ol className="mt-10 flex flex-col lg:flex-row lg:items-stretch gap-3">
            {study.architecture.map((layer, i) => (
              <li key={layer.label} className="flex flex-col lg:flex-row items-center gap-3 flex-1">
                <div className="w-full h-full rounded-2xl border border-white/10 bg-black p-5">
                  <span className="text-xs font-mono text-primary">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 font-semibold text-white">{layer.label}</h3>
                  <p className="mt-1.5 text-sm text-gray-400">{layer.detail}</p>
                </div>
                {i < study.architecture!.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-primary/60 shrink-0 rotate-90 lg:rotate-0" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </Section>
      )}

      {(study.metrics.length > 0 || study.outcomes.length > 0) && (
        <Section>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Results</h2>
          {study.metrics.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {study.metrics.map((m) => (
                <div key={m.label} className="flex flex-col-reverse rounded-2xl border border-white/10 bg-white/3 p-6">
                  <dt className="mt-2 text-sm text-gray-400">{m.label}</dt>
                  <dd className="text-4xl font-bold text-primary">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {study.outcomes.map((o) => (
              <li key={o} className="rounded-2xl border border-white/10 bg-white/3 p-6 text-gray-300">
                {o}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {study.screenshots.length > 0 && (
        <Section tone="muted">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Screenshots</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {study.screenshots.map((s) => (
              <div key={s.src} className="relative aspect-[9/16] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
                <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Section>
      )}

      {next.slug !== study.slug && (
        <Section className="py-12! md:py-16!">
          <Link
            href={`/case-studies/${next.slug}`}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 p-7 hover:border-primary/40"
          >
            <span>
              <span className="block text-sm text-gray-500">Next case study</span>
              <span className="block mt-1 text-2xl font-bold text-white group-hover:text-primary">{next.name}</span>
            </span>
            <ArrowRight className="h-6 w-6 text-primary transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Section>
      )}

      <CTASection />
    </>
  );
}
