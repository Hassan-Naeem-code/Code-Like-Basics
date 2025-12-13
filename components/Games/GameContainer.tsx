'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'
import Link from 'next/link'

interface GameContainerProps {
  title: string
  icon: string
  difficulty?: 'easy' | 'medium' | 'hard'
  children: ReactNode
}

export default function GameContainer({
  title,
  icon,
  difficulty = 'easy',
  children,
}: GameContainerProps) {
  const difficultyColors = {
    easy: 'text-green-400 border-green-400',
    medium: 'text-orange-400 border-orange-400',
    hard: 'text-red-400 border-red-400',
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <motion.button
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home className="w-5 h-5 text-white" />
                </motion.button>
              </Link>
              <span className="text-5xl">{icon}</span>
              <div>
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <div className={`inline-block px-3 py-1 rounded-full border-2 ${difficultyColors[difficulty]} mt-2`}>
                  <span className="text-sm font-semibold uppercase">{difficulty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Content */}
        {children}
      </div>
    </div>
  )
}
