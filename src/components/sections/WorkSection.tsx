import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ButtonLink, Section, SectionHeading } from '@/components/ui/primitives';
import Reveal from '@/components/ui/Reveal';
import CaseStudyCard, { toCardProject } from './CaseStudyCard';
import { getPublishedProjects } from '@/lib/content';

// Grid and width per number of cards, so one or two projects still sit centred and compact.
const layout: Record<number, string> = {
  2: 'sm:grid-cols-2 max-w-3xl',
  3: 'sm:grid-cols-2 lg:grid-cols-3 max-w-5xl',
  4: 'sm:grid-cols-2 lg:grid-cols-4 max-w-7xl',
};

export default async function WorkSection() {
  const projects = (await getPublishedProjects()).slice(0, 3);
  if (projects.length === 0) return null;
  const cards = projects.length + 1;

  return (
    <Section id="work" tone="muted" aria-labelledby="work-heading">
      <SectionHeading
        eyebrow="Our work"
        title={<span id="work-heading">Products we have built</span>}
        description="Web, mobile and AI products — each labelled honestly as client work, in-house or R&D."
      />

      <div className={`mx-auto grid grid-cols-1 gap-5 ${layout[cards]}`}>
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06} className="h-full">
            <CaseStudyCard project={toCardProject(p)} />
          </Reveal>
        ))}
        <Reveal delay={projects.length * 0.06} className="h-full">
          <div className="theme-dark relative h-full min-h-[300px] overflow-hidden rounded-2xl bg-gradient-to-br from-ink via-[#0f2d5c] to-primary p-6 flex flex-col">
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent/25 blur-3xl" aria-hidden />
            <Image src="/tablogo.png" alt="" width={192} height={192} className="relative h-12 w-12 rounded-xl ring-1 ring-white/15" />
            <h3 className="relative mt-auto text-xl font-bold text-heading">Your project could be next</h3>
            <p className="relative mt-2 text-sm text-body leading-relaxed">
              Tell us what you want to build. We reply within 24 hours.
            </p>
            <Link
              href="/contact"
              className="relative mt-5 inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-accent transition-colors"
            >
              Start your project <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="mt-10 text-center">
        <ButtonLink href="/case-studies" variant="secondary" size="md" arrow>
          View all projects
        </ButtonLink>
      </div>
    </Section>
  );
}
