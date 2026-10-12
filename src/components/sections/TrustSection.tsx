import { Award, Github, Linkedin } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/primitives';
import Reveal from '@/components/ui/Reveal';
import { achievements, stats } from '@/lib/company';
import { getPublishedTestimonials } from '@/lib/content';
import TestimonialSlider from './TestimonialSlider';
import { site } from '@/lib/site';

const technologies = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'Flutter', 'Python',
  'XGBoost', 'Firebase', 'Supabase', 'AWS', 'Docker', 'Tailwind CSS',
];

export default async function TrustSection() {
  const testimonials = await getPublishedTestimonials();
  return (
    <Section id="why-us" tone="muted" aria-labelledby="trust-heading">
      <SectionHeading
        eyebrow="Why Delix4"
        title={<span id="trust-heading">Built on transparency</span>}
        description="No inflated numbers or borrowed logos. Here is exactly where we stand."
      />

      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className="flex flex-col-reverse rounded-2xl border border-line bg-page p-6 text-center">
              <dt className="mt-2 text-sm text-muted">{s.label}</dt>
              <dd className="text-4xl font-bold text-heading">{s.value}</dd>
            </div>
          </Reveal>
        ))}
      </dl>

      {testimonials.length > 0 && (
        <div className="mt-12">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-link">What our clients say</h3>
          <Reveal className="mt-6">
            <TestimonialSlider testimonials={testimonials} />
          </Reveal>
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="rounded-2xl border border-line bg-page p-7">
          <h3 className="text-lg font-semibold text-heading">Technologies we work with</h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {technologies.map((t) => (
              <li key={t} className="rounded-lg border border-line bg-card px-3 py-1.5 text-sm text-body">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-page p-7">
          <h3 className="text-lg font-semibold text-heading">Verify us</h3>
          <p className="mt-2 text-sm text-muted">See our work and updates on our public profiles.</p>
          <div className="mt-5 flex flex-col gap-3">
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-body hover:text-link">
              <Linkedin className="h-5 w-5" aria-hidden /> LinkedIn company page
            </a>
            {site.social.github && (
              <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-body hover:text-link">
                <Github className="h-5 w-5" aria-hidden /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {achievements.length > 0 && (
        <div className="mt-6 rounded-2xl border border-line bg-page p-7">
          <h3 className="text-lg font-semibold text-heading">Certifications, awards & research</h3>
          <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((a) => (
              <li key={a.title} className="flex gap-3">
                <Award className="h-5 w-5 text-link shrink-0 mt-0.5" aria-hidden />
                <div>
                  {a.href ? (
                    <a href={a.href} target="_blank" rel="noopener noreferrer" className="text-heading hover:text-link">
                      {a.title}
                    </a>
                  ) : (
                    <span className="text-heading">{a.title}</span>
                  )}
                  <p className="text-sm text-subtle-fg">
                    {a.issuer} · {a.year}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
