import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Delix4 - Innovative Solutions",
  description: "Innovative solutions for modern businesses.",
  icons: {
    icon: [
      { url: "/tablogo.png", sizes: "192x192", type: "image/png" },
      { url: "/tablogo.png", sizes: "32x32", type: "image/png" },
    ],
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
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased flex flex-col min-h-screen bg-black`}
      >
        <ScrollProgress />
        <div className="bg-noise"></div>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
