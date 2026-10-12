'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { Testimonial } from '@/lib/company';
import TestimonialCard, { Stars } from './TestimonialCard';

const INTERVAL_MS = 6000;
// Below this many comments a static grid reads better than a rotating slider.
const MIN_FOR_SLIDER = 3;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/**
 * Client comments: a grid for one or two, otherwise a slider that shows one comment at a time,
 * rotates every few seconds, pauses on hover, focus or a hidden tab, and never auto-plays
 * for visitors who prefer reduced motion.
 */
export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const count = testimonials.length;
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (by: number) => {
      setDirection(by);
      setIndex((i) => (i + by + count) % count);
    },
    [count]
  );

  const autoplay = count >= MIN_FOR_SLIDER && !paused && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') go(1);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [autoplay, go, index]);

  if (count === 0) return null;

  if (count < MIN_FOR_SLIDER) {
    return (
      <div className={`mx-auto grid grid-cols-1 gap-6 ${count === 2 ? 'md:grid-cols-2 max-w-4xl' : 'max-w-xl'}`}>
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} className="h-full" />
        ))}
      </div>
    );
  }

  const t = testimonials[index];
  const byline = [t.role, t.company].filter(Boolean).join(', ');

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Client comments"
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div className="relative overflow-hidden rounded-3xl border border-line bg-card shadow-xl shadow-ink/5">
        <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl" aria-hidden />
        <Quote className="absolute top-8 left-8 h-14 w-14 text-primary/10" aria-hidden />

        {/* Announce changes only when the visitor moves the slider, not on every auto-rotation. */}
        <div aria-live={autoplay ? 'off' : 'polite'} className="relative min-h-[300px] sm:min-h-[260px] grid">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.figure
              key={t.id}
              custom={direction}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              className="col-start-1 row-start-1 flex flex-col items-center justify-center px-6 py-10 sm:px-14 text-center"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              drag={reduceMotion ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
            >
              <Stars rating={t.rating} className="h-5 w-5" />
              <blockquote className="mt-5 text-lg sm:text-xl text-heading leading-relaxed font-medium text-balance">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 text-left">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white"
                  aria-hidden
                >
                  {initials(t.name)}
                </span>
                <span className="text-sm">
                  <span className="block font-semibold text-heading">{t.name}</span>
                  {byline && <span className="block text-subtle-fg">{byline}</span>}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Progress bar for the current slide while auto-playing. */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-line-soft" aria-hidden>
          {autoplay && (
            <motion.div
              key={`${index}-progress`}
              className="h-full bg-gradient-to-r from-primary to-accent origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
            />
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-card text-body hover:border-primary hover:text-link transition-colors"
          aria-label="Previous comment"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Show comment ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-7 bg-primary' : 'w-2.5 bg-line-strong hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-card text-body hover:border-primary hover:text-link transition-colors"
          aria-label="Next comment"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </section>
  );
}
