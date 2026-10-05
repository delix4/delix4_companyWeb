import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ButtonLink, Section, SectionHeading, Tag } from '@/components/ui/primitives';
import Reveal from '@/components/ui/Reveal';
import CaseStudyCard, { CaseStudyCover, ProjectTypeBadge } from './CaseStudyCard';
import { caseStudies, featuredCaseStudy } from '@/lib/case-studies';

export default function WorkSection() {
  const featured = featuredCaseStudy;
  const others = caseStudies.filter((c) => c.slug !== featured.slug);

  return (
    <Section id="work" tone="muted" aria-labelledby="work-heading">
      <SectionHeading
        eyebrow="Our work"
        title={<span id="work-heading">Products we have built</span>}
        description="Every project is labelled honestly — client work, in-house products and R&D — so you know exactly what you are looking at."
      />

      <Reveal>
        <article className="group grid grid-cols-1 lg:grid-cols-2 rounded-3xl border border-white/10 bg-black overflow-hidden hover:border-primary/40 transition-colors">
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
            <CaseStudyCover study={featured} />
            <span className="absolute top-5 left-5 rounded-full bg-primary text-black text-xs font-bold px-3 py-1">
              Flagship AI project
            </span>
          </div>
          <div className="p-7 md:p-10 flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <ProjectTypeBadge type={featured.type} />
              <span className="text-xs text-gray-500">
                {featured.category} · {featured.year}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">{featured.name}</h3>
            <p className="mt-4 text-gray-400 leading-relaxed">{featured.tagline}</p>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">Problem</dt>
                <dd className="mt-1.5 text-sm text-gray-300 line-clamp-4">{featured.problem}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">Solution</dt>
                <dd className="mt-1.5 text-sm text-gray-300 line-clamp-4">{featured.solution}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              {featured.technologies.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <ButtonLink href={`/case-studies/${featured.slug}`} arrow>
                Read the full case study
              </ButtonLink>
            </div>
          </div>
        </article>
      </Reveal>

      {others.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {others.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.08} className="h-full">
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
          <Reveal delay={0.1} className="h-full">
            <div className="h-full flex flex-col justify-center rounded-2xl border border-dashed border-white/15 p-8 text-center">
              <h3 className="text-xl font-bold text-white">Your project could be next</h3>
              <p className="mt-3 text-gray-400">
                Tell us what you want to build and we will reply with next steps within 24 hours.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center gap-2 text-primary font-medium hover:text-yellow-300"
              >
                Start your project <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      )}

      <div className="mt-12 text-center">
        <ButtonLink href="/case-studies" variant="secondary" arrow>
          View all case studies
        </ButtonLink>
      </div>
    </Section>
  );
}
