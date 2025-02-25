"use client"

import { useState } from "react"
import { CheckInForm } from "@/components/check-in-form"
import { LoadingPrompt } from "@/components/loading-prompt"
import { CheckInResult } from "@/components/check-in-result"
import { CheckInHistory } from "@/components/check-in-history"

const reflectionPrompts = [
  "What was the most significant event of your day, and why?",
  "What did you learn about yourself today?",
  "If you could change one thing about today, what would it be and why?",
]

export default function ReflectionCheckIn() {
  const [stage, setStage] = useState<"form" | "loading" | "result">("form")
  const [checkInData, setCheckInData] = useState<{ prompt: string; message: string } | null>(null)

  const handleSubmit = (notes: string) => {
    setStage("loading")
    // Simulate API call
    setTimeout(() => {
      setCheckInData({
        prompt: reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)],
        message: notes,
      })
      setStage("result")
    }, 2000)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Daily Reflection</h1>
      {stage === "form" && (
        <CheckInForm
          title="Daily Reflection"
          prompt={reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)]}
          onSubmit={handleSubmit}
        />
      )}
      {stage === "loading" && <LoadingPrompt prompt="Take a moment to reflect on your day..." />}
      {stage === "result" && checkInData && (
        <>
          <CheckInResult
            date={new Date().toLocaleDateString()}
            prompt={checkInData.prompt}
            message={checkInData.message}
          />
          <CheckInHistory checkIns={[true, true, true, false, true, false, true]} />
        </>
      )}
    </div>
  )
}

