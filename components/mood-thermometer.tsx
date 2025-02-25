import { Slider } from "@/components/ui/slider"

interface MoodThermometerProps {
  value: number
  onChange: (value: number) => void
}

const moodDescriptions = [
  { value: 5, emoji: "🤯", description: "Really high, most manic, hospitalized" },
  { value: 4, emoji: "😬", description: "Mania getting out of control" },
  { value: 3, emoji: "🗣️", description: "Others notice that you're hyper, talking fast" },
  { value: 2, emoji: "😃", description: "Revved up, better than 'normal' mood" },
  { value: 1, emoji: "🙂", description: "Little bit upbeat" },
  { value: 0, emoji: "😐", description: "Even or level mood" },
  { value: -1, emoji: "🙁", description: "Little bit down" },
  { value: -2, emoji: "😔", description: "Sad, low interest" },
  { value: -3, emoji: "😞", description: "Others notice that you're down" },
  { value: -4, emoji: "😢", description: "Depression makes it hard to function" },
  { value: -5, emoji: "😭", description: "Really low, most depressed, possibly hospitalized" },
]

export function MoodThermometer({ value, onChange }: MoodThermometerProps) {
  const currentMood = moodDescriptions.find((m) => m.value === value) || moodDescriptions[5]

  const getColor = (value: number) => {
    if (value > 3) return "text-red-500"
    if (value > 0) return "text-yellow-500"
    if (value < -3) return "text-blue-500"
    if (value < 0) return "text-indigo-500"
    return "text-green-500"
  }

  return (
    <div className="space-y-4">
      <Slider
        min={-5}
        max={5}
        step={1}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        className="mb-6"
      />
      <div className={`text-center font-medium text-2xl ${getColor(value)}`}>
        {currentMood.emoji} Mood: {value > 0 ? "+" : ""}
        {value}
      </div>
      <div className="text-center">{currentMood.description}</div>
    </div>
  )
}

