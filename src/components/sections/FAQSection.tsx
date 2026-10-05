import { Plus } from 'lucide-react';
import { JsonLd, Section, SectionHeading } from '@/components/ui/primitives';
import { faqs } from '@/lib/company';

// Native <details> keeps the accordion accessible and JavaScript-free.
export default function FAQSection({ tone = 'muted' }: { tone?: 'default' | 'muted' }) {
  return (
    <Section id="faq" tone={tone} aria-labelledby="faq-heading">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }}
      />
      <SectionHeading
        eyebrow="FAQ"
        title={<span id="faq-heading">Questions clients often ask</span>}
      />
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={faq.question}
            open={i === 0}
            className="group rounded-2xl border border-white/10 bg-white/3 open:bg-white/5 transition-colors"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 text-left text-lg font-medium text-white [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span className="shrink-0 rounded-full bg-white/10 p-1 text-white transition-transform group-open:rotate-45 group-open:bg-primary group-open:text-black">
                <Plus className="h-4 w-4" aria-hidden />
              </span>
            </summary>
            <p className="px-6 pb-6 -mt-2 text-gray-400 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
