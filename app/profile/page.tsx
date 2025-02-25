"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  const [notificationPreferences, setNotificationPreferences] = useState({
    mood: true,
    gratitude: true,
    reflection: true,
    sleep: true,
  })

  const toggleNotification = (type: keyof typeof notificationPreferences) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Name: John Doe</p>
          <p>Email: john.doe@example.com</p>
          <p>Member since: January 1, 2024</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(notificationPreferences).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={`${key}-notifications`} className="capitalize">
                {key} Check-in Reminders
              </Label>
              <Switch
                id={`${key}-notifications`}
                checked={value}
                onCheckedChange={() => toggleNotification(key as keyof typeof notificationPreferences)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline">Change Password</Button>
          <Button variant="outline">Privacy Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}

