"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

type Activity = {
  id: number
  name: string
  completed: boolean
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, name: "Morning walk", completed: false },
    { id: 2, name: "Meditation", completed: false },
    { id: 3, name: "Read a book", completed: false },
  ])
  const [newActivity, setNewActivity] = useState("")

  const addActivity = () => {
    if (newActivity.trim()) {
      setActivities([...activities, { id: Date.now(), name: newActivity, completed: false }])
      setNewActivity("")
    }
  }

  const toggleActivity = (id: number) => {
    setActivities(
      activities.map((activity) => (activity.id === id ? { ...activity, completed: !activity.completed } : activity)),
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daily Activities</h1>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
          placeholder="Add new activity"
        />
        <Button onClick={addActivity}>Add</Button>
      </div>
      <ul className="space-y-2">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-center space-x-2">
            <Checkbox
              id={`activity-${activity.id}`}
              checked={activity.completed}
              onCheckedChange={() => toggleActivity(activity.id)}
            />
            <label
              htmlFor={`activity-${activity.id}`}
              className={`flex-1 ${activity.completed ? "line-through text-gray-500" : ""}`}
            >
              {activity.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

