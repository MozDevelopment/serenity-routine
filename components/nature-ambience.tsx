"use client"

import { useState, useEffect } from "react"
import { Howl } from "howler"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

const natureSounds = [
  { name: "Forest", src: "/sounds/forest.mp3" },
  { name: "Ocean", src: "/sounds/ocean.mp3" },
  { name: "Rain", src: "/sounds/rain.mp3" },
]

export function NatureAmbience() {
  const [currentSound, setCurrentSound] = useState<Howl | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    return () => {
      if (currentSound) {
        currentSound.unload()
      }
    }
  }, [currentSound])

  const playSound = (src: string) => {
    if (currentSound) {
      currentSound.stop()
    }
    const sound = new Howl({ src, loop: true })
    sound.play()
    setCurrentSound(sound)
    setIsPlaying(true)
  }

  const toggleSound = () => {
    if (currentSound) {
      if (isPlaying) {
        currentSound.pause()
      } else {
        currentSound.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="fixed bottom-20 right-4 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-lg"
      >
        <div className="flex space-x-2 mb-4">
          {natureSounds.map((sound) => (
            <Button key={sound.name} onClick={() => playSound(sound.src)} variant="outline" size="sm">
              {sound.name}
            </Button>
          ))}
        </div>
        <Button onClick={toggleSound} variant="ghost" size="icon">
          {isPlaying ? <VolumeX /> : <Volume2 />}
        </Button>
      </motion.div>
    </div>
  )
}

