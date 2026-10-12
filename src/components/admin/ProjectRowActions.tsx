'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';
import {
  deleteProjectAction,
  moveProjectAction,
  setProjectPublishedAction,
  type ActionResult,
} from '@/app/admin/actions';

const btn =
  'inline-flex items-center justify-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-medium text-body hover:border-primary/40 hover:text-heading disabled:opacity-40 disabled:pointer-events-none transition-colors';

export default function ProjectRowActions({
  slug,
  name,
  published,
  isFirst,
  isLast,
}: {
  slug: string;
  name: string;
  published: boolean;
  isFirst: boolean;
  isLast: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const run = (action: () => Promise<ActionResult>) =>
    startTransition(async () => {
      const result = await action();
      if (!result.ok) alert(result.error);
      router.refresh();
    });

  return (
    <div className={`flex flex-wrap items-center gap-2 ${pending ? 'opacity-60' : ''}`}>
      <button type="button" className={btn} disabled={pending || isFirst} onClick={() => run(() => moveProjectAction(slug, 'up'))} aria-label={`Move ${name} up`}>
        <ArrowUp className="h-3.5 w-3.5" aria-hidden />
      </button>
      <button type="button" className={btn} disabled={pending || isLast} onClick={() => run(() => moveProjectAction(slug, 'down'))} aria-label={`Move ${name} down`}>
        <ArrowDown className="h-3.5 w-3.5" aria-hidden />
      </button>
      <button type="button" className={btn} disabled={pending} onClick={() => run(() => setProjectPublishedAction(slug, !published))}>
        {published ? <EyeOff className="h-3.5 w-3.5" aria-hidden /> : <Eye className="h-3.5 w-3.5" aria-hidden />}
        {published ? 'Unpublish' : 'Publish'}
      </button>
      {published && (
        <Link href={`/case-studies/${slug}`} target="_blank" className={btn}>
          View
        </Link>
      )}
      <Link href={`/admin/projects/${slug}`} className={btn}>
        <Pencil className="h-3.5 w-3.5" aria-hidden /> Edit
      </Link>
      <button
        type="button"
        className={`${btn} hover:border-red-300 hover:text-red-600`}
        disabled={pending}
        onClick={() => {
          if (confirm(`Delete "${name}"? Its uploaded images will also be removed. This cannot be undone.`)) {
            run(() => deleteProjectAction(slug));
          }
        }}
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden /> Delete
      </button>
    </div>
  );
}
