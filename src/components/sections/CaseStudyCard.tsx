import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Tag } from '@/components/ui/primitives';
import ServiceIcon from './ServiceIcon';
import { projectTypeLabel, type CaseStudy } from '@/lib/case-studies';

export function ProjectTypeBadge({ type }: { type: CaseStudy['type'] }) {
  const isClient = type === 'client';
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${
        isClient
          ? 'bg-green-500/10 text-green-300 border-green-500/30'
          : 'bg-white/5 text-gray-300 border-white/15'
      }`}
    >
      {projectTypeLabel[type]}
    </span>
  );
}

export function CaseStudyCover({ study, priority = false }: { study: CaseStudy; priority?: boolean }) {
  const cover = study.screenshots[0];
  if (cover) {
    return (
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }
  // Branded fallback until real screenshots are added.
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/15 via-gray-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.15),transparent_60%)]" />
      <ServiceIcon slug={study.service} className="relative h-16 w-16 text-primary/70" />
    </div>
  );
}

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group h-full flex flex-col rounded-2xl border border-white/10 bg-white/3 overflow-hidden transition-colors hover:border-primary/40">
      <Link href={`/case-studies/${study.slug}`} className="relative block aspect-[16/9] overflow-hidden" tabIndex={-1} aria-hidden>
        <CaseStudyCover study={study} />
      </Link>
      <div className="flex-1 flex flex-col p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <ProjectTypeBadge type={study.type} />
          <span className="text-xs text-gray-500">
            {study.category} · {study.year}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white">
          <Link href={`/case-studies/${study.slug}`} className="hover:text-primary transition-colors">
            {study.name}
          </Link>
        </h3>
        <p className="mt-3 text-gray-400 leading-relaxed">{study.tagline}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {study.technologies.slice(0, 4).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <Link
          href={`/case-studies/${study.slug}`}
          className="mt-auto pt-6 inline-flex items-center gap-1.5 text-primary font-medium hover:text-yellow-300"
        >
          Read case study <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
