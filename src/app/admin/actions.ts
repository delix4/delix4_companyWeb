'use server';

import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  checkPassword,
  clearFailedLogins,
  clientIp,
  createSession,
  destroySession,
  isAdminConfigured,
  isLoginBlocked,
  recordFailedLogin,
  requireAdmin,
} from '@/lib/admin-auth';
import { parseProject, parseTestimonial } from '@/lib/content-schema';
import { deleteMedia, loadProjects, loadTestimonials, saveProjects, saveTestimonials } from '@/lib/content';

export type ActionResult = { ok: true; slug?: string } | { ok: false; error: string };

// Public pages render per request, so this mainly clears the client-side router cache.
const refreshSite = () => revalidatePath('/', 'layout');

const saveFailed = (err: unknown): ActionResult => {
  console.error('[admin] save failed', err);
  return { ok: false, error: 'Could not save to storage. Please try again.' };
};

/* ---------- Auth ---------- */

export async function loginAction(_prev: { error?: string } | undefined, formData: FormData) {
  if (!isAdminConfigured()) {
    return { error: 'Admin is not set up yet. Add ADMIN_PASSWORD (10+ characters) to the environment.' };
  }
  const ip = await clientIp();
  if (isLoginBlocked(ip)) return { error: 'Too many attempts. Please wait 15 minutes and try again.' };

  const password = formData.get('password');
  if (typeof password !== 'string' || !checkPassword(password)) {
    recordFailedLogin(ip);
    return { error: 'Incorrect password.' };
  }
  clearFailedLogins(ip);
  await createSession();
  redirect('/admin');
}

export async function logoutAction() {
  await destroySession();
  redirect('/admin/login');
}

/* ---------- Projects ---------- */

export async function saveProjectAction(originalSlug: string | null, input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = parseProject(input);
  if (!parsed.ok) return parsed;
  const project = parsed.data;

  try {
    const projects = [...(await loadProjects())];
    const index = originalSlug ? projects.findIndex((p) => p.slug === originalSlug) : -1;
    if (originalSlug && index === -1) return { ok: false, error: 'This project no longer exists.' };
    if (projects.some((p, i) => p.slug === project.slug && i !== index)) {
      return { ok: false, error: `Another project already uses the URL "${project.slug}". Choose a different slug.` };
    }

    const previous = index >= 0 ? projects[index] : undefined;
    if (index >= 0) projects[index] = project;
    else projects.unshift(project);

    // Only one project is spotlighted on the homepage at a time.
    const next = project.featured
      ? projects.map((p) => (p.slug === project.slug ? p : { ...p, featured: false }))
      : projects;
    await saveProjects(next);

    if (previous) {
      const kept = new Set(project.screenshots.map((s) => s.src));
      await deleteMedia(previous.screenshots.map((s) => s.src).filter((src) => !kept.has(src)));
      // Keep testimonials linked when a project's URL changes.
      if (previous.slug !== project.slug) {
        const testimonials = await loadTestimonials();
        if (testimonials.some((t) => t.caseStudy === previous.slug)) {
          await saveTestimonials(
            testimonials.map((t) => (t.caseStudy === previous.slug ? { ...t, caseStudy: project.slug } : t))
          );
        }
      }
    }
  } catch (err) {
    return saveFailed(err);
  }
  refreshSite();
  return { ok: true, slug: project.slug };
}

export async function deleteProjectAction(slug: string): Promise<ActionResult> {
  await requireAdmin();
  try {
    const projects = await loadProjects();
    const project = projects.find((p) => p.slug === slug);
    if (!project) return { ok: false, error: 'Project not found.' };
    await saveProjects(projects.filter((p) => p.slug !== slug));
    await deleteMedia(project.screenshots.map((s) => s.src));
  } catch (err) {
    return saveFailed(err);
  }
  refreshSite();
  return { ok: true };
}

export async function setProjectPublishedAction(slug: string, published: boolean): Promise<ActionResult> {
  await requireAdmin();
  try {
    const projects = await loadProjects();
    if (!projects.some((p) => p.slug === slug)) return { ok: false, error: 'Project not found.' };
    await saveProjects(projects.map((p) => (p.slug === slug ? { ...p, published: published === true } : p)));
  } catch (err) {
    return saveFailed(err);
  }
  refreshSite();
  return { ok: true };
}

export async function moveProjectAction(slug: string, direction: 'up' | 'down'): Promise<ActionResult> {
  await requireAdmin();
  try {
    const projects = [...(await loadProjects())];
    const i = projects.findIndex((p) => p.slug === slug);
    const j = direction === 'up' ? i - 1 : i + 1;
    if (i === -1 || j < 0 || j >= projects.length) return { ok: true };
    [projects[i], projects[j]] = [projects[j], projects[i]];
    await saveProjects(projects);
  } catch (err) {
    return saveFailed(err);
  }
  refreshSite();
  return { ok: true };
}

/* ---------- Testimonials ---------- */

export async function saveTestimonialAction(id: string | null, input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = parseTestimonial(input);
  if (!parsed.ok) return parsed;

  try {
    const testimonials = [...(await loadTestimonials())];
    if (id) {
      const index = testimonials.findIndex((t) => t.id === id);
      if (index === -1) return { ok: false, error: 'This comment no longer exists.' };
      testimonials[index] = { ...testimonials[index], ...parsed.data };
    } else {
      testimonials.unshift({ ...parsed.data, id: randomUUID(), createdAt: new Date().toISOString() });
    }
    await saveTestimonials(testimonials);
  } catch (err) {
    return saveFailed(err);
  }
  refreshSite();
  return { ok: true };
}

export async function deleteTestimonialAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  try {
    const testimonials = await loadTestimonials();
    await saveTestimonials(testimonials.filter((t) => t.id !== id));
  } catch (err) {
    return saveFailed(err);
  }
  refreshSite();
  return { ok: true };
}

export async function setTestimonialPublishedAction(id: string, published: boolean): Promise<ActionResult> {
  await requireAdmin();
  try {
    const testimonials = await loadTestimonials();
    await saveTestimonials(testimonials.map((t) => (t.id === id ? { ...t, published: published === true } : t)));
  } catch (err) {
    return saveFailed(err);
  }
  refreshSite();
  return { ok: true };
}
