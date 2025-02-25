"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

type CheckInType = "mood" | "gratitude" | "reflection" | "sleep"

interface Notification {
  type: CheckInType
  time: Date
}

const checkInTimes: { [key in CheckInType]: number[] } = {
  mood: [9, 14, 20], // 9 AM, 2 PM, 8 PM
  gratitude: [19, 20, 21, 22, 5, 6, 7, 8], // 7 PM to 11 PM, 5 AM to 8 AM
  reflection: [21, 22, 23, 0], // 9 PM to 12 AM
  sleep: [21, 22, 23, 6, 7, 8], // 9 PM to 11 PM, 6 AM to 8 AM
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const checkForNotifications = () => {
      const now = new Date()
      const currentHour = now.getHours()

      Object.entries(checkInTimes).forEach(([type, hours]) => {
        if (hours.includes(currentHour)) {
          const newNotification: Notification = {
            type: type as CheckInType,
            time: now,
          }
          setNotifications((prev) => [...prev, newNotification])
        }
      })
    }

    const interval = setInterval(checkForNotifications, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[notifications.length - 1]
      toast({
        title: `Time for your ${latestNotification.type} check-in!`,
        description: "Don't forget to log your daily progress.",
        action: (
          <Button variant="outline" size="sm" onClick={() => handleCheckIn(latestNotification.type)}>
            Check-in now
          </Button>
        ),
      })
    }
  }, [notifications, toast])

  const handleCheckIn = (type: CheckInType) => {
    // Here you would typically navigate to the check-in page
    console.log(`Navigating to ${type} check-in`)
    // Remove the notification after handling
    setNotifications((prev) => prev.filter((n) => n.type !== type))
  }

  return null // This component doesn't render anything visible
}

