"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface HabitLog {
  [date: string]: {
    [habitId: number]: boolean
  }
}

interface Habit {
  id: number
  name: string
  emoji: string
}

export function StatusCard() {
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [habitLog, setHabitLog] = useState<HabitLog>({})
  const [activeHabits, setActiveHabits] = useState<Habit[]>([])

  useEffect(() => {
    const storedHabitLog = localStorage.getItem("habitLog")
    const storedActiveHabits = localStorage.getItem("activeHabits")
    if (storedHabitLog) setHabitLog(JSON.parse(storedHabitLog))
    if (storedActiveHabits) setActiveHabits(JSON.parse(storedActiveHabits))
  }, [])

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getMonthData = () => {
    const daysInMonth = getDaysInMonth(year, month)
    const data = new Array(daysInMonth).fill(0)

    Object.entries(habitLog).forEach(([date, habits]) => {
      const [logYear, logMonth, logDay] = date.split("-").map(Number)
      if (logYear === year && logMonth === month + 1) {
        data[logDay - 1] = Object.values(habits).filter(Boolean).length
      }
    })

    return data
  }

  const chartData = {
    labels: Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1),
    datasets: [
      {
        label: "Habits Completed",
        data: getMonthData(),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Habits Completed in ${new Date(year, month).toLocaleString("default", { month: "long" })} ${year}`,
      },
    },
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monthly Status</CardTitle>
        <div className="flex space-x-2">
          <Select value={month.toString()} onValueChange={(value) => setMonth(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {new Date(2000, i).toLocaleString("default", { month: "long" })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={year.toString()} onValueChange={(value) => setYear(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }, (_, i) => {
                const yearValue = new Date().getFullYear() - i
                return (
                  <SelectItem key={yearValue} value={yearValue.toString()}>
                    {yearValue}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Bar data={chartData} options={chartOptions} />
      </CardContent>
    </Card>
  )
}

