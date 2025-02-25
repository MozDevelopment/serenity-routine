"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import quotes from "@/data/quotes.json"
import { HabitTrackingCard } from "@/components/habit-tracking-card"

const checkIns = [
  { emoji: "😊", title: "Mood Check-In", route: "/check-in/mood", color: "from-yellow-300 to-yellow-500" },
  { emoji: "🙏", title: "Gratitude Check-In", route: "/check-in/gratitude", color: "from-green-300 to-green-500" },
  { emoji: "🤔", title: "Daily Reflection", route: "/check-in/reflection", color: "from-blue-300 to-blue-500" },
  { emoji: "😴", title: "Sleep Check-In", route: "/check-in/sleep", color: "from-purple-300 to-purple-500" },
]

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState("")
  const currentDate = new Date()
  const dayOfWeek = days[currentDate.getDay()]
  const dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)

  useEffect(() => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to Serenity Routine</h1>
      <p className="text-xl mb-4 text-center italic">&quot;{currentQuote}&quot;</p>
      <div className="text-xl mb-8 text-center">
        <p>{dayOfWeek}</p>
        <p>Day {dayOfYear} of the year</p>
        <p>{currentDate.toLocaleTimeString()}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {checkIns.map((checkIn, index) => (
          <motion.div
            key={checkIn.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={checkIn.route}>
              <Card className={`hover:bg-gradient-to-br ${checkIn.color} transition-all duration-300 cursor-pointer`}>
                <CardHeader>
                  <CardTitle className="text-center">
                    <span className="text-4xl mb-2">{checkIn.emoji}</span>
                    <br />
                    {checkIn.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 w-full max-w-4xl">
        <HabitTrackingCard />
      </div>
    </main>
  )
}

