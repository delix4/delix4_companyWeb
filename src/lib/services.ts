export type ServiceSlug =
  | 'web-development'
  | 'mobile-app-development'
  | 'ai-development'
  | 'software-development';

export interface Service {
  slug: ServiceSlug;
  /** Short name used on cards and navigation. */
  name: string;
  /** H1 on the service page; carries the primary keyword. */
  headline: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  intro: string;
  whatWeBuild: string[];
  technologies: string[];
  benefits: { title: string; description: string }[];
  useCases: string[];
  /** Whether this is one of the three core services shown on the homepage. */
  core: boolean;
  relatedCaseStudies: string[];
}

export const services: Service[] = [
  {
    slug: 'web-development',
    name: 'Web Development',
    headline: 'Web Development for Startups and Growing Businesses',
    metaTitle: 'Web Development Company – Custom Websites & Web Apps',
    metaDescription:
      'Delix4 builds fast, secure and SEO-ready websites and web applications with Next.js, React and TypeScript. Get a free project estimate.',
    summary:
      'Fast, secure websites and web applications that turn visitors into customers and scale with your business.',
    intro:
      'Your website is often the first conversation you have with a customer. We build web products that load quickly, rank well in search, and are easy for your team to maintain — from marketing sites to full SaaS platforms.',
    whatWeBuild: [
      'Business and marketing websites',
      'Custom web applications and dashboards',
      'SaaS platforms and customer portals',
      'E-commerce and booking systems',
      'APIs and backend services',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Supabase', 'AWS'],
    benefits: [
      {
        title: 'Faster load times',
        description:
          'Server rendering, image optimisation and lean JavaScript keep pages fast on mobile networks.',
      },
      {
        title: 'Built to be found',
        description:
          'Semantic HTML, structured data and technical SEO are part of every build, not an add-on.',
      },
      {
        title: 'Easy to grow',
        description:
          'Typed, modular code means new features can be added without rewriting what already works.',
      },
    ],
    useCases: [
      'A startup launching an MVP to validate a product idea',
      'A business replacing an outdated website that does not generate leads',
      'A team moving spreadsheet workflows into a secure internal dashboard',
    ],
    core: true,
    relatedCaseStudies: ['delix4-web-platform'],
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    headline: 'Mobile App Development for iOS and Android',
    metaTitle: 'Mobile App Development – iOS & Android Apps',
    metaDescription:
      'Cross-platform mobile app development for iOS and Android with Flutter. Delix4 designs, builds and launches apps your users enjoy.',
    summary:
      'Cross-platform iOS and Android apps with a native feel, built from one codebase to reduce cost and time to market.',
    intro:
      'We build mobile apps that people keep using. One shared codebase for iOS and Android keeps your budget focused on features, while careful UX and performance work make the app feel native on every device.',
    whatWeBuild: [
      'Cross-platform iOS and Android apps',
      'Customer-facing consumer apps',
      'Health, fitness and wellbeing apps',
      'Field-service and internal business apps',
      'App backends, push notifications and analytics',
    ],
    technologies: ['Flutter', 'Firebase', 'Node.js', 'Python', 'REST & GraphQL APIs'],
    benefits: [
      {
        title: 'One codebase, two platforms',
        description:
          'Ship to the App Store and Google Play together and maintain a single codebase afterwards.',
      },
      {
        title: 'Designed for retention',
        description:
          'Clear onboarding, offline-friendly flows and thoughtful notifications keep users engaged.',
      },
      {
        title: 'Store-ready launch',
        description:
          'We handle builds, store listings and release management so your launch is smooth.',
      },
    ],
    useCases: [
      'A health product that needs a companion app for daily tracking',
      'A service business that wants customers to book and pay from their phone',
      'An existing web product that needs a mobile app for its users',
    ],
    core: true,
    relatedCaseStudies: ['ai-hydration-monitoring'],
  },
  {
    slug: 'ai-development',
    name: 'AI Solutions',
    headline: 'AI & Machine Learning Development Services',
    metaTitle: 'AI Development Services – Machine Learning & Computer Vision',
    metaDescription:
      'Delix4 builds practical AI solutions: machine learning models, computer vision, predictive analytics and AI API integrations for real business problems.',
    summary:
      'Practical machine learning, computer vision and AI integrations that automate work and turn your data into decisions.',
    intro:
      'AI is only useful when it solves a real problem reliably. We help you identify where machine learning adds value, build and evaluate models on your data, and ship them inside products people actually use.',
    whatWeBuild: [
      'Predictive models and forecasting',
      'Computer vision and image classification',
      'AI-powered features inside web and mobile apps',
      'LLM and AI API integrations (chat, search, summarisation)',
      'Workflow automation and data pipelines',
    ],
    technologies: ['Python', 'XGBoost', 'MobileNetV2', 'Computer Vision', 'AI APIs'],
    benefits: [
      {
        title: 'Decisions from data',
        description:
          'Forecasts and classifications that help you act earlier and with more confidence.',
      },
      {
        title: 'Less manual work',
        description: 'Automate repetitive review, tagging and data-entry tasks so your team can focus.',
      },
      {
        title: 'Production, not prototypes',
        description:
          'Models are evaluated, deployed behind APIs and integrated into your product end to end.',
      },
    ],
    useCases: [
      'Predicting a user’s future state from behavioural and sensor data',
      'Classifying images captured on a phone camera',
      'Adding an AI assistant or smart search to an existing product',
    ],
    core: true,
    relatedCaseStudies: ['ai-hydration-monitoring'],
  },
  {
    slug: 'software-development',
    name: 'Custom Software Development',
    headline: 'Custom Software Development Company',
    metaTitle: 'Custom Software Development Company',
    metaDescription:
      'End-to-end custom software development from Delix4 — discovery, UI/UX design, engineering and long-term support for web, mobile and AI products.',
    summary:
      'End-to-end product development: from discovery and design to engineering, launch and ongoing support.',
    intro:
      'Some problems need more than a single app. We act as your product engineering team — shaping requirements, designing the experience, and building the web, mobile and AI pieces as one coherent system.',
    whatWeBuild: [
      'MVPs for early-stage startups',
      'Multi-platform products (web, mobile and backend)',
      'Integrations with third-party services and APIs',
      'Modernisation of legacy systems',
      'Ongoing maintenance and feature development',
    ],
    technologies: ['TypeScript', 'Python', 'Node.js', 'Next.js', 'Flutter', 'Docker', 'AWS'],
    benefits: [
      {
        title: 'One accountable team',
        description: 'Design, engineering and AI work handled together, with one point of contact.',
      },
      {
        title: 'Transparent progress',
        description: 'Regular demos and clear milestones so you always know where the project stands.',
      },
      {
        title: 'You own the code',
        description: 'Full source code and documentation are handed over — no lock-in.',
      },
    ],
    useCases: [
      'A founder who needs a technical partner to take an idea to launch',
      'A business connecting several tools into one streamlined system',
      'A product team that needs extra engineering capacity',
    ],
    core: false,
    relatedCaseStudies: ['ai-hydration-monitoring', 'delix4-web-platform'],
  },
];

export const coreServices = services.filter((s) => s.core);

export const getService = (slug: string) => services.find((s) => s.slug === slug);
