'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedDiagramProps {
  children: ReactNode
  delay?: number
}

export default function AnimatedDiagram({ children, delay = 0 }: AnimatedDiagramProps) {
  return (
    <motion.div
      className="my-8 p-6 bg-white/5 rounded-xl border-2 border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
