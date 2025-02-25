"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { WeeklyReport } from "@/components/weekly-report"
import { MonthlyReport } from "@/components/monthly-report"

export function AdminDashboard() {
  const [timeframe, setTimeframe] = useState<"week" | "month">("week")
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(endDate.getDate() - (timeframe === "week" ? 7 : 30))

      const response = await fetch(
        `/api/mood?userId=user1&startDate=${startDate.toISOString().split("T")[0]}&endDate=${endDate.toISOString().split("T")[0]}`,
      )
      const result = await response.json()
      setData(result.entries)
    }

    fetchData()
  }, [timeframe])

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Button variant={timeframe === "week" ? "default" : "outline"} onClick={() => setTimeframe("week")}>
          Week
        </Button>
        <Button variant={timeframe === "month" ? "default" : "outline"} onClick={() => setTimeframe("month")}>
          Month
        </Button>
      </div>

      {data && <>{timeframe === "week" ? <WeeklyReport data={data} /> : <MonthlyReport data={data} />}</>}
    </div>
  )
}

