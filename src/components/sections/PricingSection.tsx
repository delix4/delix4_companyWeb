import { Check } from 'lucide-react';
import { ButtonLink, Section, SectionHeading } from '@/components/ui/primitives';
import Reveal from '@/components/ui/Reveal';
import { packages } from '@/lib/company';

export default function PricingSection({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  return (
    <Section id="pricing" aria-labelledby="pricing-heading">
      <SectionHeading
        as={headingLevel}
        eyebrow="Packages"
        title={<span id="pricing-heading">Clear packages, honest quotes</span>}
        description="Every project is different, so we quote based on your actual scope. Here is what each package typically includes."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {packages.map((pkg, i) => (
          <Reveal key={pkg.name} delay={i * 0.06} className="h-full">
            <div
              className={`relative h-full flex flex-col rounded-2xl p-7 border ${
                pkg.highlighted
                  ? 'border-primary/60 bg-primary/4 shadow-[0_0_40px_rgba(255,215,0,0.08)]'
                  : 'border-white/10 bg-white/3'
              }`}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary text-black text-xs font-bold px-3 py-1">
                  Most requested
                </span>
              )}
              <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
              <p className="mt-2 text-sm text-gray-400 min-h-[2.5rem]">{pkg.description}</p>
              <div className="mt-6">
                {pkg.startingFrom ? (
                  <>
                    <span className="block text-xs uppercase tracking-wider text-gray-500">Starting from</span>
                    <span className="text-3xl font-bold text-white">{pkg.startingFrom}</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-white">Custom quote</span>
                )}
                <span className="block mt-1 text-sm text-gray-500">{pkg.timeline}</span>
              </div>
              <ul className="mt-6 space-y-2.5 flex-1">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-300">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href="/contact"
                variant={pkg.highlighted ? 'primary' : 'secondary'}
                size="md"
                className="mt-8 w-full"
              >
                Request a Quote
              </ButtonLink>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-gray-500">
        Free initial consultation · Itemised estimate · You own the code
      </p>
    </Section>
  );
}
