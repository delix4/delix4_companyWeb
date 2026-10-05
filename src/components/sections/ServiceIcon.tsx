import { Brain, Code2, Layers, Smartphone, type LucideProps } from 'lucide-react';
import type { ServiceSlug } from '@/lib/services';

const icons = {
  'web-development': Code2,
  'mobile-app-development': Smartphone,
  'ai-development': Brain,
  'software-development': Layers,
} satisfies Record<ServiceSlug, unknown>;

export default function ServiceIcon({ slug, ...props }: { slug: ServiceSlug } & LucideProps) {
  const Icon = icons[slug];
  return <Icon aria-hidden {...props} />;
}
