import { Compass, MessagesSquare, ShieldCheck, Target, Telescope, Wrench } from 'lucide-react';
import { ButtonLink, Section, SectionHeading } from '@/components/ui/primitives';
import Reveal from '@/components/ui/Reveal';
import TeamGrid from './TeamGrid';

export const differentiators = [
  {
    icon: MessagesSquare,
    title: 'Direct communication',
    description:
      'You talk to the engineers building your product — no account managers or layers in between.',
  },
  {
    icon: Wrench,
    title: 'High-quality engineering',
    description:
      'Typed code, automated checks, security hardening and documentation are standard on every project.',
  },
  {
    icon: ShieldCheck,
    title: 'Honest scoping',
    description:
      'Clear estimates, realistic timelines and no inflated promises. If something is not a good fit, we say so.',
  },
];

export function MissionVision() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-white/10 bg-white/3 p-7">
        <Target className="h-6 w-6 text-primary" aria-hidden />
        <h3 className="mt-4 text-xl font-bold text-white">Our mission</h3>
        <p className="mt-2 text-gray-400 leading-relaxed">
          To help startups and businesses turn ideas into reliable digital products — built with
          care, delivered on time and designed to grow with them.
        </p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/3 p-7">
        <Telescope className="h-6 w-6 text-primary" aria-hidden />
        <h3 className="mt-4 text-xl font-bold text-white">Our vision</h3>
        <p className="mt-2 text-gray-400 leading-relaxed">
          To be the engineering partner growing companies trust for web, mobile and AI — known for
          quality work and straightforward communication.
        </p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <Section id="about" aria-labelledby="about-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <SectionHeading
            align="left"
            eyebrow="About Delix4"
            title={<span id="about-heading">Small team. Direct communication. High-quality engineering.</span>}
          />
          <div className="-mt-6 space-y-4 text-gray-400 text-lg leading-relaxed">
            <p>
              Delix4 is a software development company based in Colombo, Sri Lanka, working with
              clients worldwide. We design and build web applications, mobile apps and AI-powered
              products for startups and growing businesses.
            </p>
            <p>
              Being a focused team is a deliberate choice. It means you work directly with the
              people writing your code, decisions happen quickly, and every project gets senior
              attention from start to finish.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/about" variant="secondary" arrow>
              More about us
            </ButtonLink>
          </div>
        </div>

        <div className="space-y-4">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.08}>
              <div className="flex gap-5 rounded-2xl border border-white/10 bg-white/3 p-6">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <d.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{d.title}</h3>
                  <p className="mt-1 text-gray-400 leading-relaxed">{d.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.24}>
            <div className="flex gap-5 rounded-2xl border border-white/10 bg-white/3 p-6">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Compass className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Product thinking</h3>
                <p className="mt-1 text-gray-400 leading-relaxed">
                  We care about business outcomes, not just shipping features — and will challenge
                  ideas that do not serve your users.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <TeamGrid className="mt-20" />
    </Section>
  );
}
