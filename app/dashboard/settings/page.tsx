"use client"

import { HabitTracker } from "@/components/habit-tracker"

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <HabitTracker />
    </div>
  )
}

