"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Sun, Moon, Home, Compass, BarChart2, User, Settings } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { getTemperatureColor } from "@/utils/color-utils"
import { NotificationSystem } from "@/components/notification-system"

export function PWALayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [temperature, setTemperature] = useState(20) // Default temperature

  useEffect(() => {
    setMounted(true)
    // Simulating temperature fetch. In a real app, you'd fetch this from a weather API
    setTemperature(Math.floor(Math.random() * 40) - 5)
  }, [])

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/discover", icon: Compass, label: "Discover" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/stats", icon: BarChart2, label: "Stats" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ]

  const temperatureColor = getTemperatureColor(temperature)

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br ${temperatureColor}`}>
      <NotificationSystem />
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Serenity
          </Link>
          {mounted && (
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="sticky bottom-0 z-10 bg-background/80 backdrop-blur-sm border-t">
        <nav className="container mx-auto px-4 py-2">
          <ul className="flex justify-around">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex flex-col items-center p-2">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <item.icon
                      className={`h-6 w-6 ${pathname === item.href ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </motion.div>
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </div>
  )
}

