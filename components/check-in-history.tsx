"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { motion } from "framer-motion"

interface CheckInHistoryProps {
  checkIns: boolean[]
}

export function CheckInHistory({ checkIns }: CheckInHistoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>7-Day Check-In History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            {checkIns.map((checked, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checked ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {checked ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5 text-gray-500" />}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

