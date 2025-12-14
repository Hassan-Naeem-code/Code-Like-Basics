'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function SantaWithCart() {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)

      const handleResize = () => setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!windowWidth) return null

  return (
    <div className="fixed top-20 left-0 right-0 z-30 pointer-events-none overflow-hidden h-32">
      {/* Santa with Cart Animation - Loops from left to right */}
      <motion.div
        className="absolute"
        initial={{ x: -300 }}
        animate={{ x: windowWidth + 300 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 3,
        }}
      >
        <div className="relative flex items-end gap-4">
          {/* Santa */}
          <div className="relative">
            {/* Santa Body */}
            <svg width="120" height="140" viewBox="0 0 120 140" className="drop-shadow-2xl">
              {/* Santa's Body (Red Suit) */}
              <ellipse cx="60" cy="100" rx="35" ry="40" fill="#DC2626" />

              {/* Belt */}
              <rect x="25" y="95" width="70" height="12" fill="#1F2937" rx="2" />
              <rect x="52" y="96" width="16" height="10" fill="#FCD34D" rx="2" />

              {/* Santa's Head */}
              <ellipse cx="60" cy="50" rx="28" ry="30" fill="#FED7AA" />

              {/* Hat */}
              <path d="M 35 45 Q 60 15 85 45 L 80 50 Q 60 25 40 50 Z" fill="#DC2626" />
              <ellipse cx="60" cy="18" rx="8" ry="8" fill="#F3F4F6" />
              <rect x="32" y="48" width="56" height="8" fill="#F3F4F6" rx="4" />

              {/* Eyes */}
              <circle cx="52" cy="48" r="3" fill="#1F2937" />
              <circle cx="68" cy="48" r="3" fill="#1F2937" />

              {/* Nose */}
              <ellipse cx="60" cy="56" rx="4" ry="5" fill="#EF4444" />

              {/* Beard */}
              <path d="M 40 58 Q 35 75 40 80 L 80 80 Q 85 75 80 58 Q 75 70 60 72 Q 45 70 40 58 Z" fill="#F3F4F6" />

              {/* Waving Hand - Animated */}
              <motion.g
                animate={{
                  rotate: [0, 25, 0, 25, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ transformOrigin: '90px 75px' }}
              >
                {/* Arm */}
                <rect x="85" y="75" width="8" height="25" fill="#DC2626" rx="4" />
                {/* Hand */}
                <ellipse cx="89" cy="100" rx="8" ry="10" fill="#FED7AA" />
                {/* Fingers */}
                <rect x="82" y="95" width="3" height="8" fill="#FED7AA" rx="1.5" />
                <rect x="86" y="93" width="3" height="10" fill="#FED7AA" rx="1.5" />
                <rect x="90" y="94" width="3" height="9" fill="#FED7AA" rx="1.5" />
                <rect x="94" y="96" width="3" height="7" fill="#FED7AA" rx="1.5" />
              </motion.g>

              {/* Other Arm */}
              <rect x="25" y="80" width="8" height="20" fill="#DC2626" rx="4" />

              {/* Legs */}
              <rect x="48" y="130" width="10" height="8" fill="#1F2937" rx="2" />
              <rect x="62" y="130" width="10" height="8" fill="#1F2937" rx="2" />

              {/* Boots (animated for running effect) */}
              <motion.g
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <rect x="45" y="135" width="14" height="5" fill="#1F2937" rx="2" />
              </motion.g>
              <motion.g
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.2,
                }}
              >
                <rect x="61" y="135" width="14" height="5" fill="#1F2937" rx="2" />
              </motion.g>
            </svg>
          </div>

          {/* Cart with Gifts */}
          <div className="relative">
            <svg width="180" height="120" viewBox="0 0 180 120" className="drop-shadow-2xl">
              {/* Cart Body */}
              <rect x="20" y="60" width="140" height="50" fill="#8B4513" stroke="#654321" strokeWidth="3" rx="5" />

              {/* Cart Front */}
              <path d="M 20 60 L 10 110 L 20 110 Z" fill="#654321" />

              {/* Cart Back */}
              <path d="M 160 60 L 170 110 L 160 110 Z" fill="#654321" />

              {/* Cart Wheels */}
              <motion.circle
                cx="50"
                cy="115"
                r="12"
                fill="#1F2937"
                stroke="#374151"
                strokeWidth="2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '50px 115px' }}
              />
              <motion.circle
                cx="130"
                cy="115"
                r="12"
                fill="#1F2937"
                stroke="#374151"
                strokeWidth="2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '130px 115px' }}
              />

              {/* Wheel Spokes */}
              <line x1="50" y1="103" x2="50" y2="127" stroke="#6B7280" strokeWidth="2" />
              <line x1="38" y1="115" x2="62" y2="115" stroke="#6B7280" strokeWidth="2" />
              <line x1="130" y1="103" x2="130" y2="127" stroke="#6B7280" strokeWidth="2" />
              <line x1="118" y1="115" x2="142" y2="115" stroke="#6B7280" strokeWidth="2" />

              {/* Gifts in Cart - with shaking animation */}

              {/* Gift 1 - Red */}
              <motion.g
                animate={{
                  rotate: [-2, 2, -2],
                  y: [0, -1, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ transformOrigin: '45px 75px' }}
              >
                <rect x="30" y="55" width="30" height="30" fill="#DC2626" stroke="#991B1B" strokeWidth="2" rx="3" />
                <rect x="43" y="55" width="4" height="30" fill="#FCD34D" />
                <path d="M 30 70 L 60 70" stroke="#FCD34D" strokeWidth="4" />
                <path d="M 45 55 Q 40 45 45 40 Q 50 45 45 55" fill="#FCD34D" />
              </motion.g>

              {/* Gift 2 - Blue */}
              <motion.g
                animate={{
                  rotate: [2, -2, 2],
                  y: [0, -1, 0],
                }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.1,
                }}
                style={{ transformOrigin: '90px 80px' }}
              >
                <rect x="70" y="60" width="35" height="35" fill="#2563EB" stroke="#1E40AF" strokeWidth="2" rx="3" />
                <rect x="85" y="60" width="5" height="35" fill="#FBBF24" />
                <path d="M 70 77 L 105 77" stroke="#FBBF24" strokeWidth="5" />
                <path d="M 87 60 Q 82 48 87 42 Q 92 48 87 60" fill="#FBBF24" />
              </motion.g>

              {/* Gift 3 - Green */}
              <motion.g
                animate={{
                  rotate: [-1.5, 1.5, -1.5],
                  y: [0, -1, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.2,
                }}
                style={{ transformOrigin: '130px 70px' }}
              >
                <rect x="115" y="50" width="28" height="28" fill="#16A34A" stroke="#15803D" strokeWidth="2" rx="3" />
                <rect x="127" y="50" width="4" height="28" fill="#F97316" />
                <path d="M 115 64 L 143 64" stroke="#F97316" strokeWidth="4" />
                <path d="M 129 50 Q 125 42 129 37 Q 133 42 129 50" fill="#F97316" />
              </motion.g>

              {/* Gift 4 - Purple (Smaller, in front) */}
              <motion.g
                animate={{
                  rotate: [1, -1, 1],
                  y: [0, -0.5, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
                style={{ transformOrigin: '55px 95px' }}
              >
                <rect x="45" y="85" width="20" height="20" fill="#9333EA" stroke="#7E22CE" strokeWidth="2" rx="2" />
                <rect x="53" y="85" width="4" height="20" fill="#34D399" />
                <path d="M 45 95 L 65 95" stroke="#34D399" strokeWidth="4" />
                <path d="M 55 85 Q 52 78 55 74 Q 58 78 55 85" fill="#34D399" />
              </motion.g>

              {/* Gift 5 - Yellow */}
              <motion.g
                animate={{
                  rotate: [-2, 2, -2],
                  y: [0, -1, 0],
                }}
                transition={{
                  duration: 0.65,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.15,
                }}
                style={{ transformOrigin: '120px 92px' }}
              >
                <rect x="108" y="82" width="24" height="24" fill="#EAB308" stroke="#CA8A04" strokeWidth="2" rx="2" />
                <rect x="118" y="82" width="4" height="24" fill="#DC2626" />
                <path d="M 108 94 L 132 94" stroke="#DC2626" strokeWidth="4" />
                <path d="M 120 82 Q 117 75 120 71 Q 123 75 120 82" fill="#DC2626" />
              </motion.g>
            </svg>
          </div>
        </div>

        {/* Speech Bubble - "Hi!" */}
        <motion.div
          className="absolute -top-8 left-20 bg-white rounded-2xl px-4 py-2 shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1, 1, 0], opacity: [0, 1, 1, 1, 0] }}
          transition={{
            duration: 3,
            times: [0, 0.1, 0.7, 0.9, 1],
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          <p className="text-2xl font-bold text-red-600">Hi! 👋</p>
          {/* Speech bubble pointer */}
          <div className="absolute bottom-0 left-8 transform translate-y-full">
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
