import type { CSSProperties, ReactNode } from 'react';

/**
 * Subtle fade-up as the element scrolls into view, done entirely in CSS (see `.reveal` in
 * globals.css). Content is visible by default: browsers without scroll-driven animations,
 * visitors who prefer reduced motion and phones still loading JavaScript all see it at once.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={delay ? ({ '--reveal-delay': `${Math.round(delay * 200)}px` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
