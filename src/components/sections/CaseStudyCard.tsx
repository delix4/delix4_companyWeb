import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Images, Star } from 'lucide-react';
import ServiceIcon from './ServiceIcon';
import { projectTypeLabel, type CaseStudy } from '@/lib/case-studies';

/** The fields a project card needs, so client components can receive a slim copy. */
export type CardProject = Pick<
  CaseStudy,
  'slug' | 'name' | 'type' | 'category' | 'service' | 'year' | 'featured' | 'tagline' | 'technologies' | 'client'
> & { cover?: { src: string; alt: string }; imageCount: number };

export const toCardProject = (p: CaseStudy): CardProject => ({
  slug: p.slug,
  name: p.name,
  type: p.type,
  category: p.category,
  service: p.service,
  year: p.year,
  featured: p.featured,
  tagline: p.tagline,
  technologies: p.technologies,
  client: p.client,
  cover: p.screenshots[0],
  imageCount: p.screenshots.length,
});

export function ProjectTypeBadge({ type }: { type: CaseStudy['type'] }) {
  const isClient = type === 'client';
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
        isClient ? 'bg-green-500/10 text-green-700 border-green-500/30' : 'bg-subtle text-body border-line-strong'
      }`}
    >
      {projectTypeLabel[type]}
    </span>
  );
}

/**
 * Project image on a soft brand backdrop. `object-contain` keeps logos and screenshots whole
 * instead of cropping them; projects without images get a branded icon tile.
 */
export function CaseStudyCover({
  cover,
  service,
  priority = false,
  sizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
}: {
  cover?: { src: string; alt: string };
  service: CaseStudy['service'];
  priority?: boolean;
  sizes?: string;
}) {
  if (cover) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#eaf1ff] via-[#f4f7fb] to-[#e3f8ff]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(0,212,255,0.18),transparent_55%)]" />
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain p-5 drop-shadow-[0_12px_24px_rgba(11,31,58,0.18)] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink via-[#0f2d5c] to-primary">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,212,255,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <ServiceIcon slug={service} className="relative h-12 w-12 text-accent/80 transition-transform duration-500 group-hover:scale-110" />
    </div>
  );
}

/** Compact, branded project card used on the homepage, the Work page and service pages. */
export default function CaseStudyCard({ project: p }: { project: CardProject }) {
  const href = `/case-studies/${p.slug}`;
  return (
    <article className="group relative h-full flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-sm shadow-ink/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line-soft">
        <CaseStudyCover cover={p.cover} service={p.service} />
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          {p.featured ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-white shadow-md shadow-primary/30">
              <Star className="h-3 w-3 fill-current" aria-hidden /> Featured
            </span>
          ) : (
            <span />
          )}
          {p.imageCount > 1 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-ink/80 px-2 py-1 text-[11px] font-medium text-white">
              <Images className="h-3 w-3" aria-hidden /> {p.imageCount}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <ProjectTypeBadge type={p.type} />
          <span className="text-[11px] text-subtle-fg">
            {p.category} · {p.year}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold text-heading leading-snug">
          {/* The stretched link makes the whole card clickable. */}
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {p.name}
          </Link>
        </h3>
        {p.client && <p className="mt-0.5 text-xs font-medium text-link">for {p.client}</p>}
        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">{p.tagline}</p>

        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5 min-w-0">
            {p.technologies.slice(0, 3).map((t) => (
              <li key={t} className="rounded-md bg-subtle px-2 py-0.5 text-[11px] text-body">
                {t}
              </li>
            ))}
          </ul>
          <span
            className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-link transition-colors group-hover:bg-primary group-hover:text-white"
            aria-hidden
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
