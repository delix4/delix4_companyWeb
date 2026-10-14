'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

type Shot = { src: string; alt: string };

/** Screenshot grid that opens a full-screen, keyboard-friendly lightbox. */
export default function ScreenshotGallery({ shots }: { shots: Shot[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const count = shots.length;

  const step = useCallback((by: number) => setOpen((i) => (i === null ? i : (i + by + count) % count)), [count]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, step]);

  return (
    <MotionConfig reducedMotion="user">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shots.map((s, i) => (
          <li key={s.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-subtle"
              aria-label={`Open image ${i + 1} of ${count}: ${s.alt}`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/40 transition-colors">
                <Expand className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/95 backdrop-blur-sm p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              key={open}
              className="relative w-full h-full"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <Image src={shots[open].src} alt={shots[open].alt} fill sizes="100vw" className="object-contain" priority />
            </motion.div>

            <p className="absolute bottom-4 inset-x-0 text-center text-sm text-white/80 px-16">
              {shots[open].alt} · {open + 1} / {count}
            </p>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
              aria-label="Close"
              autoFocus
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
