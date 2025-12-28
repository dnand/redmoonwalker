"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"

export function Celebrate() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleCelebrate = () => {
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 2000)
    }

    window.addEventListener("step-complete", handleCelebrate)
    return () => window.removeEventListener("step-complete", handleCelebrate)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: 2,
            }}
            className="text-6xl"
          >
            ✨
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

