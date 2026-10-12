'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/** Renders the public site chrome (navbar, footer, chat button) everywhere except the admin panel. */
export default function PublicOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <>{children}</>;
}
