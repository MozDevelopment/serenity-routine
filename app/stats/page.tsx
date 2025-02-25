import { JourneyStatsCard } from "@/components/journey-stats-card"
import { MonthlyCalendar } from "@/components/monthly-calendar"

export default function StatsPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Journey Stats</h1>
      <JourneyStatsCard />
      <MonthlyCalendar />
    </div>
  )
}

