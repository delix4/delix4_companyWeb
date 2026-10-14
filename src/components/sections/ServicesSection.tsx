import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Section, SectionHeading, Tag } from '@/components/ui/primitives';
import Reveal from '@/components/ui/Reveal';
import ServiceIcon from './ServiceIcon';
import { coreServices } from '@/lib/services';

export default function ServicesSection() {
  return (
    <Section id="services" aria-labelledby="services-heading">
      <SectionHeading
        eyebrow="What we do"
        title={<span id="services-heading">Three things, done properly</span>}
        description="We focus on web, mobile and AI so every project gets deep expertise — not a generalist doing everything."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {coreServices.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.08} className="h-full">
            <article className="group h-full flex flex-col rounded-2xl border border-line bg-card p-7 md:p-8 transition-colors duration-300 hover:border-primary/40 hover:bg-subtle">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-link flex items-center justify-center mb-6 transition-colors group-hover:bg-primary group-hover:text-white">
                <ServiceIcon slug={service.slug} className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-heading">{service.name}</h3>
              <p className="mt-3 text-muted leading-relaxed">{service.summary}</p>

              <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-subtle-fg">
                What we build
              </h4>
              <ul className="mt-3 space-y-2">
                {service.whatWeBuild.slice(0, 4).map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-body">
                    <Check className="h-4 w-4 text-link shrink-0 mt-0.5" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Extra detail is skipped on phones to keep the page short; it is on each service page. */}
              <div className="hidden sm:block">
                <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-subtle-fg">
                  Business benefits
                </h4>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {service.benefits.map((b) => (
                    <li key={b.title}>
                      <span className="text-heading font-medium">{b.title}</span> — {b.description}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {service.technologies.slice(0, 5).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="mt-6 pt-5 sm:mt-8 sm:pt-6 border-t border-line inline-flex items-center gap-2 text-link font-medium hover:text-link-hover"
              >
                Explore {service.name.toLowerCase()}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
