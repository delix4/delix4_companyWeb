import { Suspense } from 'react';
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { Section, SectionHeading } from '@/components/ui/primitives';
import { site } from '@/lib/site';

const channels = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with us now',
    href: site.whatsappHref,
    external: true,
  },
  { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: 'Phone', value: site.phone, href: site.phoneHref },
];

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: site.social.linkedin },
  { icon: Facebook, label: 'Facebook', href: site.social.facebook },
  { icon: Instagram, label: 'Instagram', href: site.social.instagram },
];

export function ContactDetails() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-5">
        <Clock className="h-5 w-5 text-primary shrink-0" aria-hidden />
        <p className="text-sm text-gray-300">
          <span className="text-white font-semibold">We reply {site.responseTime}</span> on
          business days, usually much sooner.
        </p>
      </div>

      <ul className="space-y-3">
        {channels.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-5 hover:border-primary/40 transition-colors"
            >
              <span className="w-11 h-11 rounded-xl bg-white/5 text-white flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                <c.icon className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-xs text-gray-500">{c.label}</span>
                <span className="block text-white font-medium">{c.value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3 px-1 text-sm text-gray-400">
        <MapPin className="h-4 w-4 text-primary" aria-hidden />
        {site.location} · Working with clients worldwide
      </div>

      <div className="flex gap-3 px-1">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Delix4 on ${s.label}`}
            className="w-11 h-11 rounded-full border border-white/10 bg-white/3 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <s.icon className="h-5 w-5" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}

export function ContactFormWithFallback() {
  return (
    <Suspense fallback={<div className="min-h-[600px] rounded-2xl border border-white/10 bg-white/3" />}>
      <ContactForm />
    </Suspense>
  );
}

export default function ContactSection() {
  return (
    <Section id="contact" tone="muted" aria-labelledby="contact-heading">
      <SectionHeading
        eyebrow="Start your project"
        title={<span id="contact-heading">Let&apos;s talk about what you&apos;re building</span>}
        description="Share a few details and we will come back with questions, ideas and a clear estimate. No obligation."
      />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-14">
        <ContactDetails />
        <ContactFormWithFallback />
      </div>
    </Section>
  );
}
