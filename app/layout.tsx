import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import "@/styles/animations.css"
import "@/styles/products.css"
import "@/styles/forms.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/contexts/cart-context"
import { FloatingChat } from "@/components/floating-chat"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "ZERO GRAUS | Uniformes Escolares em Moçambique",
  description:
    "Loja especializada em uniformes escolares (primária e secundária), bordados personalizados, estampagens de camisas e roupas de segurança em Maputo, Moçambique.",
  keywords: [
    "uniformes escolares",
    "uniformes primária",
    "uniformes secundária",
    "bordados",
    "estampagens",
    "roupas segurança",
    "Moçambique",
    "Maputo",
    "Matola",
  ],
  authors: [{ name: "ZERO GRAUS" }],
  creator: "ZERO GRAUS",
  publisher: "ZERO GRAUS",
  openGraph: {
    type: "website",
    locale: "pt_MZ",
    url: "https://zerograus.co.mz",
    siteName: "ZERO GRAUS",
    title: "ZERO GRAUS | Uniformes Escolares em Moçambique",
    description:
      "Uniformes escolares de qualidade, bordados personalizados e roupas de segurança. Atendemos primária e secundária.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZERO GRAUS - Uniformes Escolares",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZERO GRAUS | Uniformes Escolares em Moçambique",
    description:
      "Loja especializada em uniformes escolares (primária e secundária), bordados personalizados, estampagens de camisas e roupas de segurança em Maputo, Moçambique.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ClothingStore",
              name: "ZERO GRAUS",
              description: "Uniformes escolares, bordados personalizados e roupas de segurança",
              url: "https://zerograus.co.mz",
              telephone: "+258848304000",
              email: "zguniforme@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Julius Nyerere",
                addressLocality: "Maputo",
                addressCountry: "MZ",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "-25.9655",
                longitude: "32.5832",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "14:00",
                },
              ],
              priceRange: "$$",
              image: "https://zerograus.co.mz/og-image.jpg",
            }),
          }}
        />
        {/* Preconnect to optimize external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingChat />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
