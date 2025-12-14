'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

interface SantaDrinkingAnimationProps {
  isPlaying: boolean
  drinkType: 'beer' | 'coffee' | 'coke'
  onComplete: () => void
}

export default function SantaDrinkingAnimation({
  isPlaying,
  drinkType,
  onComplete,
}: SantaDrinkingAnimationProps) {
  const [stage, setStage] = useState<'idle' | 'drinking' | 'thanking'>('idle')

  useEffect(() => {
    if (isPlaying) {
      setStage('idle')

      // Celebration confetti
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347'],
      })

      // Start drinking animation
      const drinkingTimer = setTimeout(() => {
        setStage('drinking')
      }, 500)

      // Show thank you message
      const thankingTimer = setTimeout(() => {
        setStage('thanking')
      }, 3000)

      // Complete animation
      const completeTimer = setTimeout(() => {
        onComplete()
        setStage('idle')
      }, 5500)

      return () => {
        clearTimeout(drinkingTimer)
        clearTimeout(thankingTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [isPlaying, onComplete])

  const getDrinkEmoji = () => {
    switch (drinkType) {
      case 'beer':
        return '🍺'
      case 'coffee':
        return '☕'
      case 'coke':
        return '🥤'
    }
  }

  const getDrinkName = () => {
    switch (drinkType) {
      case 'beer':
        return 'beer'
      case 'coffee':
        return 'coffee'
      case 'coke':
        return 'coke'
    }
  }

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative bg-gradient-to-br from-red-600 via-red-700 to-green-700 rounded-3xl p-12 shadow-2xl max-w-2xl mx-4"
          >
            {/* Decorative Snowflakes */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-white text-2xl"
                  initial={{
                    x: Math.random() * 600,
                    y: -20,
                    opacity: 0.7,
                  }}
                  animate={{
                    y: 500,
                    rotate: 360,
                  }}
                  transition={{
                    duration: Math.random() * 3 + 3,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: Math.random() * 2,
                  }}
                >
                  ❄️
                </motion.div>
              ))}
            </div>

            <div className="relative z-10">
              {/* Santa Character */}
              <motion.div
                className="text-center mb-8"
                animate={
                  stage === 'drinking'
                    ? { rotate: [-5, 5, -5, 5, 0] }
                    : stage === 'thanking'
                    ? { scale: [1, 1.1, 1] }
                    : {}
                }
                transition={{ duration: 0.5, repeat: stage === 'drinking' ? 5 : 0 }}
              >
                <motion.div
                  className="text-9xl mb-4"
                  animate={
                    stage === 'drinking'
                      ? { y: [0, -10, 0] }
                      : {}
                  }
                  transition={{
                    duration: 0.3,
                    repeat: stage === 'drinking' ? 8 : 0,
                  }}
                >
                  🎅
                </motion.div>

                {/* Glass in Santa's hand */}
                <AnimatePresence mode="wait">
                  {stage === 'drinking' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 text-6xl"
                    >
                      {getDrinkEmoji()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Messages */}
              <AnimatePresence mode="wait">
                {stage === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <h2 className="text-5xl font-bold text-white mb-4">
                      Ho Ho Ho! 🎉
                    </h2>
                    <p className="text-2xl text-white/90">
                      Time for a well-deserved break!
                    </p>
                  </motion.div>
                )}

                {stage === 'drinking' && (
                  <motion.div
                    key="drinking"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center"
                  >
                    <h2 className="text-5xl font-bold text-white mb-4">
                      *Gulp Gulp Gulp*
                    </h2>
                    <p className="text-2xl text-white/90">
                      Enjoying your {getDrinkName()}...
                    </p>

                    {/* Drinking Progress Bar */}
                    <div className="mt-6 bg-white/20 rounded-full h-4 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2.5, ease: 'linear' }}
                      />
                    </div>
                  </motion.div>
                )}

                {stage === 'thanking' && (
                  <motion.div
                    key="thanking"
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
                    className="text-center"
                  >
                    <motion.h2
                      className="text-6xl font-bold text-white mb-6"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 0.5, repeat: 3 }}
                    >
                      Thank You! 🎄
                    </motion.h2>
                    <p className="text-3xl text-white/90 mb-4">
                      That was delicious!
                    </p>
                    <p className="text-xl text-white/70">
                      Keep up the great work learning! 📚✨
                    </p>

                    {/* Stars Animation */}
                    <div className="mt-8 flex justify-center gap-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="text-5xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          ⭐
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
