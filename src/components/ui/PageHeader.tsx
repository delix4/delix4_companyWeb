import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { JsonLd } from './primitives';
import { absoluteUrl } from '@/lib/site';

type Crumb = { name: string; href: string };

/** Top-of-page header for inner pages: breadcrumbs (with BreadcrumbList schema), H1 and intro. */
export default function PageHeader({
  title,
  description,
  eyebrow,
  breadcrumbs,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  breadcrumbs: Crumb[];
  children?: ReactNode;
}) {
  const crumbs = [{ name: 'Home', href: '/' }, ...breadcrumbs];

  return (
    <section className="relative overflow-hidden bg-black pt-32 md:pt-40 pb-14 md:pb-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: crumbs.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            item: absoluteUrl(c.href === '/' ? '' : c.href),
          })),
        }}
      />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] bg-primary/10 rounded-full blur-[120px] pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-gray-300">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.href} className="hover:text-white">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl">
          {eyebrow && <div className="mb-4">{eyebrow}</div>}
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight text-balance">{title}</h1>
          {description && <p className="mt-6 text-lg md:text-xl text-gray-400 leading-relaxed">{description}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
