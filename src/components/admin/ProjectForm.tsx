'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition, type ReactNode } from 'react';
import { AlertCircle, ArrowLeft, ArrowRight, ImagePlus, Loader, Plus, Save, Star, Trash2, X } from 'lucide-react';
import { saveProjectAction } from '@/app/admin/actions';
import { projectTypeLabel, serviceOptions, type CaseStudy, type ProjectType } from '@/lib/case-studies';
import { slugify } from '@/lib/content-schema';
import type { ServiceSlug } from '@/lib/services';
import { Field, Panel, inputClass } from './ui';

type Pair<A extends string, B extends string> = Record<A, string> & Record<B, string>;

interface FormState {
  name: string;
  slug: string;
  client: string;
  type: ProjectType;
  service: ServiceSlug;
  category: string;
  year: string;
  featured: boolean;
  published: boolean;
  tagline: string;
  metaDescription: string;
  problem: string;
  solution: string;
  technologies: string;
  outcomes: string;
  features: Pair<'title', 'description'>[];
  architecture: Pair<'label', 'detail'>[];
  metrics: Pair<'value', 'label'>[];
  links: Pair<'label', 'href'>[];
  screenshots: { src: string; alt: string }[];
}

const defaultCategory: Record<ServiceSlug, string> = {
  'web-development': 'Web Development',
  'mobile-app-development': 'Mobile App',
  'ai-development': 'AI & Machine Learning',
  'software-development': 'Custom Software',
};

const toFormState = (p?: CaseStudy): FormState => ({
  name: p?.name ?? '',
  slug: p?.slug ?? '',
  client: p?.client ?? '',
  type: p?.type ?? 'client',
  service: p?.service ?? 'web-development',
  category: p?.category ?? defaultCategory['web-development'],
  year: String(p?.year ?? new Date().getFullYear()),
  featured: p?.featured ?? false,
  published: p?.published ?? false,
  tagline: p?.tagline ?? '',
  metaDescription: p && p.metaDescription !== p.tagline ? p.metaDescription : '',
  problem: p?.problem ?? '',
  solution: p?.solution ?? '',
  technologies: p?.technologies.join(', ') ?? '',
  outcomes: p?.outcomes.join('\n') ?? '',
  features: p?.features ?? [],
  architecture: p?.architecture ?? [],
  metrics: p?.metrics ?? [],
  links: p?.links ?? [],
  screenshots: p?.screenshots ?? [],
});

const MAX_DIMENSION = 2400;
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

/** Shrinks large photos in the browser before upload so they stay fast and under the size limit. */
async function prepareImage(file: File): Promise<Blob> {
  if (file.type === 'image/gif' || typeof createImageBitmap !== 'function') return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size <= 1.5 * 1024 * 1024) {
      bitmap.close();
      return file;
    }
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.85));
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

