import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "bleedproof — Workshops in Zürich",
    template: "%s — bleedproof",
  },
  description:
    "Screen printing, risography, linocut, and 3D printing workshops in Zürich. Hands-on creative techniques for beginners and experienced makers alike.",
  keywords: [
    "screen printing",
    "risography",
    "linocut",
    "3D printing",
    "workshop",
    "Zürich",
    "print",
    "craft",
    "bleedproof",
  ],
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bleedproof.ch",
    siteName: "bleedproof",
    title: "bleedproof — Workshops in Zürich",
    description:
      "Screen printing, risography, linocut, and 3D printing workshops in Zürich.",
  },
  twitter: {
    card: "summary_large_image",
    title: "bleedproof — Workshops in Zürich",
    description:
      "Screen printing, risography, linocut, and 3D printing workshops in Zürich.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F4F0E6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="bg-background">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} font-sans bg-background text-foreground antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
