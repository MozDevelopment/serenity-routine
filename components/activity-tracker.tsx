"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

const defaultActivities = ["Out of Bed", "First Contact", "Start Work", "Dinner", "To Bed"]

interface ActivityTrackerProps {
  activities: Record<string, string>
  setActivities: (activities: Record<string, string>) => void
}

export function ActivityTracker({ activities, setActivities }: ActivityTrackerProps) {
  const handleActivityChange = (activity: string, time: string) => {
    setActivities({ ...activities, [activity]: time })
  }

  return (
    <div className="space-y-4">
      {defaultActivities.map((activity, index) => (
        <motion.div
          key={activity}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-4"
        >
          <Label htmlFor={activity} className="w-1/3">
            {activity}
          </Label>
          <Input
            type="time"
            id={activity}
            value={activities[activity] || ""}
            onChange={(e) => handleActivityChange(activity, e.target.value)}
            className="w-2/3"
          />
        </motion.div>
      ))}
    </div>
  )
}

