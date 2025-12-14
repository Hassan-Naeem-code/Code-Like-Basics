'use client'

import { motion } from 'framer-motion'
import { Language } from '@/utils/techModules'
import { BookOpen, Gamepad2, Code2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LanguageCardProps {
  language: Language
  moduleId: string
  index: number
}

export default function LanguageCard({ language, moduleId, index }: LanguageCardProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const router = useRouter()

  const getDifficultyColor = () => {
    switch (language.difficulty) {
      case 'beginner':
        return 'bg-green-500'
      case 'intermediate':
        return 'bg-yellow-500'
      case 'advanced':
        return 'bg-red-500'
    }
  }

  const handleOptionClick = (type: 'tutorial' | 'game' | 'sandbox') => {
    const routes = {
      tutorial: `/tutorial/${moduleId}-${language.id}`,
      game: `/game/${moduleId}-${language.id}`,
      sandbox: `/sandbox/${moduleId}-${language.id}`,
    }
    router.push(routes[type])
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
    >
      {/* Header */}
      <div
        className="p-6 text-white relative overflow-hidden"
        style={{ backgroundColor: language.color }}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <motion.div
              className="text-5xl"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {language.icon}
            </motion.div>
            <div className={`${getDifficultyColor()} px-3 py-1 rounded-full text-xs font-bold text-white uppercase`}>
              {language.difficulty}
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-2">{language.name}</h3>
          <p className="text-white/90 text-sm">{language.description}</p>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }} />
        </div>
      </div>

      {/* Learning Options */}
      <div className="p-6">
        <p className="text-gray-600 text-sm font-semibold mb-4 uppercase tracking-wide">
          Choose Your Learning Path:
        </p>

        <div className="space-y-3">
          {/* Tutorial Option */}
          <motion.button
            onHoverStart={() => setHoveredOption('tutorial')}
            onHoverEnd={() => setHoveredOption(null)}
            onClick={() => handleOptionClick('tutorial')}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 flex items-center gap-4 shadow-md hover:shadow-lg transition-all"
          >
            <motion.div
              animate={hoveredOption === 'tutorial' ? { rotate: 360 } : {}}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="w-6 h-6" />
            </motion.div>
            <div className="flex-1 text-left">
              <p className="font-bold text-lg">Tutorial</p>
              <p className="text-blue-100 text-sm">Learn with interactive lessons</p>
            </div>
            <motion.div
              animate={hoveredOption === 'tutorial' ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>

          {/* Game Option */}
          <motion.button
            onHoverStart={() => setHoveredOption('game')}
            onHoverEnd={() => setHoveredOption(null)}
            onClick={() => handleOptionClick('game')}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-4 flex items-center gap-4 shadow-md hover:shadow-lg transition-all"
          >
            <motion.div
              animate={hoveredOption === 'game' ? { rotate: 360 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Gamepad2 className="w-6 h-6" />
            </motion.div>
            <div className="flex-1 text-left">
              <p className="font-bold text-lg">Play Game</p>
              <p className="text-green-100 text-sm">Learn by playing fun games</p>
            </div>
            <motion.div
              animate={hoveredOption === 'game' ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>

          {/* Sandbox Option */}
          <motion.button
            onHoverStart={() => setHoveredOption('sandbox')}
            onHoverEnd={() => setHoveredOption(null)}
            onClick={() => handleOptionClick('sandbox')}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl p-4 flex items-center gap-4 shadow-md hover:shadow-lg transition-all"
          >
            <motion.div
              animate={hoveredOption === 'sandbox' ? { rotate: 360 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Code2 className="w-6 h-6" />
            </motion.div>
            <div className="flex-1 text-left">
              <p className="font-bold text-lg">Sandbox</p>
              <p className="text-purple-100 text-sm">Practice with live coding</p>
            </div>
            <motion.div
              animate={hoveredOption === 'sandbox' ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
