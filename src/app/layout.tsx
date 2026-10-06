import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollProgress from '@/components/ScrollProgress';
import { JsonLd } from '@/components/ui/primitives';
import { services } from '@/lib/services';
import { site } from '@/lib/site';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Only used for small decorative code snippets, so it is not preloaded.
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});

const defaultTitle = 'Delix4 – Web, Mobile & AI Software Development Company';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Short browser-tab title for the homepage; the descriptive title is kept for social previews.
  title: {
    default: 'Delix4.com',
    template: '%s | Delix4',
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'software development company',
    'web development company',
    'mobile app development',
    'AI development services',
    'machine learning development',
    'custom software development',
    'Next.js development',
    'Flutter app development',
    'Sri Lanka software company',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/tablogo.png', type: 'image/png' }],
    apple: '/tablogo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: site.description,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
  colorScheme: 'dark',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/logo.png`,
      description: site.description,
      foundingDate: String(site.foundingYear),
      email: site.email,
      telephone: '+94776309171',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Colombo',
        addressCountry: 'LK',
      },
      sameAs: Object.values(site.social).filter(Boolean),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email,
        telephone: '+94776309171',
        availableLanguage: ['English'],
      },
      makesOffer: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: `${site.url}/services/${s.slug}` },
      })),
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { '@id': `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased flex flex-col min-h-screen bg-black`}
      >
        <JsonLd data={organizationJsonLd} />
        <MotionConfig reducedMotion="user">
          <ScrollProgress />
          <Navbar />
          <main id="main" className="flex-grow">
            {children}
          </main>
          <WhatsAppButton />
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
