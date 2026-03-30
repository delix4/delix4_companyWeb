import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollProgress from '@/components/ScrollProgress';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Delix4 - Web Development, Mobile Apps & Digital Solutions',
  description: 'Transform your business with innovative web development, mobile applications, and digital marketing solutions. Expert tech strategy and digital transformation services.',
  keywords: 'web development, mobile apps, digital marketing, software development, digital transformation, tech consulting, Next.js, React',
  authors: [{ name: 'Delix4' }],
  creator: 'Delix4',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://delix4.com',
    title: 'Delix4 - Innovative Digital Solutions for Modern Businesses',
    description: 'Transform your business with cutting-edge web development, mobile apps, and digital marketing solutions.',
    images: [
      {
        url: 'https://delix4.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Delix4 - Digital Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delix4 - Innovative Digital Solutions',
    description: 'Transform your business with web development, mobile apps & digital marketing',
  },
  icons: {
    icon: [
      { url: '/tablogo.png', sizes: '192x192', type: 'image/png' },
      { url: '/tablogo.png', sizes: '32x32', type: 'image/png' },
    ],
  },
  robots: 'index, follow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
        <ScrollProgress />
        <div className="bg-noise"></div>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
