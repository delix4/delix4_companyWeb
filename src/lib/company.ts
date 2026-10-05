import { site } from './site';

/*
 * Trust content. Only add genuine information here — every list renders nothing when empty,
 * so the site never shows placeholder people, quotes or awards.
 */

export interface TeamMember {
  name: string;
  role: string;
  /** Path under /public, e.g. /team/jane.jpg (square, at least 400x400). */
  photo?: string;
  bio?: string;
  skills: string[];
  linkedin?: string;
  github?: string;
}

// TODO: add founders and team members.
export const team: TeamMember[] = [];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Link to the related case study, if any. */
  caseStudy?: string;
}

// TODO: add client testimonials (with the client's written permission).
export const testimonials: Testimonial[] = [];

export interface Achievement {
  title: string;
  issuer: string;
  year: number;
  href?: string;
}

// TODO: add certifications, awards and research publications.
export const achievements: Achievement[] = [];

// Verified company numbers. Keep these in sync with reality.
export const stats = [
  { value: String(site.foundingYear), label: 'Founded' },
  { value: '2', label: 'Products shipped' },
  { value: '1', label: 'Client onboarded' },
  { value: '<24h', label: 'Response time' },
];

export const process = [
  {
    title: 'Discovery',
    description:
      'We learn about your business, users and goals, and agree on what success looks like.',
    deliverable: 'Project brief & estimate',
  },
  {
    title: 'Planning',
    description:
      'We define scope, features, architecture and milestones so there are no surprises later.',
    deliverable: 'Roadmap & technical plan',
  },
  {
    title: 'UI/UX Design',
    description:
      'Wireframes and interactive designs you can click through and give feedback on before code is written.',
    deliverable: 'Clickable prototype',
  },
  {
    title: 'Development',
    description:
      'Agile sprints with regular demos. You see working software early and often.',
    deliverable: 'Tested, working product',
  },
  {
    title: 'Launch & Support',
    description:
      'We deploy, monitor and support your product, then help you plan the next iteration.',
    deliverable: 'Live product & support',
  },
];

export interface Package {
  name: string;
  description: string;
  /** Set to a string such as "$1,500" to show "Starting from"; null shows "Custom quote". */
  startingFrom: string | null;
  timeline: string;
  includes: string[];
  highlighted?: boolean;
}

// TODO: set startingFrom values once pricing is confirmed.
export const packages: Package[] = [
  {
    name: 'Business Website',
    description: 'A professional, fast and SEO-ready website that generates enquiries.',
    startingFrom: null,
    timeline: 'Typically 2–4 weeks',
    includes: [
      'Custom responsive design',
      'Up to 8 pages',
      'On-page & technical SEO',
      'Contact forms & analytics',
      '30 days post-launch support',
    ],
  },
  {
    name: 'Web Application',
    description: 'Custom dashboards, portals and SaaS products built to scale.',
    startingFrom: null,
    timeline: 'Typically 6–12 weeks',
    includes: [
      'Discovery & UX design',
      'User accounts & roles',
      'Database & API development',
      'Admin dashboard',
      'Cloud deployment',
    ],
    highlighted: true,
  },
  {
    name: 'Mobile Application',
    description: 'Cross-platform iOS and Android apps from a single codebase.',
    startingFrom: null,
    timeline: 'Scoped after discovery',
    includes: [
      'iOS & Android from one codebase',
      'UI/UX design & prototype',
      'Backend & push notifications',
      'App Store & Google Play release',
      '30 days post-launch support',
    ],
  },
  {
    name: 'AI Solution',
    description: 'Machine learning, computer vision or AI integrations for a specific problem.',
    startingFrom: null,
    timeline: 'Scoped after discovery',
    includes: [
      'Feasibility & data assessment',
      'Model training & evaluation',
      'API deployment',
      'Integration into your product',
      'Performance monitoring',
    ],
  },
];

export const faqs = [
  {
    question: 'How long does a typical project take?',
    answer:
      'It depends on scope. Business websites typically take 2–4 weeks and web applications 6–12 weeks. Mobile and AI projects are scoped after a discovery call. You get a detailed timeline before any work begins.',
  },
  {
    question: 'How much does a project cost?',
    answer:
      'Every project is quoted individually based on scope, features and timeline. Tell us about your project and we will send a clear, itemised estimate — there is no cost for the initial consultation.',
  },
  {
    question: 'Do you offer post-launch support?',
    answer:
      'Yes. Every project includes 30 days of free support after launch. After that we offer flexible maintenance plans to keep your product secure and up to date.',
  },
  {
    question: 'How do payments work?',
    answer:
      'We typically work with a 50% deposit to start, with the remaining balance due on delivery and your final approval. Larger projects can be split into milestone payments.',
  },
  {
    question: 'Do I own the source code?',
    answer:
      'Yes. Once the project is paid for, you own the full source code, designs and documentation.',
  },
  {
    question: 'Do you work with international clients?',
    answer:
      'Yes. We work remotely with clients in any time zone and communicate through email, WhatsApp, video calls and shared project boards.',
  },
  {
    question: 'Can you help with hosting and domains?',
    answer:
      'Yes. We handle domain setup, secure hosting, SSL and deployment so you do not have to worry about the technical details.',
  },
];
