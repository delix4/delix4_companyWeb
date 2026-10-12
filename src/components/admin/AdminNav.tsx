'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, FolderKanban, LayoutDashboard, LogOut, MessageSquareQuote } from 'lucide-react';
import { logoutAction } from '@/app/admin/actions';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/testimonials', label: 'Client comments', icon: MessageSquareQuote },
];

export default function AdminNav() {
  const pathname = usePathname();
  const active = (href: string) => (href === '/admin' ? pathname === href : pathname.startsWith(href));

  return (
    <aside className="theme-dark bg-page lg:w-64 lg:shrink-0 lg:min-h-screen lg:sticky lg:top-0 lg:self-start">
      <div className="flex lg:flex-col h-full gap-2 p-3 lg:p-5 overflow-x-auto">
        <Link href="/admin" className="hidden lg:flex items-center gap-3 px-2 pb-6">
          <Image src="/tablogo.png" alt="" width={192} height={192} className="h-10 w-10 rounded-xl ring-1 ring-white/10" />
          <span className="leading-none">
            <span className="block text-lg font-bold text-heading">
              Delix<span className="text-accent">4</span>
            </span>
            <span className="block mt-1 text-[0.6rem] tracking-[0.25em] uppercase text-subtle-fg">Admin</span>
          </span>
        </Link>
        <nav aria-label="Admin" className="flex lg:flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active(l.href) ? 'page' : undefined}
              className={`flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active(l.href) ? 'bg-primary text-white' : 'text-body hover:bg-subtle hover:text-heading'
              }`}
            >
              <l.icon className="h-4 w-4 shrink-0" aria-hidden /> {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex lg:flex-col gap-1 ml-auto lg:ml-0 lg:mt-auto lg:pt-6 lg:border-t lg:border-line">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm text-body hover:bg-subtle hover:text-heading"
          >
            <ExternalLink className="h-4 w-4" aria-hidden /> <span className="hidden sm:inline">View website</span>
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm text-body hover:bg-subtle hover:text-heading"
            >
              <LogOut className="h-4 w-4" aria-hidden /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
