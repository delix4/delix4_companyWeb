'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { AlertCircle, Eye, EyeOff, Loader, Pencil, Plus, Quote, Save, Star, Trash2 } from 'lucide-react';
import {
  deleteTestimonialAction,
  saveTestimonialAction,
  setTestimonialPublishedAction,
  type ActionResult,
} from '@/app/admin/actions';
import type { Testimonial } from '@/lib/company';
import { Field, Panel, StatusBadge, inputClass } from './ui';

type Draft = Omit<Testimonial, 'id' | 'createdAt' | 'caseStudy'> & { caseStudy: string };

const blank: Draft = { quote: '', name: '', role: '', company: '', rating: 5, caseStudy: '', published: false };

const btn =
  'inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-medium text-body hover:border-primary/40 hover:text-heading disabled:opacity-40 transition-colors';

export default function TestimonialsManager({
  testimonials,
  projects,
}: {
  testimonials: Testimonial[];
  projects: { slug: string; name: string }[];
}) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(blank);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const projectName = (slug?: string) => projects.find((p) => p.slug === slug)?.name;

  const run = (action: () => Promise<ActionResult>, onSuccess?: () => void) =>
    startTransition(async () => {
      const result = await action();
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setError(null);
      onSuccess?.();
      router.refresh();
    });

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setDraft({
      quote: t.quote,
      name: t.name,
      role: t.role,
      company: t.company,
      rating: t.rating,
      caseStudy: t.caseStudy ?? '',
      published: t.published,
    });
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setEditingId(null);
    setDraft(blank);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,26rem)_1fr] gap-6 items-start">
      <div className="xl:sticky xl:top-8">
        <Panel title={editingId ? 'Edit comment' : 'Add a client comment'}>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              run(() => saveTestimonialAction(editingId, draft), reset);
            }}
          >
            {error && (
              <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden /> {error}
              </p>
            )}
            <Field label="Comment" htmlFor="quote" required>
              <textarea
                id="quote"
                rows={4}
                maxLength={1000}
                className={inputClass}
                value={draft.quote}
                onChange={(e) => setDraft({ ...draft, quote: e.target.value })}
                placeholder="What the client said about working with Delix4"
              />
            </Field>
            <Field label="Client name" htmlFor="tname" required>
              <input id="tname" maxLength={80} className={inputClass} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Role" htmlFor="role">
                <input id="role" maxLength={80} className={inputClass} value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} placeholder="Founder" />
              </Field>
              <Field label="Company" htmlFor="company">
                <input id="company" maxLength={80} className={inputClass} value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} />
              </Field>
            </div>
            <Field label="Rating">
              <div className="flex gap-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={draft.rating === n}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    onClick={() => setDraft({ ...draft, rating: n })}
                    className="p-1"
                  >
                    <Star className={`h-6 w-6 ${n <= draft.rating ? 'fill-amber-400 text-amber-400' : 'text-line-strong'}`} aria-hidden />
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Related project" htmlFor="tproject" hint="Optional. The comment is also shown on that project's page.">
              <select id="tproject" className={inputClass} value={draft.caseStudy} onChange={(e) => setDraft({ ...draft, caseStudy: e.target.value })}>
                <option value="">None</option>
                {projects.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </Field>
            <label className="flex items-center gap-2.5 text-sm text-body cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 accent-primary"
                checked={draft.published}
                onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
              />
              Publish on the website
            </label>
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
              >
                {pending ? (
                  <Loader className="h-4 w-4 animate-spin" aria-hidden />
                ) : editingId ? (
                  <Save className="h-4 w-4" aria-hidden />
                ) : (
                  <Plus className="h-4 w-4" aria-hidden />
                )}
                {editingId ? 'Save changes' : 'Add comment'}
              </button>
              {editingId && (
                <button type="button" onClick={reset} className="rounded-full px-4 py-2.5 text-sm text-body hover:text-heading">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </Panel>
      </div>

      <div className="space-y-3">
        {testimonials.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line-strong bg-card p-10 text-center">
            <Quote className="h-8 w-8 text-line-strong mx-auto" aria-hidden />
            <p className="mt-3 font-semibold text-heading">No client comments yet</p>
            <p className="mt-1 text-sm text-muted">Add one with the form. It stays hidden until you publish it.</p>
          </div>
        )}
        {testimonials.map((t) => (
          <article
            key={t.id}
            className={`rounded-2xl border bg-card p-5 shadow-sm shadow-ink/5 ${
              editingId === t.id ? 'border-primary/50 ring-1 ring-primary/30' : 'border-line'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-line-strong'}`} aria-hidden />
                ))}
              </span>
              <StatusBadge published={t.published} />
            </div>
            <blockquote className="mt-3 text-body leading-relaxed">“{t.quote}”</blockquote>
            <p className="mt-3 text-sm">
              <span className="font-semibold text-heading">{t.name}</span>
              {(t.role || t.company) && <span className="text-subtle-fg"> — {[t.role, t.company].filter(Boolean).join(', ')}</span>}
            </p>
            {projectName(t.caseStudy) && <p className="mt-1 text-xs text-link">Project: {projectName(t.caseStudy)}</p>}
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className={btn} disabled={pending} onClick={() => run(() => setTestimonialPublishedAction(t.id, !t.published))}>
                {t.published ? <EyeOff className="h-3.5 w-3.5" aria-hidden /> : <Eye className="h-3.5 w-3.5" aria-hidden />}
                {t.published ? 'Unpublish' : 'Publish'}
              </button>
              <button type="button" className={btn} onClick={() => startEdit(t)}>
                <Pencil className="h-3.5 w-3.5" aria-hidden /> Edit
              </button>
              <button
                type="button"
                className={`${btn} hover:border-red-300 hover:text-red-600`}
                disabled={pending}
                onClick={() => {
                  if (confirm(`Delete the comment from ${t.name}? This cannot be undone.`)) {
                    run(
                      () => deleteTestimonialAction(t.id),
                      () => {
                        if (editingId === t.id) reset();
                      }
                    );
                  }
                }}
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden /> Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
