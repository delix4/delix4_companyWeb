import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Delix4 | Innovating Digital Partnerships",
  description:
    "Delix4 is a software solutions company building modern websites, mobile apps, and scalable cloud systems.",
  metadataBase: new URL("https://www.delix4.com"),
  openGraph: {
    title: "Delix4 | Innovating Digital Partnerships",
    description:
      "We build modern websites, mobile apps, and scalable digital systems for growing businesses.",
    url: "https://www.delix4.com",
    siteName: "Delix4",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Delix4",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delix4 | Innovating Digital Partnerships",
    description:
      "We build modern websites, mobile apps, and scalable digital systems for growing businesses.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
