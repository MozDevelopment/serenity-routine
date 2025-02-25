import { MoodCheckInWizard } from "@/components/mood-check-in-wizard"

export default function MoodCheckInPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mood Check-In</h1>
      <MoodCheckInWizard />
    </div>
  )
}

