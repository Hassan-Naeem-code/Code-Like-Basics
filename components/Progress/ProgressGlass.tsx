'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface ProgressGlassProps {
  drinkType: 'beer' | 'coffee' | 'coke'
  fillPercentage: number // 0-100
  onGlassFull: () => void
}

const DRINK_COLORS = {
  beer: {
    liquid: '#F59E0B',
    foam: '#FEF3C7',
    foamBubbles: '#FBBF24',
  },
  coffee: {
    liquid: '#6B4423',
    foam: '#D2B48C',
    steam: '#F5F5F5',
  },
  coke: {
    liquid: '#2C1810',
    foam: '#F5F5F5',
    bubbles: '#FFFFFF',
  },
}

export default function ProgressGlass({
  drinkType,
  fillPercentage,
  onGlassFull,
}: ProgressGlassProps) {
  const [previousFill, setPreviousFill] = useState(fillPercentage)
  const [showBubbles, setShowBubbles] = useState(false)
  const [isGlowing, setIsGlowing] = useState(false)

  const isFull = fillPercentage >= 100
  const colors = DRINK_COLORS[drinkType]

  useEffect(() => {
    if (fillPercentage > previousFill) {
      setShowBubbles(true)
      setTimeout(() => setShowBubbles(false), 2000)
    }
    setPreviousFill(fillPercentage)
  }, [fillPercentage, previousFill])

  useEffect(() => {
    if (isFull) {
      setIsGlowing(true)
    } else {
      setIsGlowing(false)
    }
  }, [isFull])

  const handleClick = () => {
    if (isFull) {
      onGlassFull()
    }
  }

  // Shaking animation for filling
  const shakeAnimation = fillPercentage > previousFill ? {
    x: [-2, 2, -2, 2, 0],
    transition: { duration: 0.5 }
  } : {}

  return (
    <div className="relative">
      {/* Glass Container with Shake */}
      <motion.div
        className={`relative ${isFull ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={handleClick}
        whileHover={isFull ? { scale: 1.05 } : {}}
        whileTap={isFull ? { scale: 0.95 } : {}}
        animate={shakeAnimation}
      >
        {/* Glow Effect when Full */}
        <AnimatePresence>
          {isGlowing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 -m-8"
            >
              <motion.div
                className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-60"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Render different glasses based on drink type */}
        {drinkType === 'beer' && (
          <BeerGlass fillPercentage={fillPercentage} colors={colors} showBubbles={showBubbles} />
        )}
        {drinkType === 'coffee' && (
          <CoffeeCup fillPercentage={fillPercentage} colors={colors} />
        )}
        {drinkType === 'coke' && (
          <CokeGlass fillPercentage={fillPercentage} colors={colors} showBubbles={showBubbles} />
        )}

        {/* Sparkle Effect when Full */}
        <AnimatePresence>
          {isFull && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-6 -right-6"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 1.5, repeat: Infinity },
                }}
              >
                <Sparkles className="w-10 h-10 text-yellow-400 drop-shadow-lg" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Progress Percentage */}
      <motion.div
        className="text-center mt-6"
        animate={isFull ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <p className="text-4xl font-bold text-white drop-shadow-lg">
          {Math.round(fillPercentage)}%
        </p>
        <p className="text-sm text-white/80 mt-2 font-semibold">
          {isFull ? '🎉 Full! Click to celebrate!' : 'Keep learning!'}
        </p>
      </motion.div>
    </div>
  )
}

// Beer Glass Component (Pint Glass)
function BeerGlass({ fillPercentage, colors, showBubbles }: any) {
  return (
    <div className="relative w-40 h-56">
      <svg viewBox="0 0 120 180" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="beerLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.liquid} stopOpacity="0.9" />
            <stop offset="100%" stopColor={colors.liquid} />
          </linearGradient>
          <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
          </linearGradient>
          <clipPath id="beerClip">
            <path d="M 35 20 L 30 160 L 90 160 L 85 20 Z" />
          </clipPath>
        </defs>

        {/* Liquid Fill with Animation */}
        <g clipPath="url(#beerClip)">
          <motion.rect
            x="30"
            y="20"
            width="60"
            height="140"
            fill="url(#beerLiquid)"
            initial={{ y: 160 }}
            animate={{
              y: 160 - (fillPercentage / 100) * 140,
            }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 12,
            }}
          />

          {/* Beer Foam */}
          {fillPercentage > 5 && (
            <>
              <motion.ellipse
                cx="60"
                cy={160 - (fillPercentage / 100) * 140 - 2}
                rx="28"
                ry="8"
                fill={colors.foam}
                opacity="0.95"
                animate={{
                  ry: [8, 10, 8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <motion.ellipse
                cx="60"
                cy={160 - (fillPercentage / 100) * 140 - 8}
                rx="25"
                ry="6"
                fill={colors.foamBubbles}
                opacity="0.8"
                animate={{
                  ry: [6, 8, 6],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
              />
            </>
          )}
        </g>

        {/* Glass Body (Pint shape) */}
        <path
          d="M 35 20 L 30 160 L 90 160 L 85 20 Z"
          fill="url(#glassShine)"
          stroke="#D1D5DB"
          strokeWidth="2.5"
        />

        {/* Glass Rim */}
        <ellipse cx="60" cy="20" rx="25" ry="4" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />

        {/* Glass Shine */}
        <ellipse cx="45" cy="70" rx="10" ry="40" fill="white" opacity="0.35" />

        {/* Glass Base */}
        <ellipse cx="60" cy="160" rx="30" ry="5" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
      </svg>

      {/* Rising Bubbles */}
      <AnimatePresence>
        {showBubbles && fillPercentage > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-200/60 rounded-full"
                style={{
                  left: `${40 + Math.random() * 20}%`,
                  bottom: `${(fillPercentage / 100) * 70}%`,
                }}
                initial={{ opacity: 0.9, scale: 1 }}
                animate={{
                  y: -100 - Math.random() * 50,
                  opacity: 0,
                  scale: 0.5,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: Math.random() * 2 + 1.5,
                  ease: 'linear',
                  delay: Math.random() * 0.3,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Coffee Cup Component
function CoffeeCup({ fillPercentage, colors }: any) {
  return (
    <div className="relative w-40 h-56">
      <svg viewBox="0 0 140 180" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="coffeeLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.liquid} stopOpacity="0.95" />
            <stop offset="100%" stopColor={colors.liquid} />
          </linearGradient>
          <clipPath id="cupClip">
            <path d="M 30 40 L 30 140 Q 30 150 40 150 L 80 150 Q 90 150 90 140 L 90 40 Z" />
          </clipPath>
        </defs>

        {/* Coffee Liquid */}
        <g clipPath="url(#cupClip)">
          <motion.rect
            x="30"
            y="40"
            width="60"
            height="110"
            fill="url(#coffeeLiquid)"
            initial={{ y: 150 }}
            animate={{
              y: 150 - (fillPercentage / 100) * 110,
            }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 12,
            }}
          />
        </g>

        {/* Cup Body */}
        <path
          d="M 30 40 L 30 140 Q 30 150 40 150 L 80 150 Q 90 150 90 140 L 90 40 Z"
          fill="rgba(255,255,255,0.25)"
          stroke="#E5E7EB"
          strokeWidth="3"
        />

        {/* Cup Handle */}
        <path
          d="M 90 60 Q 110 70 110 90 Q 110 110 90 120"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 90 65 Q 105 73 105 90 Q 105 107 90 115"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Cup Rim */}
        <ellipse cx="60" cy="40" rx="30" ry="5" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />

        {/* Cup Shine */}
        <ellipse cx="45" cy="80" rx="8" ry="35" fill="white" opacity="0.4" />

        {/* Steam Animation */}
        {fillPercentage > 10 && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.path
                key={i}
                d={`M ${50 + i * 8} 30 Q ${55 + i * 8} 20 ${50 + i * 8} 10`}
                fill="none"
                stroke={colors.steam}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
                animate={{
                  y: [0, -10, -20],
                  opacity: [0.6, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </>
        )}
      </svg>
    </div>
  )
}

// Coke Glass Component (Tall Glass)
function CokeGlass({ fillPercentage, colors, showBubbles }: any) {
  return (
    <div className="relative w-40 h-56">
      <svg viewBox="0 0 120 180" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="cokeLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.liquid} stopOpacity="0.95" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <clipPath id="cokeClip">
            <rect x="35" y="25" width="50" height="135" rx="5" />
          </clipPath>
        </defs>

        {/* Coke Liquid */}
        <g clipPath="url(#cokeClip)">
          <motion.rect
            x="35"
            y="25"
            width="50"
            height="135"
            fill="url(#cokeLiquid)"
            initial={{ y: 160 }}
            animate={{
              y: 160 - (fillPercentage / 100) * 135,
            }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 12,
            }}
          />

          {/* Ice Cubes */}
          {fillPercentage > 20 && (
            <>
              <motion.rect
                x="45"
                y={Math.max(40, 160 - (fillPercentage / 100) * 135 + 20)}
                width="12"
                height="12"
                rx="2"
                fill="rgba(255,255,255,0.3)"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1"
                animate={{
                  y: [
                    Math.max(40, 160 - (fillPercentage / 100) * 135 + 20),
                    Math.max(40, 160 - (fillPercentage / 100) * 135 + 25),
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
              <motion.rect
                x="62"
                y={Math.max(55, 160 - (fillPercentage / 100) * 135 + 35)}
                width="10"
                height="10"
                rx="2"
                fill="rgba(255,255,255,0.25)"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1"
                animate={{
                  y: [
                    Math.max(55, 160 - (fillPercentage / 100) * 135 + 35),
                    Math.max(55, 160 - (fillPercentage / 100) * 135 + 40),
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: 0.5,
                }}
              />
            </>
          )}
        </g>

        {/* Glass Body */}
        <rect
          x="35"
          y="25"
          width="50"
          height="135"
          rx="5"
          fill="rgba(255,255,255,0.15)"
          stroke="#D1D5DB"
          strokeWidth="2.5"
        />

        {/* Glass Rim */}
        <rect x="35" y="25" width="50" height="6" rx="3" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />

        {/* Glass Shine */}
        <rect x="42" y="50" width="8" height="80" rx="4" fill="white" opacity="0.35" />

        {/* Glass Base */}
        <rect x="35" y="155" width="50" height="5" rx="2" fill="#D1D5DB" />
      </svg>

      {/* Rising Bubbles for Coke */}
      <AnimatePresence>
        {showBubbles && fillPercentage > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/70 rounded-full"
                style={{
                  left: `${35 + Math.random() * 30}%`,
                  bottom: `${(fillPercentage / 100) * 75}%`,
                }}
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{
                  y: -120 - Math.random() * 40,
                  opacity: 0,
                  scale: 0.3,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: Math.random() * 2.5 + 2,
                  ease: 'linear',
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
