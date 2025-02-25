import { Slider } from "@/components/ui/slider"

interface EnergyThermometerProps {
  value: number
  onChange: (value: number) => void
}

const energyDescriptions = [
  { value: 5, emoji: "⚡", description: "Superhuman energy levels" },
  { value: 4, emoji: "🏃‍♂️", description: "Moving fast, can't sit still" },
  { value: 3, emoji: "😅", description: "Others notice I am restless, excitable" },
  { value: 2, emoji: "💪", description: "Revved up, energized" },
  { value: 1, emoji: "🙌", description: "Little bit hyper" },
  { value: 0, emoji: "😐", description: "Even or level energy" },
  { value: -1, emoji: "🥱", description: "Little bit sluggish" },
  { value: -2, emoji: "😮‍💨", description: "Takes effort to do things" },
  { value: -3, emoji: "🐌", description: "Others notice I am moving or speaking slowly" },
  { value: -4, emoji: "😴", description: "Takes effort to do tiny things" },
  { value: -5, emoji: "🛌", description: "Can barely move, in bed all day" },
]

export function EnergyThermometer({ value, onChange }: EnergyThermometerProps) {
  const currentEnergy = energyDescriptions.find((e) => e.value === value) || energyDescriptions[5]

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
        {currentEnergy.emoji} Energy: {value > 0 ? "+" : ""}
        {value}
      </div>
      <div className="text-center">{currentEnergy.description}</div>
    </div>
  )
}

