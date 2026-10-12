import type { Metadata } from 'next';
import ProjectForm from '@/components/admin/ProjectForm';
import { AdminHeader } from '@/components/admin/ui';

export const metadata: Metadata = { title: 'New project' };

export default function NewProjectPage() {
  return (
    <>
      <AdminHeader title="New project" description="Save as a draft first, then publish when it is ready." />
      <ProjectForm />
    </>
  );
}
