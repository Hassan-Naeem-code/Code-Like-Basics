'use client'

import { motion } from 'framer-motion'

export default function HolidayBanner() {
  return (
    <motion.div
      className="text-center py-8 relative z-10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-white text-glow mb-4"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🎄 Learn This Holiday Season 🎄
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-white/90 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Interactive Tutorials • Fun Games • Hands-on Sandboxes
      </motion.p>

      {/* Decorative ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-4 left-10 text-4xl"
          animate={{ rotate: 360, y: [0, 10, 0] }}
          transition={{ rotate: { duration: 10, repeat: Infinity }, y: { duration: 2, repeat: Infinity } }}
        >
          🎁
        </motion.div>
        <motion.div
          className="absolute top-8 right-10 text-4xl"
          animate={{ rotate: -360, y: [0, -10, 0] }}
          transition={{ rotate: { duration: 10, repeat: Infinity }, y: { duration: 2, repeat: Infinity } }}
        >
          🎀
        </motion.div>
        <motion.div
          className="absolute bottom-4 left-20 text-3xl"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ rotate: { duration: 8, repeat: Infinity }, scale: { duration: 2, repeat: Infinity } }}
        >
          🔔
        </motion.div>
        <motion.div
          className="absolute bottom-4 right-20 text-3xl"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ rotate: { duration: 8, repeat: Infinity }, scale: { duration: 2, repeat: Infinity } }}
        >
          ⭐
        </motion.div>
      </div>
    </motion.div>
  )
}
