"use client"

import { useState } from "react"
import { CheckInForm } from "@/components/check-in-form"
import { LoadingPrompt } from "@/components/loading-prompt"
import { CheckInResult } from "@/components/check-in-result"
import { CheckInHistory } from "@/components/check-in-history"

const gratitudePrompts = [
  "What are three things you're grateful for today?",
  "Who has positively impacted your life recently, and why are you thankful for them?",
  "What small pleasure or moment brought you joy today?",
]

export default function GratitudeCheckIn() {
  const [stage, setStage] = useState<"form" | "loading" | "result">("form")
  const [checkInData, setCheckInData] = useState<{ prompt: string; message: string } | null>(null)

  const handleSubmit = (notes: string) => {
    setStage("loading")
    // Simulate API call
    setTimeout(() => {
      setCheckInData({
        prompt: gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)],
        message: notes,
      })
      setStage("result")
    }, 2000)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Gratitude Check-In</h1>
      {stage === "form" && (
        <CheckInForm
          title="Gratitude Check-In"
          prompt={gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)]}
          onSubmit={handleSubmit}
        />
      )}
      {stage === "loading" && <LoadingPrompt prompt="Take a moment to appreciate the good things in your life..." />}
      {stage === "result" && checkInData && (
        <>
          <CheckInResult
            date={new Date().toLocaleDateString()}
            prompt={checkInData.prompt}
            message={checkInData.message}
          />
          <CheckInHistory checkIns={[true, true, false, true, true, true, false]} />
        </>
      )}
    </div>
  )
}

