"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"

const tools = [
  { name: "Mood Check-In", route: "/check-in/mood", description: "Track your daily mood" },
  { name: "Energy Levels", route: "/check-in/energy", description: "Monitor your energy throughout the day" },
  { name: "Gratitude Journal", route: "/check-in/gratitude", description: "Practice daily gratitude" },
  { name: "Sleep Tracker", route: "/check-in/sleep", description: "Log your sleep patterns" },
  { name: "Meditation Timer", route: "/tools/meditation", description: "Guide your meditation sessions" },
  { name: "Breathing Exercises", route: "/tools/breathing", description: "Practice calming breathing techniques" },
  { name: "Thought Journal", route: "/tools/journal", description: "Record and reflect on your thoughts" },
  { name: "Goal Setter", route: "/tools/goals", description: "Set and track your personal goals" },
]

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTools = tools.filter((tool) => tool.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Discover Tools</h1>
      <Input
        type="text"
        placeholder="Search tools..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={tool.route}>
              <Card className="h-full hover:bg-accent transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle>{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

