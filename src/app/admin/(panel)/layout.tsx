import type { ReactNode } from 'react';
import { requireAdmin } from '@/lib/admin-auth';
import AdminNav from '@/components/admin/AdminNav';

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <div className="lg:flex min-h-screen">
      <AdminNav />
      <div className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">{children}</div>
      </div>
    </div>
  );
}
