"use client"

import { useState, useEffect } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const quotes = [
  "Take care of your body. It's the only place you have to live.",
  "The greatest wealth is health.",
  "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
  "Self-care is not selfish. You cannot serve from an empty vessel.",
  "Happiness is the highest form of health.",
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [quote, setQuote] = useState("")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    return () => clearInterval(timer)
  }, [])

  const getDayOfYear = (date: Date) => {
    const start = new Date(date.getFullYear(), 0, 0)
    const diff = date.getTime() - start.getTime() + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000
    const oneDay = 1000 * 60 * 60 * 24
    return Math.floor(diff / oneDay)
  }

  return (
    <header className="space-y-4 mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Serenity Routine</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
      <div className="text-center italic">&quot;{quote}&quot;</div>
      <div className="flex justify-between items-center text-sm">
        <div>{currentTime.toLocaleDateString()}</div>
        <div>{currentTime.toLocaleTimeString()}</div>
        <div>Day {getDayOfYear(currentTime)} of the year</div>
      </div>
    </header>
  )
}

