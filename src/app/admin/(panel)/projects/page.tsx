import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Star } from 'lucide-react';
import { loadProjects } from '@/lib/content';
import { projectTypeLabel } from '@/lib/case-studies';
import ServiceIcon from '@/components/sections/ServiceIcon';
import ProjectRowActions from '@/components/admin/ProjectRowActions';
import { AdminHeader, StatusBadge } from '@/components/admin/ui';

export const metadata: Metadata = { title: 'Projects' };

export default async function AdminProjectsPage() {
  const projects = await loadProjects();

  return (
    <>
      <AdminHeader
        title="Projects"
        description="Shown on the homepage and the Work page in this order. Drafts stay hidden from visitors."
        actions={
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" aria-hidden /> New project
          </Link>
        }
      />

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line-strong bg-card p-12 text-center">
          <p className="text-lg font-semibold text-heading">No projects yet</p>
          <p className="mt-2 text-muted">Add your first project to show it on the website.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {projects.map((p, i) => (
            <li
              key={p.slug}
              className="flex flex-col md:flex-row md:items-center gap-4 rounded-2xl border border-line bg-card p-4 shadow-sm shadow-ink/5"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-ink via-[#0f2d5c] to-primary">
                  {p.screenshots[0] ? (
                    <Image src={p.screenshots[0].src} alt="" fill sizes="96px" className="object-cover" />
                  ) : (
                    <ServiceIcon slug={p.service} className="absolute inset-0 m-auto h-6 w-6 text-accent/80" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/admin/projects/${p.slug}`} className="font-semibold text-heading hover:text-link truncate">
                      {p.name}
                    </Link>
                    {p.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-link">
                        <Star className="h-3 w-3 fill-current" aria-hidden /> Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-subtle-fg">
                    {projectTypeLabel[p.type]} · {p.category} · {p.year}
                  </p>
                  <div className="mt-1.5">
                    <StatusBadge published={p.published} />
                  </div>
                </div>
              </div>
              <ProjectRowActions
                slug={p.slug}
                name={p.name}
                published={p.published}
                isFirst={i === 0}
                isLast={i === projects.length - 1}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
