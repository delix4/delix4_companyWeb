import { projectTypeLabel, serviceOptions, type CaseStudy, type ProjectType } from './case-studies';
import type { Testimonial } from './company';
import type { ServiceSlug } from './services';

/*
 * Validation for content submitted from the admin panel. Everything coming from a form is
 * treated as untrusted: strings are trimmed and length-limited, enums are checked, and links
 * are restricted to http(s) so nothing like `javascript:` can end up in an href.
 */

export type ParseResult<T> = { ok: true; data: T } | { ok: false; error: string };

class InvalidInput extends Error {}

const fail = (message: string): never => {
  throw new InvalidInput(message);
};

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

function str(value: unknown, label: string, { max = 500, required = true } = {}) {
  const s = typeof value === 'string' ? value.trim() : '';
  if (required && !s) fail(`${label} is required.`);
  if (s.length > max) fail(`${label} must be ${max} characters or fewer.`);
  return s;
}

function list<T>(value: unknown, label: string, max: number, item: (v: unknown, i: number) => T | null): T[] {
  if (value == null) return [];
  if (!Array.isArray(value)) fail(`${label} is invalid.`);
  const arr = value as unknown[];
  if (arr.length > max) fail(`${label}: add at most ${max} items.`);
  return arr.map(item).filter((v): v is T => v !== null);
}

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

export function isSafeHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

/** Screenshots must be images uploaded through the admin (/media/…) or files in /public. */
export const isAllowedImageSrc = (src: string) =>
  /^\/media\/[a-z0-9-]+\.(?:jpg|png|webp|gif|avif)$/.test(src) ||
  /^\/(?!\/)[A-Za-z0-9/_.-]+\.(?:jpg|jpeg|png|webp|gif|avif|svg)$/.test(src);

const projectTypes = Object.keys(projectTypeLabel) as ProjectType[];
const serviceSlugs = serviceOptions.map((s) => s.value);

export function parseProject(input: unknown): ParseResult<CaseStudy> {
  try {
    if (!isObject(input)) fail('Invalid project data.');
    const v = input as Record<string, unknown>;

    const name = str(v.name, 'Project name', { max: 120 });
    const slug = str(v.slug, 'URL slug', { max: 80, required: false }) || slugify(name);
    if (!SLUG_PATTERN.test(slug)) fail('URL slug can only contain lowercase letters, numbers and hyphens.');

    const type = v.type as ProjectType;
    if (!projectTypes.includes(type)) fail('Choose a project type.');
    const service = v.service as ServiceSlug;
    if (!serviceSlugs.includes(service)) fail('Choose a service.');

    const year = Number(v.year);
    if (!Number.isInteger(year) || year < 2000 || year > 2100) fail('Year must be between 2000 and 2100.');

    const tagline = str(v.tagline, 'Short description', { max: 300 });
    const metaDescription = str(v.metaDescription, 'SEO description', { max: 300, required: false }) || tagline;

    const data: CaseStudy = {
      slug,
      name,
      type,
      service,
      year,
      category: str(v.category, 'Category', { max: 60 }),
      client: str(v.client, 'Client name', { max: 120, required: false }) || undefined,
      featured: v.featured === true,
      published: v.published === true,
      tagline,
      metaDescription,
      problem: str(v.problem, 'The problem', { max: 3000 }),
      solution: str(v.solution, 'Our solution', { max: 3000 }),
      technologies: list(v.technologies, 'Technologies', 30, (t) => str(t, 'Technology', { max: 40, required: false }) || null),
      features: list(v.features, 'Key features', 20, (f) => {
        if (!isObject(f)) return null;
        const title = str(f.title, 'Feature title', { max: 100, required: false });
        const description = str(f.description, 'Feature description', { max: 600, required: false });
        if (!title && !description) return null;
        if (!title) fail('Each feature needs a title.');
        return { title, description };
      }),
      architecture: list(v.architecture, 'Architecture', 12, (a) => {
        if (!isObject(a)) return null;
        const label = str(a.label, 'Architecture step', { max: 60, required: false });
        const detail = str(a.detail, 'Architecture detail', { max: 200, required: false });
        if (!label && !detail) return null;
        if (!label) fail('Each architecture step needs a name.');
        return { label, detail };
      }),
      metrics: list(v.metrics, 'Results', 8, (m) => {
        if (!isObject(m)) return null;
        const value = str(m.value, 'Result value', { max: 20, required: false });
        const label = str(m.label, 'Result label', { max: 60, required: false });
        if (!value && !label) return null;
        if (!value || !label) fail('Each result needs both a value and a label.');
        return { value, label };
      }),
      outcomes: list(v.outcomes, 'Outcomes', 12, (o) => str(o, 'Outcome', { max: 300, required: false }) || null),
      screenshots: list(v.screenshots, 'Screenshots', 20, (sh) => {
        if (!isObject(sh)) return null;
        const src = str(sh.src, 'Image', { max: 300 });
        if (!isAllowedImageSrc(src)) fail('Screenshots must be uploaded images.');
        return { src, alt: str(sh.alt, 'Image description', { max: 200, required: false }) || name };
      }),
      links: list(v.links, 'Links', 6, (l) => {
        if (!isObject(l)) return null;
        const label = str(l.label, 'Link text', { max: 60, required: false });
        const href = str(l.href, 'Link URL', { max: 500, required: false });
        if (!label && !href) return null;
        if (!isSafeHttpUrl(href)) fail('Links must start with https:// or http://');
        return { label: label || 'Visit project', href };
      }),
    };
    if (data.architecture?.length === 0) delete data.architecture;
    if (data.links?.length === 0) delete data.links;
    return { ok: true, data };
  } catch (err) {
    if (err instanceof InvalidInput) return { ok: false, error: err.message };
    throw err;
  }
}

export type TestimonialInput = Omit<Testimonial, 'id' | 'createdAt'>;

export function parseTestimonial(input: unknown): ParseResult<TestimonialInput> {
  try {
    if (!isObject(input)) fail('Invalid testimonial data.');
    const v = input as Record<string, unknown>;
    const rating = Number(v.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) fail('Rating must be 1 to 5 stars.');
    const caseStudy = str(v.caseStudy, 'Project', { max: 80, required: false });
    if (caseStudy && !SLUG_PATTERN.test(caseStudy)) fail('Choose a valid project.');
    return {
      ok: true,
      data: {
        quote: str(v.quote, 'Comment', { max: 1000 }),
        name: str(v.name, 'Client name', { max: 80 }),
        role: str(v.role, 'Role', { max: 80, required: false }),
        company: str(v.company, 'Company', { max: 80, required: false }),
        rating,
        caseStudy: caseStudy || undefined,
        published: v.published === true,
      },
    };
  } catch (err) {
    if (err instanceof InvalidInput) return { ok: false, error: err.message };
    throw err;
  }
}
