import { Section, SectionHeading } from '@/components/ui/primitives';
import Reveal from '@/components/ui/Reveal';
import { process } from '@/lib/company';

export default function ProcessSection() {
  return (
    <Section id="process" tone="muted" aria-labelledby="process-heading">
      <SectionHeading
        eyebrow="How we work"
        title={<span id="process-heading">A clear process from idea to launch</span>}
        description="Five steps, each with a concrete deliverable, so you always know what happens next."
      />

      <ol className="relative grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
        {/* Connector line on desktop */}
        <div
          className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0"
          aria-hidden
        />
        {process.map((step, i) => (
          <li key={step.title} className="relative">
            <Reveal delay={i * 0.08} className="flex md:flex-col gap-5 md:gap-0 md:text-center">
              <div className="relative z-10 shrink-0 md:mx-auto w-12 h-12 rounded-full bg-black border border-primary/50 text-primary font-bold flex items-center justify-center shadow-[0_0_24px_rgba(255,215,0,0.15)]">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="md:mt-6">
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{step.description}</p>
                <p className="mt-3 inline-block text-xs font-medium text-primary/90 bg-primary/10 rounded-full px-3 py-1">
                  {step.deliverable}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
