import { Bot, Brain, Eye, LineChart, Plug, Workflow } from 'lucide-react';
import { ButtonLink, Section, SectionHeading } from '@/components/ui/primitives';
import Reveal from '@/components/ui/Reveal';
import { getCaseStudy } from '@/lib/case-studies';

const capabilities = [
  {
    icon: Brain,
    title: 'Machine Learning',
    description: 'Custom models trained and evaluated on your data, from gradient boosting to deep learning.',
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    description: 'Image classification and detection that runs efficiently, even on mobile devices.',
  },
  {
    icon: LineChart,
    title: 'Predictive Analytics',
    description: 'Forecast demand, behaviour or risk so you can act before problems appear.',
  },
  {
    icon: Bot,
    title: 'AI-Powered Applications',
    description: 'Web and mobile products with intelligence built into the core experience.',
  },
  {
    icon: Plug,
    title: 'AI API Integration',
    description: 'Connect LLMs and AI services to your product for chat, search and summarisation.',
  },
  {
    icon: Workflow,
    title: 'Automation',
    description: 'Replace repetitive manual steps with reliable, monitored data pipelines.',
  },
];

export default function AISection() {
  const hydration = getCaseStudy('ai-hydration-monitoring');

  return (
    <Section id="ai" aria-labelledby="ai-heading" className="overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] pointer-events-none" aria-hidden />
      <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            align="left"
            eyebrow="AI solutions"
            title={<span id="ai-heading">Practical AI that solves real problems</span>}
            description="We go beyond demos. Our team designs, trains and deploys machine learning models inside products people use every day."
          />

          {hydration && (
            <div className="rounded-2xl border border-primary/20 bg-primary/4 p-6 -mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">In practice</p>
              <h3 className="mt-2 text-lg font-bold text-white">{hydration.name}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                Two models working together: <span className="text-white">XGBoost</span>{" "}forecasts
                each user&apos;s hydration needs, while a <span className="text-white">MobileNetV2</span>{' '}
                vision model detects signs of dehydration from a lip photo.
              </p>
              {hydration.metrics.length > 0 && (
                <dl className="mt-4 grid grid-cols-2 gap-4">
                  {hydration.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col-reverse">
                      <dt className="text-xs text-gray-500">{m.label}</dt>
                      <dd className="text-2xl font-bold text-white">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <ButtonLink href={`/case-studies/${hydration.slug}`} variant="ghost" arrow className="mt-4">
                See how we built it
              </ButtonLink>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/3 p-6 hover:border-primary/40 transition-colors">
                <c.icon className="h-6 w-6 text-primary" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{c.description}</p>
              </div>
            </Reveal>
          ))}
          <div className="sm:col-span-2 mt-2">
            <ButtonLink href="/services/ai-development" variant="secondary" arrow>
              Explore AI development
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
