import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { services } from '@/lib/services';
import { site } from '@/lib/site';

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

const socials = [
  { name: 'LinkedIn', href: site.social.linkedin, icon: Linkedin },
  { name: 'GitHub', href: site.social.github, icon: Github },
  { name: 'Facebook', href: site.social.facebook, icon: Facebook },
  { name: 'Instagram', href: site.social.instagram, icon: Instagram },
].filter((s) => s.href);

const linkClass = 'inline-block py-1.5 text-muted hover:text-link transition-colors text-sm';

const Footer = () => {
  return (
    <footer className="theme-dark bg-page border-t border-line text-heading">
      <div className="max-w-7xl mx-auto pt-16 pb-28 md:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12">
          <div>
            <Link href="/" aria-label="Delix4 home" className="inline-flex items-center gap-3">
              <Image src="/tablogo.png" alt="" width={192} height={192} className="h-14 w-14 rounded-2xl ring-1 ring-white/10" />
              <span className="flex flex-col leading-none">
                <span className="text-3xl font-bold tracking-tight text-heading">
                  Delix<span className="text-accent">4</span>
                </span>
                <span className="mt-1.5 text-[0.6rem] font-medium tracking-[0.3em] text-subtle-fg uppercase">
                  Software Solutions
                </span>
              </span>
            </Link>
            <p className="mt-4 text-muted text-sm leading-relaxed max-w-xs">
              Delix4 is a software development company building web applications, mobile apps and
              AI solutions for startups and growing businesses.
            </p>
            <ul className="mt-6 flex gap-3">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Delix4 on ${s.name}`}
                    className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted hover:text-link hover:border-primary/40 transition-colors"
                  >
                    <s.icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-heading">Services</h2>
            <ul className="mt-4 space-y-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-heading">Company</h2>
            <ul className="mt-4 space-y-1">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-heading">Contact</h2>
            <ul className="mt-4 space-y-1 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className={`${linkClass} inline-flex items-center gap-2`}>
                  <Mail className="h-4 w-4" aria-hidden /> {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className={`${linkClass} inline-flex items-center gap-2`}>
                  <Phone className="h-4 w-4" aria-hidden /> {site.phone}
                </a>
              </li>
              <li>
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                  <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-muted">
                <MapPin className="h-4 w-4" aria-hidden /> {site.location}
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              Start Your Project
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-subtle-fg text-sm">
            &copy; {new Date().getFullYear()} Delix4. All rights reserved.
          </p>
          <ul className="flex gap-6 text-sm">
            <li>
              <Link href="/privacy" className="inline-block py-1.5 text-subtle-fg hover:text-heading">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="inline-block py-1.5 text-subtle-fg hover:text-heading">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
