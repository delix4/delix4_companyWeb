import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loadProjects } from '@/lib/content';
import ProjectForm from '@/components/admin/ProjectForm';
import { AdminHeader } from '@/components/admin/ui';

export const metadata: Metadata = { title: 'Edit project' };

export default async function EditProjectPage({ params }: PageProps<'/admin/projects/[slug]'>) {
  const { slug } = await params;
  const project = (await loadProjects()).find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <AdminHeader title={`Edit: ${project.name}`} />
      <ProjectForm key={project.slug} project={project} />
    </>
  );
}
