"use client"

import type React from "react"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface NotesRecorderProps {
  notes: string
  setNotes: (notes: string) => void
}

export function NotesRecorder({ notes, setNotes }: NotesRecorderProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Note: Actual saving is now handled in the parent component
    alert("Notes saved successfully!")
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Textarea
        placeholder="How are you feeling today? Any notable events or thoughts?"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={5}
      />
      <Button type="submit">Save Notes</Button>
    </motion.form>
  )
}

