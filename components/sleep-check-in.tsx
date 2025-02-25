"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const days = ["S", "M", "T", "W", "T", "F", "S"]

export function SleepCheckIn() {
  const [selectedTime, setSelectedTime] = useState<Date>(new Date())
  const [selectedDays, setSelectedDays] = useState<boolean[]>(new Array(7).fill(false))
  const [remindersEnabled, setRemindersEnabled] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  useEffect(() => {
    // Set default time to 11 PM or 8:30 AM based on current time
    const now = new Date()
    const defaultTime = new Date()
    if (now.getHours() >= 18 || now.getHours() < 4) {
      defaultTime.setHours(23, 0, 0, 0)
    } else {
      defaultTime.setHours(8, 30, 0, 0)
    }
    setSelectedTime(defaultTime)
  }, [])

  const toggleDay = (index: number) => {
    const newSelectedDays = [...selectedDays]
    newSelectedDays[index] = !newSelectedDays[index]
    setSelectedDays(newSelectedDays)
  }

  const handleTimeSelection = (hours: string, minutes: string) => {
    const newTime = new Date(selectedTime)
    newTime.setHours(Number.parseInt(hours))
    newTime.setMinutes(Number.parseInt(minutes))
    setSelectedTime(newTime)
    setShowTimePicker(false)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleSetReminder = () => {
    if (selectedDays.some((day) => day)) {
      // TODO: Implement reminder setting logic
      console.log("Reminder set for", formatTime(selectedTime), "on days", selectedDays)
    } else {
      // TODO: Show error message
      console.error("Please select at least one day")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-burgundy-700 text-white p-6">
      <header className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-white">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-2xl font-medium">Sleep Check-In</h1>
        <div className="w-6" /> {/* Spacer for centering */}
      </header>

      <p className="text-lg mb-8">
        Tracking your sleep quality over time can help you understand what's impacting your sleep
      </p>

      <p className="text-sm text-light-blue-300 mb-6">
        {selectedTime.getHours() >= 18 || selectedTime.getHours() < 4
          ? "The most popular Sleep Check-in time at night is 11 pm for Calm members"
          : "The most popular Sleep Check-in time in the morning is 8:30 am for Calm members"}
      </p>

      <Dialog open={showTimePicker} onOpenChange={setShowTimePicker}>
        <DialogTrigger asChild>
          <Button className="w-60 h-16 rounded-full bg-transparent border-2 border-white flex items-center justify-between px-4 mb-8">
            <Clock className="h-6 w-6" />
            <span className="text-2xl">{formatTime(selectedTime)}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle>Select Time</DialogTitle>
          </DialogHeader>
          <div className="flex justify-around items-center">
            <Select
              onValueChange={(value) =>
                handleTimeSelection(value, selectedTime.getMinutes().toString().padStart(2, "0"))
              }
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder={selectedTime.getHours().toString().padStart(2, "0")} />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) => (
                  <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-2xl">:</span>
            <Select
              onValueChange={(value) => handleTimeSelection(selectedTime.getHours().toString().padStart(2, "0"), value)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder={selectedTime.getMinutes().toString().padStart(2, "0")} />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 60 }, (_, i) => (
                  <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mb-8">
        <Label className="mb-2 block">Repeat:</Label>
        <div className="flex justify-between">
          {days.map((day, index) => (
            <Button
              key={day}
              onClick={() => toggleDay(index)}
              className={cn(
                "w-12 h-12 rounded-full",
                selectedDays[index] ? "bg-white text-black" : "bg-transparent border-2 border-white text-white",
              )}
            >
              {day}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <Label htmlFor="reminders">Get reminders</Label>
        <Switch id="reminders" checked={remindersEnabled} onCheckedChange={setRemindersEnabled} />
      </div>

      <Button onClick={handleSetReminder} className="w-full py-4 bg-white text-black rounded-lg text-lg font-medium">
        Set Reminder
      </Button>
    </div>
  )
}

