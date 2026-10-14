import type { Testimonial } from '@/lib/company';
import TestimonialCard from './TestimonialCard';
import TestimonialCarousel from './LazyTestimonialCarousel';

// Below this many comments a static grid reads better than a rotating slider.
const MIN_FOR_SLIDER = 3;

/**
 * Client comments: a server-rendered grid for one or two, otherwise the rotating carousel.
 * Keeping the grid on the server means its pages do not download the animation library.
 */
export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const count = testimonials.length;
  if (count === 0) return null;

  if (count >= MIN_FOR_SLIDER) return <TestimonialCarousel testimonials={testimonials} />;

  return (
    <div className={`mx-auto grid grid-cols-1 gap-6 ${count === 2 ? 'md:grid-cols-2 max-w-4xl' : 'max-w-xl'}`}>
      {testimonials.map((t) => (
        <TestimonialCard key={t.id} testimonial={t} className="h-full" />
      ))}
    </div>
  );
}
