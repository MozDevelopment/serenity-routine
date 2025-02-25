"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoodThermometer } from "@/components/mood-thermometer"
import { EnergyThermometer } from "@/components/energy-thermometer"
import { Button } from "@/components/ui/button"

export function MoodEnergyTracker() {
  const [entries, setEntries] = useState([{ mood: 0, energy: 0, time: new Date().toISOString() }])

  const addEntry = () => {
    if (entries.length < 5) {
      setEntries([...entries, { mood: 0, energy: 0, time: new Date().toISOString() }])
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mood & Energy Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {entries.map((entry, index) => (
            <div key={index} className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mood (Entry {index + 1})</CardTitle>
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
                  <CardTitle>Energy (Entry {index + 1})</CardTitle>
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
            </div>
          ))}
          {entries.length < 5 && <Button onClick={addEntry}>Add Another Entry</Button>}
        </div>
      </CardContent>
    </Card>
  )
}

