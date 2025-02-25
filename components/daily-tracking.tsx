"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoodThermometer } from "@/components/mood-thermometer"
import { EnergyThermometer } from "@/components/energy-thermometer"
import { ActivityTracker } from "@/components/activity-tracker"
import { NotesRecorder } from "@/components/notes-recorder"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function DailyTracking() {
  const [entries, setEntries] = useState([{ mood: 0, energy: 0, time: new Date().toISOString() }])
  const [activities, setActivities] = useState({})
  const [notes, setNotes] = useState("")

  useEffect(() => {
    // Load data from localStorage on component mount
    const storedData = localStorage.getItem("dailyTracking")
    if (storedData) {
      const { entries, activities, notes } = JSON.parse(storedData)
      setEntries(entries)
      setActivities(activities)
      setNotes(notes)
    }
  }, [])

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem("dailyTracking", JSON.stringify({ entries, activities, notes }))

    // Sync with JSON file (simulated API call)
    fetch("/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "user1", entries, activities, notes }),
    })
  }, [entries, activities, notes])

  const addEntry = () => {
    if (entries.length < 5) {
      setEntries([...entries, { mood: 0, energy: 0, time: new Date().toISOString() }])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {entries.map((entry, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Mood Tracker (Entry {index + 1})</CardTitle>
            </CardHeader>
            <CardContent>
              <MoodThermometer
                value={entry.mood}
                onChange={(value) => {
                  const newEntries = [...entries]
                  newEntries[index].mood = value
                  setEntries(newEntries)
                }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Energy Tracker (Entry {index + 1})</CardTitle>
            </CardHeader>
            <CardContent>
              <EnergyThermometer
                value={entry.energy}
                onChange={(value) => {
                  const newEntries = [...entries]
                  newEntries[index].energy = value
                  setEntries(newEntries)
                }}
              />
            </CardContent>
          </Card>
        </motion.div>
      ))}
      {entries.length < 5 && <Button onClick={addEntry}>Add Another Entry</Button>}
      <Card>
        <CardHeader>
          <CardTitle>Activity Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityTracker activities={activities} setActivities={setActivities} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notes Recorder</CardTitle>
        </CardHeader>
        <CardContent>
          <NotesRecorder notes={notes} setNotes={setNotes} />
        </CardContent>
      </Card>
    </motion.div>
  )
}

