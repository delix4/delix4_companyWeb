import type { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { isAdmin, isAdminConfigured } from '@/lib/admin-auth';
import LoginForm from '@/components/admin/LoginForm';

export const metadata: Metadata = { title: 'Sign in' };

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect('/admin');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.12),transparent_60%)]">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Image src="/tablogo.png" alt="" width={192} height={192} className="h-16 w-16 rounded-2xl shadow-lg shadow-ink/20" priority />
          <h1 className="mt-6 text-2xl font-bold text-heading">Delix4 Admin</h1>
          <p className="mt-2 text-sm text-muted">Sign in to manage projects and client comments.</p>
        </div>
        <div className="mt-8 rounded-2xl border border-line bg-card p-6 shadow-xl shadow-ink/5">
          {isAdminConfigured() ? (
            <LoginForm />
          ) : (
            <div className="text-sm text-body space-y-3" role="alert">
              <p className="font-semibold text-heading">Admin is not set up yet</p>
              <p>
                Add an <code className="rounded bg-subtle px-1.5 py-0.5 text-xs">ADMIN_PASSWORD</code> of at least 10
                characters to <code className="rounded bg-subtle px-1.5 py-0.5 text-xs">.env.local</code> (and to your
                Netlify environment variables), then restart the server.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
