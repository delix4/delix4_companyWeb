import type { MetadataRoute } from 'next';
import { services } from '@/lib/services';
import { getPublishedProjects } from '@/lib/content';
import { site } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await getPublishedProjects();
  const lastModified = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified,
    priority,
  });

  return [
    entry('', 1),
    entry('/services', 0.9),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.9)),
    entry('/case-studies', 0.8),
    ...caseStudies.map((c) => entry(`/case-studies/${c.slug}`, 0.8)),
    entry('/about', 0.7),
    entry('/pricing', 0.7),
    entry('/contact', 0.8),
    entry('/careers', 0.5),
    entry('/privacy', 0.2),
    entry('/terms', 0.2),
  ];
}
