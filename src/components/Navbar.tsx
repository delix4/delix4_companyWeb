'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/case-studies' },
  { name: 'AI', href: '/services/ai-development' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === '/services') return pathname === '/services' || (pathname.startsWith('/services/') && pathname !== '/services/ai-development');
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-page/95 md:bg-page/85 md:backdrop-blur-xl border-b border-line shadow-sm shadow-ink/5'
          : 'bg-page/95 md:bg-transparent border-b border-line-soft md:border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main">
        <div className="flex items-center justify-between h-18 md:h-20">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Delix4 home">
            <Image
              src="/logo-mark.png"
              alt=""
              width={463}
              height={369}
              className="h-10 md:h-11 w-auto object-contain"
              priority
            />
            <span className="flex flex-col leading-none">
              <span className="text-2xl md:text-[1.7rem] font-bold tracking-tight text-heading">
                Delix<span className="text-primary">4</span>
              </span>
              <span className="mt-1 text-[0.55rem] font-medium tracking-[0.3em] text-subtle-fg uppercase">
                Software Solutions
              </span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive(link.href) ? 'text-link' : 'text-body hover:text-heading'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              Start Your Project
            </Link>
            <button
              onClick={() => setIsOpen((o) => !o)}
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-md text-body hover:text-link"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div id="mobile-menu" className="lg:hidden h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line-soft bg-page">
          <ul className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`block rounded-lg px-4 py-3.5 text-lg font-medium ${
                    isActive(link.href) ? 'text-link bg-subtle' : 'text-body hover:bg-subtle'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full rounded-full bg-primary py-3.5 text-center font-semibold text-white"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
