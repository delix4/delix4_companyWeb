import { Quote, Star } from 'lucide-react';
import type { Testimonial } from '@/lib/company';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${className} ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-line-strong'}`} aria-hidden />
      ))}
    </span>
  );
}

export default function TestimonialCard({ testimonial: t, className = '' }: { testimonial: Testimonial; className?: string }) {
  const byline = [t.role, t.company].filter(Boolean).join(', ');
  return (
    <figure className={`relative flex flex-col rounded-2xl border border-line bg-card p-7 shadow-sm shadow-ink/5 ${className}`}>
      <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" aria-hidden />
      <Stars rating={t.rating} />
      <blockquote className="mt-4 flex-1 text-lg text-body leading-relaxed">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white"
          aria-hidden
        >
          {initials(t.name)}
        </span>
        <span className="text-sm">
          <span className="block font-semibold text-heading">{t.name}</span>
          {byline && <span className="block text-subtle-fg">{byline}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
