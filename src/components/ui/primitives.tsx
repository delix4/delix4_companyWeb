import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

const variants = {
  primary:
    'bg-primary text-white font-semibold hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-primary/35',
  secondary:
    'bg-card text-heading font-medium border border-line-strong hover:bg-subtle hover:border-primary/50',
  ghost: 'text-link font-medium hover:text-link-hover px-0',
};

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'lg',
  arrow = false,
  className = '',
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, 'href' | 'className'>) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 active:scale-[0.98] ${variants[variant]} ${variant === 'ghost' ? '' : sizes[size]} ${className}`}
      {...rest}
    >
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  as: Heading = 'h2',
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2';
}) {
  const centered = align === 'center';
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center mx-auto' : ''} max-w-3xl`}>
      {eyebrow && (
        <p className="text-link font-semibold tracking-widest uppercase text-xs md:text-sm mb-3">
          {eyebrow}
        </p>
      )}
      <Heading
        className={`font-bold text-heading tracking-tight text-balance ${Heading === 'h1' ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl'}`}
      >
        {title}
      </Heading>
      {description && (
        <p className={`mt-5 text-lg text-muted leading-relaxed ${centered ? 'mx-auto' : ''} max-w-2xl`}>
          {description}
        </p>
      )}
    </div>
  );
}

export function Section({
  id,
  children,
  className = '',
  tone = 'default',
  ...rest
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'muted';
} & ComponentProps<'section'>) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 relative ${tone === 'muted' ? 'bg-page-alt' : 'bg-page'} ${className}`}
      {...rest}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-subtle border border-line text-xs text-body">
      {children}
    </span>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
