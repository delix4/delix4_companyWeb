import type { ServiceSlug } from './services';

/**
 * How a project came about. Shown as a badge so visitors can tell real client work
 * apart from internal products and concepts.
 */
export type ProjectType = 'client' | 'in-house' | 'research' | 'concept';

export const projectTypeLabel: Record<ProjectType, string> = {
  client: 'Client Project',
  'in-house': 'In-house Product',
  research: 'R&D Project',
  concept: 'Concept / Demo',
};

export interface CaseStudy {
  slug: string;
  name: string;
  type: ProjectType;
  category: string;
  service: ServiceSlug;
  year: number;
  featured: boolean;
  tagline: string;
  metaDescription: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: { title: string; description: string }[];
  /** Ordered architecture layers, rendered as a flow diagram. */
  architecture?: { label: string; detail: string }[];
  /**
   * Verified results only. Leave empty until real numbers are available —
   * the Results block is hidden when there is nothing to show.
   */
  metrics: { value: string; label: string }[];
  outcomes: string[];
  /** Image paths under /public. The gallery is hidden when empty. */
  screenshots: { src: string; alt: string }[];
  links?: { label: string; href: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-hydration-monitoring',
    name: 'AI-Powered Hydration Monitoring',
    type: 'research',
    category: 'AI & Mobile',
    service: 'ai-development',
    year: 2026,
    featured: true,
    tagline:
      'A mobile health app that predicts hydration needs with machine learning and detects signs of dehydration from a photo.',
    metaDescription:
      'Case study: how Delix4 built an AI hydration monitoring app using XGBoost forecasting and MobileNetV2 computer vision to detect dehydration from lip images.',
    problem:
      'Dehydration is common and easy to miss. Most hydration apps simply count glasses of water and send generic reminders, ignoring the factors that actually change how much a person needs — activity, environment and individual habits. There was no simple, non-invasive way for users to check for visible signs of dehydration themselves.',
    solution:
      'We built a mobile application that combines two machine learning models. An XGBoost model forecasts each user’s hydration needs from their personal data and habits, and a MobileNetV2 computer vision model analyses a photo of the user’s lips to detect visible signs of dehydration. The results are turned into personalised insights and recommendations inside the app.',
    technologies: ['Python', 'XGBoost', 'MobileNetV2', 'Computer Vision', 'Mobile App'],
    features: [
      {
        title: 'Hydration forecasting',
        description:
          'An XGBoost model predicts hydration levels and needs from user-specific inputs rather than a fixed daily target.',
      },
      {
        title: 'Dehydration detection from images',
        description:
          'A MobileNetV2 convolutional neural network classifies lip images to flag visible signs of dehydration.',
      },
      {
        title: 'Personalised recommendations',
        description:
          'Model outputs are translated into clear, actionable guidance tailored to each user.',
      },
      {
        title: 'Mobile-friendly vision model',
        description:
          'MobileNetV2 is a compact CNN architecture designed for mobile use, keeping image analysis fast and lightweight.',
      },
    ],
    architecture: [
      { label: 'Mobile App', detail: 'User inputs, daily logging and camera capture' },
      { label: 'API Layer', detail: 'Validates requests and routes them to the right model' },
      { label: 'XGBoost Model', detail: 'Hydration level forecasting from tabular user data' },
      { label: 'MobileNetV2 Model', detail: 'Lip-image classification for dehydration signs' },
      { label: 'Insights Engine', detail: 'Combines predictions into personalised recommendations' },
    ],
    // TODO: add verified results (e.g. model accuracy, F1 score, dataset size) when available.
    metrics: [],
    outcomes: [
      'Combined tabular machine learning and computer vision in a single consumer product',
      'Demonstrated a non-invasive, camera-based approach to dehydration screening',
      'Delivered personalised guidance instead of one-size-fits-all reminders',
    ],
    // TODO: add app screenshots to /public/case-studies/hydration/ and list them here.
    screenshots: [],
  },
  {
    slug: 'delix4-web-platform',
    name: 'Delix4 Web Platform',
    type: 'in-house',
    category: 'Web Development',
    service: 'web-development',
    year: 2026,
    featured: false,
    tagline:
      'Our own company platform — a fast, SEO-ready Next.js site with a secure lead-capture pipeline.',
    metaDescription:
      'Case study: the Delix4 company platform, built with Next.js, TypeScript and Tailwind CSS, featuring a hardened contact API, structured data and strong Core Web Vitals.',
    problem:
      'As a new company we needed a website that clearly explains what we do, earns trust from international clients, ranks in search, and makes it easy for prospects to start a conversation — without the overhead of a heavy CMS.',
    solution:
      'We built a statically optimised Next.js application with server components, typed content files and a secure contact API. Every page ships with metadata, Open Graph tags and Schema.org structured data, and project enquiries go straight to our inbox.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Nodemailer', 'Netlify'],
    features: [
      {
        title: 'Server-rendered pages',
        description:
          'Static generation and React Server Components keep JavaScript small and pages fast.',
      },
      {
        title: 'Hardened contact API',
        description:
          'Rate limiting, input validation, header-injection protection and HTML escaping on every submission.',
      },
      {
        title: 'Technical SEO built in',
        description:
          'Per-page metadata, canonical URLs, sitemap, robots rules and JSON-LD structured data.',
      },
      {
        title: 'Accessible by default',
        description:
          'Semantic landmarks, keyboard focus states and reduced-motion support throughout.',
      },
    ],
    architecture: [
      { label: 'Next.js App Router', detail: 'Static pages generated at build time' },
      { label: 'Typed Content', detail: 'Services and case studies as TypeScript data' },
      { label: 'Contact API', detail: 'Validated, rate-limited serverless route' },
      { label: 'SMTP', detail: 'Enquiries delivered to the Delix4 inbox' },
    ],
    metrics: [],
    outcomes: [
      'A single place for clients to understand our services and past work',
      'Lead capture in one or two clicks from any page',
      'A reusable foundation we apply to client websites',
    ],
    screenshots: [],
    links: [{ label: 'Visit delix4.com', href: 'https://delix4.com' }],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const featuredCaseStudy = caseStudies.find((c) => c.featured) ?? caseStudies[0];
