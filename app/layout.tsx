import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import "./globals.css"

const outfit400 = Outfit({ weight: "400", variable: "--font-body" })
const outfit800 = Outfit({ weight: "800", variable: "--font-display" })

export const metadata: Metadata = {
  title: "bleedproof – Druckworkshops",
  description: "Siebdruck, Risodruck, Linoldruck und 3D-Druck. Buche einen Workshop und lerne drucken in Zürich.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bleedproof.ch"),
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className={`${outfit400.variable} ${outfit800.variable} antialiased break-words min-h-dvh m-0`}>
        <Navigation />
        {children}
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
