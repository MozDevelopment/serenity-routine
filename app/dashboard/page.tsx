import { DailyTracking } from "@/components/daily-tracking"
import { NatureAmbience } from "@/components/nature-ambience"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Daily Tracking</h1>
      <DailyTracking />
      <NatureAmbience />
    </div>
  )
}

