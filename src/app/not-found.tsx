import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/primitives';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-black px-4 pt-32 pb-20 text-center">
      <div>
        <p className="text-primary font-mono text-sm">404</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">Page not found</h1>
        <p className="mt-4 text-gray-400">The page you are looking for has moved or does not exist.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
