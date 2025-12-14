'use client'

import { motion } from 'framer-motion'
import { Language } from '@/utils/techModules'
import { BookOpen, Gamepad2, Code2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DifficultySelector from '../Common/DifficultySelector'
import { getLanguageProgress } from '@/lib/firebaseService'

interface LanguageCardProps {
  language: Language
  moduleId: string
  index: number
}

export default function LanguageCard({ language, moduleId, index }: LanguageCardProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const [showDifficultySelector, setShowDifficultySelector] = useState(false)
  const [selectedType, setSelectedType] = useState<'tutorial' | 'game' | null>(null)
  const [tutorialProgress, setTutorialProgress] = useState<number>(0)
  const [gameProgress, setGameProgress] = useState<number>(0)
  const [savedDifficulty, setSavedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null)
  const router = useRouter()

  const languageKey = `${moduleId}-${language.id}`

  // Load progress from Firebase
  useEffect(() => {
    const loadProgress = async () => {
      const userCode = localStorage.getItem('userCode')
      if (!userCode) return

      try {
        const progress = await getLanguageProgress(userCode, languageKey)
        if (progress) {
          setSavedDifficulty(progress.difficulty)

          // Calculate tutorial progress percentage
          const tutorialPercent = progress.tutorialProgress.totalSections > 0
            ? Math.round((progress.tutorialProgress.completedSections.length / progress.tutorialProgress.totalSections) * 100)
            : 0
          setTutorialProgress(tutorialPercent)

          // Calculate game progress percentage
          const gamePercent = progress.gameProgress.totalLevels > 0
            ? Math.round((progress.gameProgress.completedLevels.length / progress.gameProgress.totalLevels) * 100)
            : 0
          setGameProgress(gamePercent)
        }
      } catch (error) {
        console.error('Error loading language progress:', error)
      }
    }

    loadProgress()
  }, [languageKey])

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

  const getSavedDifficultyColor = () => {
    if (!savedDifficulty) return ''
    switch (savedDifficulty) {
      case 'easy':
        return 'bg-green-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'hard':
        return 'bg-red-500'
    }
  }

  const getSavedDifficultyLabel = () => {
    if (!savedDifficulty) return ''
    switch (savedDifficulty) {
      case 'easy':
        return 'Easy'
      case 'medium':
        return 'Medium'
      case 'hard':
        return 'Hard'
    }
  }

  const handleOptionClick = (type: 'tutorial' | 'game' | 'sandbox') => {
    if (type === 'sandbox') {
      // Sandbox doesn't need difficulty selection
      router.push(`/sandbox/${moduleId}-${language.id}`)
    } else {
      // Show difficulty selector for tutorial and game
      setSelectedType(type)
      setShowDifficultySelector(true)
    }
  }

  const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (selectedType) {
      // Navigate with difficulty parameter
      router.push(`/${selectedType}/${moduleId}-${language.id}?difficulty=${difficulty}`)
    }
    setShowDifficultySelector(false)
  }

  const handleCloseSelector = () => {
    setShowDifficultySelector(false)
    setSelectedType(null)
  }

  const hasProgress = tutorialProgress > 0 || gameProgress > 0

  return (
    <>
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
              <div className="flex flex-col gap-2 items-end">
                <div className={`${getDifficultyColor()} px-3 py-1 rounded-full text-xs font-bold text-white uppercase`}>
                  {language.difficulty}
                </div>
                {savedDifficulty && (
                  <div className={`${getSavedDifficultyColor()} px-3 py-1 rounded-full text-xs font-bold text-white`}>
                    Learning: {getSavedDifficultyLabel()}
                  </div>
                )}
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

        {/* Progress Indicators - Only show if user has progress */}
        {hasProgress && (
          <div className="px-6 pt-4 pb-2 bg-gray-50 border-b border-gray-200">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Your Progress:
            </p>

            {tutorialProgress > 0 && (
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    Tutorial
                  </span>
                  <span className="text-sm font-bold text-blue-600">{tutorialProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${tutorialProgress}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
              </div>
            )}

            {gameProgress > 0 && (
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Gamepad2 className="w-4 h-4" />
                    Game
                  </span>
                  <span className="text-sm font-bold text-green-600">{gameProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${gameProgress}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.1 }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

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
                <p className="font-bold text-lg">
                  Tutorial
                  {tutorialProgress > 0 && <span className="ml-2 text-sm">({tutorialProgress}%)</span>}
                </p>
                <p className="text-blue-100 text-sm">Learn from basics to advanced</p>
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
                <p className="font-bold text-lg">
                  Play Game
                  {gameProgress > 0 && <span className="ml-2 text-sm">({gameProgress}%)</span>}
                </p>
                <p className="text-green-100 text-sm">Progressive quiz levels</p>
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

      {/* Difficulty Selector Modal */}
      {showDifficultySelector && selectedType && (
        <DifficultySelector
          languageName={language.name}
          type={selectedType}
          onSelectDifficulty={handleDifficultySelect}
          onClose={handleCloseSelector}
        />
      )}
    </>
  )
}
