import type { Metadata } from 'next';
import { loadProjects, loadTestimonials } from '@/lib/content';
import TestimonialsManager from '@/components/admin/TestimonialsManager';
import { AdminHeader } from '@/components/admin/ui';

export const metadata: Metadata = { title: 'Client comments' };

export default async function AdminTestimonialsPage() {
  const [testimonials, projects] = await Promise.all([loadTestimonials(), loadProjects()]);

  return (
    <>
      <AdminHeader
        title="Client comments"
        description="Published comments appear on the homepage, the About page and the linked project. Only publish with the client's permission."
      />
      <TestimonialsManager testimonials={testimonials} projects={projects.map((p) => ({ slug: p.slug, name: p.name }))} />
    </>
  );
}
