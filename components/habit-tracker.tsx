"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Save } from "lucide-react"

interface Habit {
  id: number
  name: string
  emoji: string
}

const DEFAULT_HABITS: Habit[] = [
  { id: 1, name: "Exercise", emoji: "🏃‍♂️" },
  { id: 2, name: "Hydrate", emoji: "💧" },
  { id: 3, name: "Read", emoji: "📚" },
  { id: 4, name: "Meditate", emoji: "🧘‍♀️" },
  { id: 5, name: "Eat Healthy", emoji: "🥗" },
  { id: 6, name: "Sleep Well", emoji: "💤" },
  { id: 7, name: "No Smoking", emoji: "🚭" },
  { id: 8, name: "Journal", emoji: "📝" },
  { id: 9, name: "Create", emoji: "🎨" },
  { id: 10, name: "Clean", emoji: "🧹" },
]

export function HabitTracker() {
  const [activeHabits, setActiveHabits] = useState<Habit[]>([])
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const storedActiveHabits = localStorage.getItem("activeHabits")
    if (storedActiveHabits) {
      setActiveHabits(JSON.parse(storedActiveHabits))
    } else {
      // Set default habits if no stored habits are found
      const defaultActiveHabits = DEFAULT_HABITS.slice(0, 5)
      setActiveHabits(defaultActiveHabits)
      localStorage.setItem("activeHabits", JSON.stringify(defaultActiveHabits))
    }
  }, [])

  const toggleHabit = (habit: Habit) => {
    setActiveHabits((prev) => {
      if (prev.find((h) => h.id === habit.id)) {
        return prev.filter((h) => h.id !== habit.id)
      } else if (prev.length < 5) {
        return [...prev, habit]
      }
      return prev
    })
  }

  const saveSettings = () => {
    localStorage.setItem("activeHabits", JSON.stringify(activeHabits))
    setShowSettings(false)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Habit Tracker</CardTitle>
        <Button onClick={() => setShowSettings(!showSettings)} variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </CardHeader>
      <CardContent>
        {showSettings ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select up to 5 habits:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {DEFAULT_HABITS.map((habit) => (
                <Button
                  key={habit.id}
                  variant={activeHabits.find((h) => h.id === habit.id) ? "default" : "outline"}
                  onClick={() => toggleHabit(habit)}
                  className="justify-start"
                >
                  <span className="mr-2">{habit.emoji}</span>
                  {habit.name}
                </Button>
              ))}
            </div>
            <Button onClick={saveSettings} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        ) : (
          <p>Selected habits: {activeHabits.map((h) => `${h.emoji} ${h.name}`).join(", ")}</p>
        )}
      </CardContent>
    </Card>
  )
}

