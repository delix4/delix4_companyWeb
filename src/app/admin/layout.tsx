import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Delix4 Admin' },
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-page">{children}</div>;
}
