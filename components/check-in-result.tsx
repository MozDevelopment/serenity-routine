"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface CheckInResultProps {
  date: string
  prompt: string
  message: string
}

export function CheckInResult({ date, prompt, message }: CheckInResultProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-lg mx-auto mb-6">
        <CardHeader>
          <CardTitle>{date}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-medium">{prompt}</p>
          <p>{message}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

