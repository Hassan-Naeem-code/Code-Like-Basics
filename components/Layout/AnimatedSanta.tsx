'use client'

import { motion } from 'framer-motion'

export default function AnimatedSanta() {
  return (
    <motion.div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
      animate={{
        y: [0, -20, 0],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="text-8xl drop-shadow-2xl">
        🎅
      </div>
    </motion.div>
  )
}
