'use client'

import { motion } from 'framer-motion'
import { Heart, Lightbulb, Star } from 'lucide-react'

interface GameHUDProps {
  score: number
  lives: number
  maxLives: number
  hints: number
  maxHints: number
  onUseHint?: () => void
}

export default function GameHUD({
  score,
  lives,
  maxLives,
  hints,
  maxHints,
  onUseHint,
}: GameHUDProps) {
  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Score */}
        <div className="flex items-center space-x-2">
          <Star className="w-6 h-6 text-christmas-gold" />
          <div>
            <div className="text-xs text-white/70 uppercase">Score</div>
            <motion.div
              className="text-2xl font-bold text-christmas-gold"
              key={score}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
            >
              {score}
            </motion.div>
          </div>
        </div>

        {/* Lives */}
        <div className="flex items-center space-x-2">
          <div>
            <div className="text-xs text-white/70 uppercase">Lives</div>
            <div className="flex gap-1 mt-1">
              {Array.from({ length: maxLives }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      i < lives
                        ? 'fill-red-500 text-red-500'
                        : 'text-white/20'
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Hints */}
        <div className="flex items-center space-x-2">
          <div>
            <div className="text-xs text-white/70 uppercase">Hints</div>
            <div className="flex gap-1 mt-1">
              {Array.from({ length: maxHints }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Lightbulb
                    className={`w-6 h-6 ${
                      i < hints
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-white/20'
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Hint Button */}
        {hints > 0 && onUseHint && (
          <motion.button
            onClick={onUseHint}
            className="btn btn-secondary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lightbulb className="w-5 h-5" />
            <span>Use Hint</span>
          </motion.button>
        )}
      </div>
    </div>
  )
}
