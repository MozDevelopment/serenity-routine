"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"

interface Habit {
  id: number
  name: string
  emoji: string
}

export function HabitTrackingCard() {
  const [activeHabits, setActiveHabits] = useState<Habit[]>([])
  const [habitLog, setHabitLog] = useState<{ [habitId: number]: boolean }>({})

  useEffect(() => {
    const storedActiveHabits = localStorage.getItem("activeHabits")
    if (storedActiveHabits) {
      setActiveHabits(JSON.parse(storedActiveHabits))
    }
  }, [])

  const toggleHabit = (habitId: number) => {
    setHabitLog((prev) => ({
      ...prev,
      [habitId]: !prev[habitId],
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Habits</CardTitle>
      </CardHeader>
      <CardContent>
        {activeHabits.length === 0 ? (
          <p>No habits configured. Visit the Settings page to set up your habits.</p>
        ) : (
          <div className="space-y-2">
            {activeHabits.map((habit) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={`habit-${habit.id}`}
                  checked={habitLog[habit.id] || false}
                  onCheckedChange={() => toggleHabit(habit.id)}
                />
                <label
                  htmlFor={`habit-${habit.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <span className="mr-2">{habit.emoji}</span>
                  {habit.name}
                </label>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

