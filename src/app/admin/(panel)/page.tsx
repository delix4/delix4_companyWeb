import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FolderKanban, MessageSquareQuote, Plus, Star } from 'lucide-react';
import { loadProjects, loadTestimonials } from '@/lib/content';
import { AdminHeader, Panel, StatusBadge } from '@/components/admin/ui';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function AdminDashboard() {
  const [projects, testimonials] = await Promise.all([loadProjects(), loadTestimonials()]);
  const publishedProjects = projects.filter((p) => p.published).length;
  const publishedComments = testimonials.filter((t) => t.published).length;

  const stats = [
    { label: 'Projects', value: projects.length, detail: `${publishedProjects} published`, icon: FolderKanban, href: '/admin/projects' },
    { label: 'Client comments', value: testimonials.length, detail: `${publishedComments} published`, icon: MessageSquareQuote, href: '/admin/testimonials' },
  ];

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Manage the projects and client comments shown on delix4.com."
        actions={
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" aria-hidden /> New project
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group rounded-2xl border border-line bg-card p-6 shadow-sm shadow-ink/5 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="w-11 h-11 rounded-xl bg-primary/10 text-link flex items-center justify-center">
                <s.icon className="h-5 w-5" aria-hidden />
              </span>
              <ArrowRight className="h-4 w-4 text-subtle-fg transition-transform group-hover:translate-x-1" aria-hidden />
            </div>
            <p className="mt-5 text-4xl font-bold text-heading">{s.value}</p>
            <p className="mt-1 text-sm text-muted">
              {s.label} · {s.detail}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Recent projects">
          {projects.length === 0 ? (
            <p className="text-sm text-muted">No projects yet.</p>
          ) : (
            <ul className="divide-y divide-line">
              {projects.slice(0, 5).map((p) => (
                <li key={p.slug} className="flex items-center justify-between gap-3 py-3">
                  <Link href={`/admin/projects/${p.slug}`} className="min-w-0 text-sm font-medium text-heading hover:text-link truncate">
                    {p.name}
                  </Link>
                  <StatusBadge published={p.published} />
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <Panel title="Recent client comments">
          {testimonials.length === 0 ? (
            <p className="text-sm text-muted">
              No comments yet.{' '}
              <Link href="/admin/testimonials" className="text-link hover:underline">
                Add the first one
              </Link>
              .
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {testimonials.slice(0, 5).map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 py-3">
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-heading truncate">{t.name}</span>
                    <span className="flex items-center gap-0.5 mt-0.5" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-line-strong'}`} aria-hidden />
                      ))}
                    </span>
                  </span>
                  <StatusBadge published={t.published} />
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}
