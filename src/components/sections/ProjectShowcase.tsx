'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { serviceOptions } from '@/lib/case-studies';
import CaseStudyCard, { type CardProject } from './CaseStudyCard';

/** Filterable, animated grid of projects for the Work page. */
export default function ProjectShowcase({ projects }: { projects: CardProject[] }) {
  const [filter, setFilter] = useState<string>('all');

  const filters = useMemo(() => {
    const present = serviceOptions.filter((s) => projects.some((p) => p.service === s.value));
    return [
      { value: 'all', label: 'All work', count: projects.length },
      ...present.map((s) => ({ ...s, count: projects.filter((p) => p.service === s.value).length })),
    ];
  }, [projects]);

  const visible = filter === 'all' ? projects : projects.filter((p) => p.service === filter);
  // Keep one or two cards centred instead of stuck to the left of a three-column grid.
  const grid =
    visible.length === 1
      ? 'max-w-sm mx-auto'
      : visible.length === 2
        ? 'sm:grid-cols-2 max-w-3xl mx-auto'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <MotionConfig reducedMotion="user">
      {filters.length > 2 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
          {filters.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.value)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? 'text-white' : 'text-body hover:text-heading bg-card border border-line'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="showcase-filter"
                    className="absolute inset-0 rounded-full bg-primary shadow-lg shadow-primary/25"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {f.label} <span className={active ? 'text-white/70' : 'text-subtle-fg'}>{f.count}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      <motion.ul layout className={`grid grid-cols-1 gap-5 ${grid}`}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <CaseStudyCard project={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </MotionConfig>
  );
}
