"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Bell } from "lucide-react"
import { useRouter } from "next/navigation"

const emotions = [
  { emoji: "😍", description: "Admiration", color: "bg-pink-200" },
  { emoji: "🥰", description: "Adoration", color: "bg-red-200" },
  { emoji: "✨", description: "Aesthetic Appreciation", color: "bg-purple-200" },
  { emoji: "😂", description: "Amusement", color: "bg-yellow-200" },
  { emoji: "😡", description: "Anger", color: "bg-red-500" },
  { emoji: "😰", description: "Anxiety", color: "bg-blue-300" },
  { emoji: "🤩", description: "Awe", color: "bg-yellow-300" },
  { emoji: "😬", description: "Awkwardness", color: "bg-gray-300" },
  { emoji: "😑", description: "Boredom", color: "bg-gray-200" },
  { emoji: "😌", description: "Calmness", color: "bg-green-200" },
  { emoji: "😕", description: "Confusion", color: "bg-orange-200" },
  { emoji: "🤤", description: "Craving", color: "bg-purple-300" },
  { emoji: "🤢", description: "Disgust", color: "bg-green-500" },
  { emoji: "😞", description: "Disappointment", color: "bg-blue-200" },
  { emoji: "🤨", description: "Disbelief", color: "bg-yellow-400" },
  { emoji: "🥺", description: "Empathic Pain", color: "bg-pink-300" },
  { emoji: "😵‍💫", description: "Entrancement", color: "bg-purple-400" },
  { emoji: "😒", description: "Envy", color: "bg-green-300" },
  { emoji: "😁", description: "Excitement", color: "bg-yellow-500" },
  { emoji: "😨", description: "Fear", color: "bg-gray-400" },
  { emoji: "😱", description: "Horror", color: "bg-red-400" },
  { emoji: "🤔", description: "Interest", color: "bg-blue-400" },
  { emoji: "😀", description: "Joy", color: "bg-yellow-300" },
  { emoji: "🥲", description: "Nostalgia", color: "bg-indigo-200" },
  { emoji: "😮‍💨", description: "Relief", color: "bg-green-100" },
  { emoji: "😢", description: "Sadness", color: "bg-blue-500" },
  { emoji: "😊", description: "Satisfaction", color: "bg-green-400" },
  { emoji: "😀", description: "Happy", color: "bg-yellow-400" },
  { emoji: "😁", description: "Excited", color: "bg-orange-400" },
  { emoji: "🙏", description: "Grateful", color: "bg-purple-300" },
  { emoji: "😌", description: "Relaxed", color: "bg-blue-200" },
  { emoji: "😊", description: "Content", color: "bg-green-300" },
  { emoji: "😴", description: "Tired", color: "bg-gray-300" },
  { emoji: "😕", description: "Unsure", color: "bg-yellow-200" },
  { emoji: "😩", description: "Stressed", color: "bg-red-300" },
]

const tags = [
  "Work",
  "School",
  "Family",
  "Friends",
  "Travel",
  "Self Care",
  "Relationships",
  "Calm",
  "Money",
  "Food",
  "Spirituality",
  "Health",
]

const GreetingCard = ({ onNext }: { onNext: () => void }) => {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{greeting}, how are you feeling?</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={onNext} className="w-full">
          Start Check-In
        </Button>
      </CardContent>
    </Card>
  )
}

