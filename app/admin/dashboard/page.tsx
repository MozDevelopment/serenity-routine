"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// Mock data for demonstration
const mockData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Mood",
      data: [2, 1, 3, 0, -1, 2, 4],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Energy",
      data: [1, 2, 1, 3, 2, 4, 3],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
}

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState("week")

  const generatePDF = () => {
    // TODO: Implement PDF generation
    console.log("Generating PDF report")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="flex space-x-4">
        <Button variant={timeframe === "week" ? "default" : "outline"} onClick={() => setTimeframe("week")}>
          Week
        </Button>
        <Button variant={timeframe === "month" ? "default" : "outline"} onClick={() => setTimeframe("month")}>
          Month
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mood and Energy Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={mockData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Completion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">85%</p>
        </CardContent>
      </Card>

      <Button onClick={generatePDF}>Generate PDF Report</Button>
    </div>
  )
}

