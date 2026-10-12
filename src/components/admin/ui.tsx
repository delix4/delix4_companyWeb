import type { ReactNode } from 'react';

export const inputClass =
  'w-full rounded-lg border border-line bg-page px-3.5 py-2.5 text-sm text-heading placeholder:text-faint focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary';

export function AdminHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-heading tracking-tight">{title}</h1>
        {description && <p className="mt-1.5 text-muted">{description}</p>}
      </div>
      {actions && <div className="flex gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

export function Panel({ title, description, children }: { title?: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-card p-5 md:p-6 shadow-sm shadow-ink/5">
      {title && <h2 className="text-base font-semibold text-heading">{title}</h2>}
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className={title || description ? 'mt-5' : ''}>{children}</div>
    </section>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-body mb-1.5">
        {label} {required && <span className="text-link">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-subtle-fg">{hint}</p>}
    </div>
  );
}

export function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        published ? 'bg-green-500/10 text-green-700' : 'bg-amber-500/10 text-amber-700'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${published ? 'bg-green-500' : 'bg-amber-500'}`} aria-hidden />
      {published ? 'Published' : 'Draft'}
    </span>
  );
}
