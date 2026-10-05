import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/primitives';
import CaseStudyCard from '@/components/sections/CaseStudyCard';
import CTASection from '@/components/sections/CTASection';
import { caseStudies, projectTypeLabel } from '@/lib/case-studies';

export const metadata: Metadata = {
  title: 'Case Studies – Web, Mobile & AI Projects',
  description:
    'Explore Delix4 case studies, including our flagship AI hydration monitoring app built with XGBoost and MobileNetV2 computer vision.',
  alternates: { canonical: '/case-studies' },
};

export default function CaseStudiesPage() {
  const sorted = [...caseStudies].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: 'Case Studies', href: '/case-studies' }]}
        title="Case studies"
        description="A closer look at the problems we solved, how we solved them and the technology behind each product."
      >
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
          {Object.entries(projectTypeLabel).map(([key, label]) => (
            <li key={key} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${key === 'client' ? 'bg-green-400' : 'bg-gray-400'}`} aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </PageHeader>
      <Section className="pt-0! md:pt-0!">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sorted.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </Section>
      <CTASection title="Want results like these?" />
    </>
  );
}
