import { Slider } from "@/components/ui/slider"

type MoodSliderProps = {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  labels: string[]
}

export function MoodSlider({ value, onChange, min, max, step, labels }: MoodSliderProps) {
  const getEmoji = (value: number) => {
    if (value < -3) return "😭"
    if (value < -1) return "😢"
    if (value < 0) return "🙁"
    if (value === 0) return "😐"
    if (value < 2) return "🙂"
    if (value < 4) return "😊"
    return "😄"
  }

  const getColor = (value: number) => {
    const normalizedValue = (value - min) / (max - min)
    const hue = normalizedValue * 120 // 0 to 120 (red to green)
    return `hsl(${hue}, 100%, 50%)`
  }

  return (
    <div className="space-y-2">
      <Slider min={min} max={max} step={step} value={[value]} onValueChange={(newValue) => onChange(newValue[0])} />
      <div className="flex justify-between text-sm">
        {labels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
      <div className="text-center text-2xl">
        <span style={{ color: getColor(value) }}>{getEmoji(value)}</span>
        <span className="ml-2">{value}</span>
      </div>
    </div>
  )
}

