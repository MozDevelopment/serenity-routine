"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MoodSlider } from "@/components/mood-slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const moodLabels = ["-5", "-4", "-3", "-2", "-1", "0", "+1", "+2", "+3", "+4", "+5"]
const energyLabels = ["-5", "-4", "-3", "-2", "-1", "0", "+1", "+2", "+3", "+4", "+5"]

export default function MoodTracker() {
  const [mood, setMood] = useState(0)
  const [energy, setEnergy] = useState(0)
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement submission logic
    console.log({ mood, energy, notes })
  }

  const currentDate = new Date()
  const dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Daily Inspiration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg italic">"Every day is a new beginning. Take a deep breath and start again."</p>
          <p className="text-sm mt-2">Today is day {dayOfYear} of the year</p>
          <p className="text-sm">{currentDate.toLocaleDateString()}</p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <MoodSlider value={mood} onChange={setMood} min={-5} max={5} step={1} labels={moodLabels} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy</CardTitle>
          </CardHeader>
          <CardContent>
            <MoodSlider value={energy} onChange={setEnergy} min={-5} max={5} step={1} labels={energyLabels} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How are you feeling today? Any notable events or thoughts?"
              rows={4}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">
          Save Today's Entry
        </Button>
      </form>
    </div>
  )
}

