// Single source of truth for company details used across pages, metadata and structured data.
export const site = {
  name: 'Delix4',
  url: 'https://delix4.com',
  tagline: 'Building Digital Products That Help Businesses Grow',
  description:
    'Delix4 is a software development company building scalable web applications, mobile apps and AI solutions for startups and growing businesses.',
  email: 'hello@delix4.com',
  phone: '+94 77 630 9171',
  phoneHref: 'tel:+94776309171',
  whatsappHref:
    'https://wa.me/94776309171?text=' +
    encodeURIComponent("Hi Delix4, I'd like to discuss a project."),
  location: 'Colombo, Sri Lanka',
  foundingYear: 2026,
  responseTime: 'within 24 hours',
  social: {
    linkedin: 'https://www.linkedin.com/company/delix4',
    facebook: 'https://www.facebook.com/profile.php?id=61587168062633',
    instagram: 'https://www.instagram.com/delix4_?igsh=NDAxOXlzdjJyZG15',
    // TODO: add the company GitHub organisation URL once it is public.
    github: '',
  },
} as const;

export const absoluteUrl = (path = '') => `${site.url}${path}`;
