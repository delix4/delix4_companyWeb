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
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main">
        <div className="flex items-center justify-between h-18 md:h-20">
          <Link href="/" className="flex items-center shrink-0" aria-label="Delix4 home">
            <Image
              src="/logo.png"
              alt="Delix4"
              width={350}
              height={163}
              className="h-14 md:h-16 w-auto object-contain"
              priority
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive(link.href) ? 'text-primary' : 'text-gray-300 hover:text-white'
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
              className="hidden sm:inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-black hover:bg-yellow-300 transition-colors"
            >
              Start Your Project
            </Link>
            <button
              onClick={() => setIsOpen((o) => !o)}
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-md text-gray-300 hover:text-primary"
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
        <div id="mobile-menu" className="lg:hidden h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/5 bg-black">
          <ul className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`block rounded-lg px-4 py-3.5 text-lg font-medium ${
                    isActive(link.href) ? 'text-primary bg-white/5' : 'text-gray-200 hover:bg-white/5'
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
              className="block w-full rounded-full bg-primary py-3.5 text-center font-semibold text-black"
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