export default function ProjectForm({ project }: { project?: CaseStudy }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => toFormState(project));
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(0);
  const [saving, startSaving] = useTransition();
  const fileInput = useRef<HTMLInputElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setError(null);
    const list = Array.from(files).slice(0, 20 - form.screenshots.length);
    setUploading((n) => n + list.length);
    for (const file of list) {
      try {
        const blob = await prepareImage(file);
        if (blob.size > MAX_UPLOAD_BYTES) throw new Error(`"${file.name}" is larger than 4 MB.`);
        const body = new FormData();
        body.append('file', blob, file.name);
        const res = await fetch('/api/admin/upload', { method: 'POST', body });
        const json = (await res.json().catch(() => ({}))) as { src?: string; error?: string };
        if (!res.ok || !json.src) throw new Error(json.error ?? `Upload failed for "${file.name}".`);
        const alt = `${form.name || 'Project'} screenshot`;
        setForm((f) => ({ ...f, screenshots: [...f.screenshots, { src: json.src!, alt }] }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed.');
      } finally {
        setUploading((n) => n - 1);
      }
    }
    if (fileInput.current) fileInput.current.value = '';
  }

  function moveImage(index: number, by: -1 | 1) {
    setForm((f) => {
      const next = [...f.screenshots];
      const target = index + by;
      if (target < 0 || target >= next.length) return f;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...f, screenshots: next };
    });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const payload = {
      ...form,
      year: Number(form.year),
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      outcomes: form.outcomes.split('\n').map((o) => o.trim()).filter(Boolean),
    };
    startSaving(async () => {
      const result = await saveProjectAction(project?.slug ?? null, payload);
      if (!result.ok) {
        setError(result.error);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      router.push('/admin/projects');
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6 pb-24" noValidate>
      {error && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
          <p>{error}</p>
        </div>
      )}

      <Panel title="Basics" description="What visitors see on the project card.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Project name" htmlFor="name" required>
            <input
              id="name"
              className={inputClass}
              value={form.name}
              maxLength={120}
              onChange={(e) => {
                const name = e.target.value;
                setForm((f) => ({ ...f, name, slug: slugTouched ? f.slug : slugify(name) }));
              }}
              placeholder="e.g. Restaurant Booking App"
            />
          </Field>
          <Field label="URL slug" htmlFor="slug" hint={`delix4.com/case-studies/${form.slug || 'your-project'}`}>
            <input
              id="slug"
              className={inputClass}
              value={form.slug}
              maxLength={80}
              onChange={(e) => {
                setSlugTouched(true);
                set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
              }}
            />
          </Field>
          <Field label="Project type" htmlFor="type" required hint="Labelled honestly on the site.">
            <select id="type" className={inputClass} value={form.type} onChange={(e) => set('type', e.target.value as ProjectType)}>
              {Object.entries(projectTypeLabel).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Client name" htmlFor="client" hint="Optional. Only add with the client's permission.">
            <input id="client" className={inputClass} value={form.client} maxLength={120} onChange={(e) => set('client', e.target.value)} />
          </Field>
          <Field label="Service" htmlFor="service" required hint="Used for the filters on the Work page.">
            <select
              id="service"
              className={inputClass}
              value={form.service}
              onChange={(e) => {
                const service = e.target.value as ServiceSlug;
                setForm((f) => ({
                  ...f,
                  service,
                  category: Object.values(defaultCategory).includes(f.category) || !f.category ? defaultCategory[service] : f.category,
                }));
              }}
            >
              {serviceOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid grid-cols-[1fr_7rem] gap-3">
            <Field label="Category label" htmlFor="category" required>
              <input id="category" className={inputClass} value={form.category} maxLength={60} onChange={(e) => set('category', e.target.value)} />
            </Field>
            <Field label="Year" htmlFor="year" required>
              <input id="year" type="number" min={2000} max={2100} className={inputClass} value={form.year} onChange={(e) => set('year', e.target.value)} />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Short description" htmlFor="tagline" required hint="One or two sentences shown on the card.">
              <textarea id="tagline" rows={2} className={inputClass} value={form.tagline} maxLength={300} onChange={(e) => set('tagline', e.target.value)} />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="SEO description" htmlFor="meta" hint="Optional. Shown in Google results; defaults to the short description.">
              <textarea id="meta" rows={2} className={inputClass} value={form.metaDescription} maxLength={300} onChange={(e) => set('metaDescription', e.target.value)} />
            </Field>
          </div>
        </div>
      </Panel>

      <Panel title="Visibility">
        <div className="flex flex-col sm:flex-row gap-3">
          <Toggle checked={form.published} onChange={(v) => set('published', v)} label="Published" description="Visible to website visitors" />
          <Toggle
            checked={form.featured}
            onChange={(v) => set('featured', v)}
            label={
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-link" aria-hidden /> Featured
              </span>
            }
            description="Spotlight on the homepage (one project at a time)"
          />
        </div>
      </Panel>

      <Panel title="Images" description="The first image is the cover. JPG, PNG, WebP, GIF or AVIF; large photos are resized automatically.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {form.screenshots.map((s, i) => (
            <div key={s.src} className="rounded-xl border border-line bg-page overflow-hidden">
              <div className="relative aspect-[4/3] bg-subtle">
                <Image src={s.src} alt={s.alt} fill sizes="240px" className="object-cover" />
                {i === 0 && <span className="absolute top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">Cover</span>}
                <button
                  type="button"
                  onClick={() => set('screenshots', form.screenshots.filter((_, j) => j !== i))}
                  className="absolute top-2 right-2 rounded-full bg-ink/80 p-1.5 text-white hover:bg-red-600"
                  aria-label="Remove image"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
              <div className="p-2 space-y-2">
                <input
                  className={`${inputClass} py-1.5! text-xs!`}
                  value={s.alt}
                  maxLength={200}
                  aria-label="Image description"
                  placeholder="Describe the image"
                  onChange={(e) => set('screenshots', form.screenshots.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))}
                />
                <div className="flex justify-between">
                  <button type="button" disabled={i === 0} onClick={() => moveImage(i, -1)} className="p-1 text-subtle-fg hover:text-heading disabled:opacity-30" aria-label="Move image left">
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                  </button>
                  <button type="button" disabled={i === form.screenshots.length - 1} onClick={() => moveImage(i, 1)} className="p-1 text-subtle-fg hover:text-heading disabled:opacity-30" aria-label="Move image right">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {form.screenshots.length < 20 && (
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={uploading > 0}
              className="aspect-[4/3] sm:aspect-auto sm:min-h-[190px] flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line-strong text-sm text-muted hover:border-primary hover:text-link transition-colors disabled:opacity-60"
            >
              {uploading > 0 ? <Loader className="h-6 w-6 animate-spin" aria-hidden /> : <ImagePlus className="h-6 w-6" aria-hidden />}
              {uploading > 0 ? `Uploading ${uploading}…` : 'Add images'}
            </button>
          )}
        </div>
        <input
          ref={fileInput}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          multiple
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </Panel>

      <Panel title="The story">
        <div className="space-y-5">
          <Field label="The problem" htmlFor="problem" required>
            <textarea id="problem" rows={4} className={inputClass} value={form.problem} maxLength={3000} onChange={(e) => set('problem', e.target.value)} />
          </Field>
          <Field label="Our solution" htmlFor="solution" required>
            <textarea id="solution" rows={4} className={inputClass} value={form.solution} maxLength={3000} onChange={(e) => set('solution', e.target.value)} />
          </Field>
          <Field label="Technologies" htmlFor="tech" hint="Separate with commas, e.g. Next.js, Flutter, Firebase">
            <input id="tech" className={inputClass} value={form.technologies} onChange={(e) => set('technologies', e.target.value)} />
          </Field>
        </div>
      </Panel>

      <Repeater
        title="Key features"
        rows={form.features}
        onChange={(rows) => set('features', rows)}
        empty={{ title: '', description: '' }}
        max={20}
        fields={[
          { key: 'title', label: 'Feature', placeholder: 'e.g. Online booking' },
          { key: 'description', label: 'Description', placeholder: 'What it does for users', wide: true },
        ]}
      />

      <Repeater
        title="Results"
        description="Verified numbers only, e.g. 95% · Model accuracy. Hidden when empty."
        rows={form.metrics}
        onChange={(rows) => set('metrics', rows)}
        empty={{ value: '', label: '' }}
        max={8}
        fields={[
          { key: 'value', label: 'Value', placeholder: '95%' },
          { key: 'label', label: 'Label', placeholder: 'Model accuracy', wide: true },
        ]}
      />

      <Panel title="Outcomes" description="One per line.">
        <textarea rows={4} className={inputClass} value={form.outcomes} onChange={(e) => set('outcomes', e.target.value)} aria-label="Outcomes" />
      </Panel>

      <Repeater
        title="Architecture"
        description="Optional. Shown as a flow diagram on the project page."
        rows={form.architecture}
        onChange={(rows) => set('architecture', rows)}
        empty={{ label: '', detail: '' }}
        max={12}
        fields={[
          { key: 'label', label: 'Step', placeholder: 'e.g. Mobile App' },
          { key: 'detail', label: 'Detail', placeholder: 'What this part does', wide: true },
        ]}
      />

      <Repeater
        title="Links"
        description="Optional, e.g. the live website or App Store page."
        rows={form.links}
        onChange={(rows) => set('links', rows)}
        empty={{ label: '', href: '' }}
        max={6}
        fields={[
          { key: 'label', label: 'Text', placeholder: 'Visit website' },
          { key: 'href', label: 'URL', placeholder: 'https://…', wide: true },
        ]}
      />

      <div className="fixed bottom-0 inset-x-0 lg:left-64 z-30 border-t border-line bg-card/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-end gap-3">
          <Link href="/admin/projects" className="rounded-full px-5 py-2.5 text-sm font-medium text-body hover:text-heading">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving || uploading > 0}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
          >
            {saving ? <Loader className="h-4 w-4 animate-spin" aria-hidden /> : <Save className="h-4 w-4" aria-hidden />}
            {project ? 'Save changes' : 'Create project'}
          </button>
        </div>
      </div>
    </form>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: ReactNode;
  description: string;
}) {
  return (
    <label
      className={`flex-1 flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
        checked ? 'border-primary/50 bg-primary/5' : 'border-line hover:border-line-strong'
      }`}
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 accent-primary" />
      <span>
        <span className="block text-sm font-semibold text-heading">{label}</span>
        <span className="block text-xs text-muted mt-0.5">{description}</span>
      </span>
    </label>
  );
}

function Repeater<K extends string>({
  title,
  description,
  rows,
  onChange,
  empty,
  max,
  fields,
}: {
  title: string;
  description?: string;
  rows: Record<K, string>[];
  onChange: (rows: Record<K, string>[]) => void;
  empty: Record<K, string>;
  max: number;
  fields: { key: K; label: string; placeholder?: string; wide?: boolean }[];
}) {
  return (
    <Panel title={title} description={description}>
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-3">
              {fields.map((f) => (
                <input
                  key={f.key}
                  className={inputClass}
                  value={row[f.key]}
                  placeholder={f.placeholder}
                  aria-label={`${title} ${i + 1}: ${f.label}`}
                  onChange={(e) => onChange(rows.map((r, j) => (j === i ? { ...r, [f.key]: e.target.value } : r)))}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => onChange(rows.filter((_, j) => j !== i))}
              className="mt-1.5 p-1.5 rounded-lg text-subtle-fg hover:text-red-600 hover:bg-red-50"
              aria-label={`Remove ${title.toLowerCase()} ${i + 1}`}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </button>
          </div>
        ))}
        {rows.length < max && (
          <button
            type="button"
            onClick={() => onChange([...rows, { ...empty }])}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-link hover:text-link-hover"
          >
            <Plus className="h-4 w-4" aria-hidden /> Add {title.toLowerCase().replace(/s$/, '')}
          </button>
        )}
      </div>
    </Panel>
  );
}
