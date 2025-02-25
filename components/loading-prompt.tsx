"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface LoadingPromptProps {
  prompt: string
}

export function LoadingPrompt({ prompt }: LoadingPromptProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Processing your check-in</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-center text-lg font-medium">{prompt}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

