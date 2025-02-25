import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PWALayout } from "@/components/pwa-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Serenity Routine",
  description: "Your personal wellness companion",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PWALayout>{children}</PWALayout>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'