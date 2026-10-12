import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import { Section, SectionHeading } from '@/components/ui/primitives';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import { toCardProject } from '@/components/sections/CaseStudyCard';
import TestimonialSlider from '@/components/sections/TestimonialSlider';
import CTASection from '@/components/sections/CTASection';
import { getPublishedProjects, getPublishedTestimonials } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Our Work – Web, Mobile & AI Projects',
  description:
    'Explore projects built by Delix4: web platforms, mobile apps and AI solutions, with the problem, solution and technology behind each one.',
  alternates: { canonical: '/case-studies' },
};

export default async function CaseStudiesPage() {
  const [projects, testimonials] = await Promise.all([getPublishedProjects(), getPublishedTestimonials()]);

  // Send only what the cards need to the browser.
  const showcase = projects.map(toCardProject);

  const technologyCount = new Set(projects.flatMap((p) => p.technologies)).size;
  const stats = [
    { value: projects.length, label: projects.length === 1 ? 'Project' : 'Projects' },
    { value: technologyCount, label: 'Technologies' },
    ...(testimonials.length > 0 ? [{ value: testimonials.length, label: 'Client reviews' }] : []),
  ];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: 'Our Work', href: '/case-studies' }]}
        eyebrow={<p className="text-link font-semibold tracking-widest uppercase text-xs md:text-sm">Portfolio</p>}
        title={
          <>
            Products we have{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-600">designed &amp; built</span>
          </>
        }
        description="A closer look at the problems we solved, how we solved them and the technology behind each product. Every project is labelled honestly."
      >
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-xs uppercase tracking-wider text-subtle-fg mt-1">{s.label}</dt>
              <dd className="text-3xl font-bold text-heading">{s.value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <Section className="pt-0! md:pt-0!">
        {showcase.length > 0 ? (
          <ProjectShowcase projects={showcase} />
        ) : (
          <p className="rounded-2xl border border-dashed border-line-strong bg-card p-12 text-center text-muted">
            New projects are on the way. Check back soon.
          </p>
        )}
      </Section>

      {testimonials.length > 0 && (
        <Section tone="muted">
          <SectionHeading eyebrow="Client feedback" title="What our clients say" />
          <TestimonialSlider testimonials={testimonials} />
        </Section>
      )}

      <CTASection title="Want results like these?" />
    </>
  );
}
