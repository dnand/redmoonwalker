import type { Metadata } from "next"
import { Syne } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Celebrate } from "@/components/Celebrate"
import { ProductComparison } from "@/components/ProductComparison"

const syne = Syne({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Redmoon Walkers - Premium Shoemaking Patterns, Materials & Guides",
  description: "Discover premium patterns, materials, and step-by-step guides for the modern shoemaking community.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${syne.variable} font-sans`}>
        <Navbar />
        <main className="min-h-screen pb-24">{children}</main>
        <Footer />
        <ProductComparison />
        <Toaster />
        <Celebrate />
      </body>
    </html>
  )
}