const EmotionCard = ({ onSelect, onSkip }: { onSelect: (emotion: string) => void; onSkip: () => void }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>How are you feeling?</CardTitle>
        <Button variant="ghost" onClick={onSkip}>
          Skip
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {emotions.map((emotion) => (
            <Button
              key={emotion.description}
              variant="outline"
              className={`h-24 flex flex-col items-center justify-center ${emotion.color}`}
              onClick={() => onSelect(emotion.description)}
            >
              <span className="text-3xl">{emotion.emoji}</span>
              <span className="text-xs mt-2">{emotion.description}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const TagCard = ({
  selectedEmotion,
  onNext,
}: { selectedEmotion: string; onNext: (tags: string[], note: string) => void }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [note, setNote] = useState("")

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          <span className="text-3xl mr-2">{emotions.find((e) => e.description === selectedEmotion)?.emoji}</span>
          Recognizing how we feel helps us learn from our experience.
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
        <Textarea placeholder="Add Note..." value={note} onChange={(e) => setNote(e.target.value)} className="w-full" />
        <Button onClick={() => onNext(selectedTags, note)} className="w-full">
          Next
        </Button>
      </CardContent>
    </Card>
  )
}

const SummaryCard = ({ emotion, tags, onFinish }: { emotion: string; tags: string[]; onFinish: () => void }) => {
  const [nextCheckInTime, setNextCheckInTime] = useState<string>("")
  const checkInCount = 1 // This should be fetched from a database in a real app
  const currentDate = new Date()
  const weekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()))

  const days = ["S", "M", "T", "W", "T", "F", "S"]
  const currentDay = currentDate.getDay()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Mood Check-Ins</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center">You've completed your {checkInCount}th check-in</p>
        <h3 className="text-center font-semibold">Your Moods</h3>
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-lg p-2">{emotions.find((e) => e.description === emotion)?.emoji}</div>
        </div>
        <p className="text-center">Week of {weekStart.toLocaleDateString()}</p>
        <div className="flex justify-between">
          {days.map((day, index) => (
            <div
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-full
                ${index === currentDay ? "bg-primary text-primary-foreground" : ""}`}
            >
              {index === currentDay ? emotions.find((e) => e.description === emotion)?.emoji : day}
            </div>
          ))}
        </div>
        <Button disabled className="w-full">
          View History
        </Button>
        <div className="border-t pt-4">
          <h3 className="text-center font-semibold flex items-center justify-center">
            <Bell className="mr-2" />
            Check-In Reminder
          </h3>
          <p className="text-center mt-2">
            Reflecting consistently is the key to tracking and understanding your moods. When would you like to check in
            next?
          </p>
          <div className="flex justify-between mt-4">
            {["Morning", "Afternoon", "Night"].map((time) => (
              <Button
                key={time}
                variant={nextCheckInTime === time ? "default" : "outline"}
                onClick={() => setNextCheckInTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
        <Button onClick={onFinish} className="w-full">
          Finish
        </Button>
      </CardContent>
    </Card>
  )
}

export function MoodCheckInWizard() {
  const [step, setStep] = useState(0)
  const [selectedEmotion, setSelectedEmotion] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [note, setNote] = useState("")
  const router = useRouter()

  const saveMoodCheckIn = async () => {
    const checkInData = {
      userId: "user1", // This should be the actual user ID in a real app
      sessionTimestamp: new Date().toISOString(),
      dateOfRegister: new Date().toISOString().split("T")[0],
      emotion: selectedEmotion,
      tags: selectedTags,
      note: note,
    }

    try {
      const response = await fetch("/api/mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkInData),
      })

      if (!response.ok) {
        throw new Error("Failed to save mood check-in")
      }

      // Navigate to home page after successful save
      router.push("/")
    } catch (error) {
      console.error("Error saving mood check-in:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  const steps = [
    <GreetingCard key="greeting" onNext={() => setStep(1)} />,
    <EmotionCard
      key="emotion"
      onSelect={(emotion) => {
        setSelectedEmotion(emotion)
        setStep(2)
      }}
      onSkip={() => setStep(2)}
    />,
    <TagCard
      key="tag"
      selectedEmotion={selectedEmotion}
      onNext={(tags, newNote) => {
        setSelectedTags(tags)
        setNote(newNote)
        setStep(3)
      }}
    />,
    <SummaryCard key="summary" emotion={selectedEmotion} tags={selectedTags} onFinish={saveMoodCheckIn} />,
  ]

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Progress value={(step / (steps.length - 1)) * 100} className="w-full" />
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        {steps[step]}
      </motion.div>
    </div>
  )
}

