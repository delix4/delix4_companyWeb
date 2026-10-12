import 'server-only';
import { cache } from 'react';
import { connection } from 'next/server';
import { seedCaseStudies, type CaseStudy } from './case-studies';
import type { Testimonial } from './company';
import { readJSON, removeKey, writeJSON } from './storage';

/*
 * Admin-managed content. Public pages call the `get*` functions, which opt the page into
 * request-time rendering so changes saved in /admin show up immediately.
 */

const PROJECTS_KEY = 'projects.json';
const TESTIMONIALS_KEY = 'testimonials.json';

// Until the admin saves the first change, the site shows the original seed projects.
export const loadProjects = cache(async (): Promise<CaseStudy[]> => {
  const stored = await readJSON<CaseStudy[]>(PROJECTS_KEY);
  return Array.isArray(stored) ? stored : seedCaseStudies;
});

export const loadTestimonials = cache(async (): Promise<Testimonial[]> => {
  const stored = await readJSON<Testimonial[]>(TESTIMONIALS_KEY);
  return Array.isArray(stored) ? stored : [];
});

export const saveProjects = (projects: CaseStudy[]) => writeJSON(PROJECTS_KEY, projects);
export const saveTestimonials = (testimonials: Testimonial[]) => writeJSON(TESTIMONIALS_KEY, testimonials);

/** Deletes uploaded images that are no longer referenced. Files in /public are left alone. */
export async function deleteMedia(srcs: string[]) {
  await Promise.all(
    srcs
      .filter((src) => src.startsWith('/media/'))
      .map((src) => removeKey(src.slice(1)).catch(() => undefined))
  );
}

/** Published projects in display order, featured first. */
export async function getPublishedProjects() {
  await connection();
  const projects = (await loadProjects()).filter((p) => p.published);
  return [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];
}

export async function getPublishedProject(slug: string) {
  return (await getPublishedProjects()).find((p) => p.slug === slug);
}

export async function getPublishedTestimonials() {
  await connection();
  return (await loadTestimonials()).filter((t) => t.published);
}
