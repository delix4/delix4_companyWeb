import { MessageCircle } from 'lucide-react';
import { ButtonLink } from '@/components/ui/primitives';
import { site } from '@/lib/site';

export default function CTASection({
  title = 'Have a project in mind?',
  description = `Tell us what you are building. We reply ${site.responseTime} with honest feedback and next steps — no obligation.`,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-black py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-gray-950 to-black px-6 py-14 md:px-16 md:py-16 text-center">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] bg-primary/15 rounded-full blur-[100px] pointer-events-none" aria-hidden />
          <h2 className="relative text-3xl md:text-5xl font-bold text-white tracking-tight text-balance">{title}</h2>
          <p className="relative mt-5 text-lg text-gray-300 max-w-2xl mx-auto">{description}</p>
          <div className="relative mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonLink href="/contact" arrow>
              Start Your Project
            </ButtonLink>
            <ButtonLink href={site.whatsappHref} variant="secondary" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden /> Chat on WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
