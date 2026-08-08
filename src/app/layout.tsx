import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = "https://delix4.com";
const title = "Delix4 - Innovative Solutions";
const description = "Delix4 builds high-performance websites, mobile apps, and digital marketing solutions for modern businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Delix4",
  },
  description,
  keywords: ["Delix4", "web development", "mobile apps", "digital marketing", "software consulting", "Sri Lanka"],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/tablogo.png", sizes: "192x192", type: "image/png" },
      { url: "/tablogo.png", sizes: "32x32", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Delix4",
    title,
    description,
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Delix4",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    email: "hello@delix4.com",
    telephone: "+94776309171",
  };

  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased flex flex-col min-h-screen bg-black`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <MotionConfig reducedMotion="user">
          <ScrollProgress />
          <div className="bg-noise"></div>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <WhatsAppButton />
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
