'use client'

import { motion } from 'framer-motion'
import { Module } from '@/utils/techModules'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface ModuleCardProps {
  module: Module
  index: number
  onClick: () => void
}

export default function ModuleCard({ module, index, onClick }: ModuleCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className={`relative bg-gradient-to-br ${module.gradient} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all overflow-hidden h-full`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="text-7xl mb-4"
            animate={isHovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {module.icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-3xl font-bold text-white mb-3">
            {module.name}
          </h3>

          {/* Description */}
          <p className="text-white/90 text-lg mb-6">
            {module.description}
          </p>

          {/* Language Count Badge */}
          <div className="flex items-center justify-between">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <p className="text-white font-semibold text-sm">
                {module.languages.length} Languages
              </p>
            </div>

            {/* Arrow */}
            <motion.div
              animate={isHovered ? { x: [0, 10, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '100%' } : { x: '-100%' }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  )
}
