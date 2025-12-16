'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, RotateCcw, Save, Download, Code2, Terminal, BookOpen, ChevronLeft, ChevronRight, Check, Lightbulb, Trophy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Language } from '@/utils/techModules'
import { useXP, XP_REWARDS } from '@/hooks/useXP'
import { generateSandboxExercises } from '@/utils/sandboxExercises'
import { getSession } from '@/utils/sessionManager'
import { getLanguageProgress, updateSandboxProgress, initializeLanguageProgress, fillGlass, getUserProfile, getNextDifficulty } from '@/lib/firebaseService'
import { triggerProfileRefresh } from '@/components/Progress/GlobalProgressGlass'
import confetti from 'canvas-confetti'
import Certificate from '@/components/Common/Certificate'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { SandboxExercise } from '@/utils/sandboxExercises'

interface UniversalSandboxProps {
  language: Language
  moduleId: string
  languageId: string
}

const STARTER_CODE: { [key: string]: string } = {
  html: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Start building your webpage here.</p>
</body>
</html>`,
  css: `/* Add your CSS styles here */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
}`,
  javascript: `// Write your JavaScript code here
console.log("Hello, World!");

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Learner"));`,
  python: `# Write your Python code here
print("Hello, World!")

def greet(name):
    return f"Hello, {name}!"

print(greet("Learner"))`,
  react: `import React from 'react';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`,
}

export default function UniversalSandbox({ language, moduleId, languageId }: UniversalSandboxProps) {
  const router = useRouter()
  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')

  // Exercise system - memoize to prevent recreation on every render
  const exercises = useMemo(() =>
    generateSandboxExercises(languageId, language.name, currentDifficulty).exercises,
    [languageId, language.name, currentDifficulty]
  )
  const [exerciseMode, setExerciseMode] = useState(true)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)
  const [userName, setUserName] = useState<string>('')
  const [allDifficultiesCompleted, setAllDifficultiesCompleted] = useState(false)

  const currentExercise = exercises[currentExerciseIndex]
  const languageKey = `${moduleId}-${languageId}`

  const [code, setCode] = useState(
    exerciseMode && currentExercise
      ? currentExercise.starterCode
      : STARTER_CODE[languageId] || `// ${language.name} Sandbox\n// Write your ${language.name} code here\n\nconsole.log("Hello from ${language.name}");`
  )
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const userCode = typeof window !== 'undefined' ? getSession() : null
  const { awardXP } = useXP(userCode)

  // Load saved progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      if (!userCode) {
        setIsLoading(false)
        return
      }

      try {
        // Get user profile for name
        const profile = await getUserProfile(userCode)
        if (profile) {
          setUserName(profile.name)
        }

        // Load progress
        const progress = await getLanguageProgress(userCode, languageKey)

        // Initialize if missing, otherwise use saved difficulty & progress
        if (!progress) {
          await initializeLanguageProgress(userCode, languageKey, 'easy', 8, 8)
        }

        // Determine current difficulty level
        const completedDifficulties = progress?.completedDifficulties?.sandbox || []
        const nextDiff = getNextDifficulty(completedDifficulties)
        
        if (!nextDiff) {
          // All difficulties completed
          setAllDifficultiesCompleted(true)
          setCurrentDifficulty('easy') // keep UI consistent
        } else {
          setCurrentDifficulty(nextDiff)
        }

        // Load progress for current difficulty
        if (progress?.sandboxProgress) {
          const difficultyProgress = progress.sandboxProgress[nextDiff || 'easy']
          if (difficultyProgress) {
            setCurrentExerciseIndex(difficultyProgress.currentExercise || 0)
            setCompletedExercises(difficultyProgress.completedExercises || [])
          }
        }
      } catch (error) {
        console.error('Error loading sandbox progress:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProgress()
  }, [userCode, languageKey])

  // Update code when exercise changes
  useEffect(() => {
    if (exerciseMode && currentExercise) {
      setCode(currentExercise.starterCode)
      setOutput('')
      setShowHint(false)
      setShowSolution(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExerciseIndex, exerciseMode])

  // Check if exercise is completed
  const checkExercise = async () => {
    if (!exerciseMode || !currentExercise || !userCode) return

    // Simple validation: check if code contains key parts of solution
    const codeNormalized = code.trim().replace(/\s+/g, ' ')
    const solutionNormalized = currentExercise.solution.trim().replace(/\s+/g, ' ')

    // Basic check: if code is very similar to solution
    const similarity = calculateSimilarity(codeNormalized, solutionNormalized)

    if (similarity > 0.7 || codeNormalized.includes(solutionNormalized)) {
      if (!completedExercises.includes(currentExerciseIndex)) {
        const newCompleted = [...completedExercises, currentExerciseIndex]
        const isNowComplete = newCompleted.length >= exercises.length
        setCompletedExercises(newCompleted)

        // Award XP
        await awardXP(XP_REWARDS.SANDBOX_EXECUTE * 2, false)

        // Save progress to Firebase first
        try {
          await updateSandboxProgress(userCode, languageKey, currentDifficulty, currentExerciseIndex, newCompleted, exercises.length)

          if (isNowComplete) {
            // Complete - show celebration!
            await awardXP(XP_REWARDS.SANDBOX_COMPLETE, false)
            await fillGlass(userCode)

            // Show celebration modal
            setShowCelebration(true)

            // Big confetti
            confetti({
              particleCount: 200,
              spread: 100,
              origin: { y: 0.6 },
            })

            // Show certificate after 4 seconds
            setTimeout(() => {
              setShowCelebration(false)
              setShowCertificate(true)
            }, 4000)

            setOutput(`🎉 ALL EXERCISES COMPLETED!\n\nYou finished all ${exercises.length} exercises!\n\n+${XP_REWARDS.SANDBOX_COMPLETE} Bonus XP!\n\nYour certificate is being generated...`)
          } else {
            // Not complete yet - show regular completion message
            setOutput(`✅ Excellent! Exercise completed!\n\nExpected: ${currentExercise.expectedOutput}\n\nYou earned ${XP_REWARDS.SANDBOX_EXECUTE * 2} XP!\n\nMoving to next exercise...`)

            // Auto-advance to next exercise after 2 seconds
            setTimeout(() => {
              setCurrentExerciseIndex(currentExerciseIndex + 1)
            }, 2000)
          }

          // Trigger progress glass refresh
          triggerProfileRefresh()
        } catch (error) {
          console.error('Error saving sandbox progress:', error)
          setOutput(`✅ Exercise completed but failed to save progress. Please try again.`)
        }
      } else {
        setOutput(`✅ Correct! (Already completed)\n\nExpected: ${currentExercise.expectedOutput}`)
      }
    } else {
      setOutput(`❌ Not quite right. Try again!\n\nHint: ${showHint ? currentExercise.hint : 'Click "Show Hint" for help'}`)
    }
  }

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1
    if (longer.length === 0) return 1.0
    const editDistance = getEditDistance(longer, shorter)
    return (longer.length - editDistance) / longer.length
  }

  const getEditDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = []
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        }
      }
    }
    return matrix[str2.length][str1.length]
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput('// Running code...\n')

    await awardXP(XP_REWARDS.SANDBOX_EXECUTE, false)

    // Simulate code execution
    setTimeout(() => {
      if (exerciseMode) {
        // In exercise mode, check the solution
        checkExercise()
      } else {
        // Free sandbox mode
        const simulatedOutput = `// Code executed successfully!\n// Language: ${language.name}\n// Lines of code: ${(code || '').split('\n').length}\n\n// Output:\n${getSimulatedOutput(languageId, code || '')}\n\n// This is a simulated execution environment.\n// In a production app, this would connect to a real code execution service.`
        setOutput(simulatedOutput)
      }
      setIsRunning(false)
    }, 1000)
  }

  const handleNextExercise = async () => {
    if (currentExerciseIndex < exercises.length - 1) {
      const nextIndex = currentExerciseIndex + 1
      setCurrentExerciseIndex(nextIndex)

      // Save progress
      if (userCode) {
        try {
          await updateSandboxProgress(userCode, languageKey, currentDifficulty, nextIndex, completedExercises, exercises.length)
        } catch (error) {
          console.error('Error saving sandbox progress:', error)
        }
      }
    }
  }

  const handlePreviousExercise = async () => {
    if (currentExerciseIndex > 0) {
      const prevIndex = currentExerciseIndex - 1
      setCurrentExerciseIndex(prevIndex)

      // Save progress
      if (userCode) {
        try {
          await updateSandboxProgress(userCode, languageKey, currentDifficulty, prevIndex, completedExercises, exercises.length)
        } catch (error) {
          console.error('Error saving sandbox progress:', error)
        }
      }
    }
  }

  const handleReset = () => {
    if (exerciseMode && currentExercise) {
      setCode(currentExercise.starterCode)
    } else {
      setCode(
        STARTER_CODE[languageId] || `// ${language.name} Sandbox\n// Write your ${language.name} code here\n\nconsole.log("Hello from ${language.name}!");`
      )
    }
    setOutput('')
    setShowHint(false)
    setShowSolution(false)
  }

  const handleSave = () => {
    localStorage.setItem(`sandbox-${moduleId}-${languageId}`, code)
    alert('Code saved to browser storage!')
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([code], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${languageId}-code.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Show loading screen while fetching progress
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <div className="text-white text-2xl">Loading exercises...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pb-10">
      {/* Celebration Modal */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center shadow-2xl max-w-md mx-4"
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: 3 }}
              >
                <Trophy className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto text-white mb-4 sm:mb-5 md:mb-6" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
                Congratulations! 🎉
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-3 md:mb-4">
                You completed all {language.name} {currentDifficulty} exercises!
              </p>
              <p className="text-base sm:text-lg md:text-xl text-white/80">
                +{XP_REWARDS.SANDBOX_COMPLETE} XP Bonus!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && userName && (
          <Certificate
            userName={userName}
            languageName={language.name}
            difficulty={currentDifficulty}
            type="tutorial"
            onClose={() => {
              setShowCertificate(false)
              // Redirect back to module after closing certificate
              router.push(`/module/${moduleId}`)
            }}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-2 sm:px-4 py-4 md:py-6">
        {/* All Difficulties Completed Message */}
        {allDifficultiesCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-center text-white"
          >
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">All Levels Mastered! 🏆</h2>
            <p className="text-lg mb-4">
              You&apos;ve completed Easy, Medium, and Hard sandbox exercises!
            </p>
            <button
              onClick={() => router.push(`/module/${moduleId}`)}
              className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
            >
              Back to Module
            </button>
          </motion.div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-3 md:mb-5 flex-wrap gap-2 md:gap-4">
          <motion.button
            onClick={() => router.push(`/module/${moduleId}`)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            className="flex items-center gap-1 md:gap-2 text-white/80 hover:text-white bg-white/10 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Back to {language.name}</span>
            <span className="sm:hidden">Back</span>
          </motion.button>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 bg-white/10 backdrop-blur-lg rounded-xl px-3 sm:px-4 md:px-6 py-2 md:py-3 flex-wrap">
            <div className="text-3xl sm:text-4xl md:text-5xl">{language.icon}</div>
            <div>
              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight">{language.name} Sandbox</h1>
              <p className="text-white/70 text-xs sm:text-sm leading-tight">
                {currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)} Level
              </p>
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="mb-3 md:mb-5 flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
          <button
            onClick={() => setExerciseMode(!exerciseMode)}
            disabled={allDifficultiesCompleted}
            className={`px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold transition-all text-sm md:text-base ${
              exerciseMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            } ${allDifficultiesCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <BookOpen className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
            {exerciseMode ? 'Practice Mode' : 'Free Sandbox'}
          </button>
          {exerciseMode && !allDifficultiesCompleted && (
            <div className="text-white/80 text-xs sm:text-sm font-semibold">
              ✓ Completed: {completedExercises.length}/{exercises.length}
            </div>
          )}
        </div>

        {/* Exercise Panel */}
        {exerciseMode && currentExercise && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 mb-4 md:mb-6 border border-purple-400/30"
          >
            <div className="flex items-start justify-between mb-3 md:mb-4 gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{currentExercise.title}</h2>
                  {completedExercises.includes(currentExerciseIndex) && (
                    <div className="bg-green-500 text-white px-2 md:px-3 py-1 rounded-full flex items-center gap-1 text-xs sm:text-sm">
                      <Check className="w-3 h-3 md:w-4 md:h-4" />
                      Completed
                    </div>
                  )}
                </div>
                <p className="text-white/90 mb-3 text-sm sm:text-base">{currentExercise.description}</p>
                <div className="bg-white/10 rounded-xl p-3 md:p-4 mb-3 md:mb-4">
                  <p className="text-white font-semibold mb-2 text-xs sm:text-sm md:text-base">📝 Instructions:</p>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base">{currentExercise.instructions}</p>
                </div>

                {/* Hint & Solution Buttons */}
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center gap-1 md:gap-2 bg-yellow-500/20 text-yellow-300 px-3 md:px-4 py-1.5 md:py-2 rounded-xl hover:bg-yellow-500/30 transition-all text-xs sm:text-sm"
                  >
                    <Lightbulb className="w-3 h-3 md:w-4 md:h-4" />
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </button>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="flex items-center gap-1 md:gap-2 bg-orange-500/20 text-orange-300 px-3 md:px-4 py-1.5 md:py-2 rounded-xl hover:bg-orange-500/30 transition-all text-xs sm:text-sm"
                  >
                    {showSolution ? 'Hide Solution' : 'View Solution'}
                  </button>
                </div>

                {/* Hint Display */}
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 md:mt-4 bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-3 md:p-4"
                    >
                      <p className="text-yellow-200 text-xs sm:text-sm md:text-base">💡 Hint: {currentExercise.hint}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Solution Display */}
                <AnimatePresence>
                  {showSolution && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 md:mt-4 bg-orange-500/20 border border-orange-400/30 rounded-xl p-3 md:p-4"
                    >
                      <p className="text-orange-200 mb-2 text-xs sm:text-sm md:text-base">✨ Solution:</p>
                      <pre className="bg-gray-900 text-green-400 p-3 md:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm whitespace-pre-wrap break-words max-w-full">
                        <code className="block">{currentExercise.solution}</code>
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex flex-col gap-1.5 md:gap-2 ml-2 sm:ml-3 md:ml-4">
                <button
                  onClick={handlePreviousExercise}
                  disabled={currentExerciseIndex === 0}
                  className="p-1.5 md:p-2 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
                <div className="text-white text-center text-xs sm:text-sm">
                  {currentExerciseIndex + 1}/{exercises.length}
                </div>
                <button
                  onClick={handleNextExercise}
                  disabled={currentExerciseIndex === exercises.length - 1}
                  className="p-1.5 md:p-2 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Toolbar */}
        {!allDifficultiesCompleted && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 md:p-4 mb-4 md:mb-6 flex items-center justify-between flex-wrap gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-1 md:gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50 text-xs sm:text-sm md:text-base"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5" />
              {isRunning ? 'Running...' : exerciseMode ? 'Check Solution' : 'Run Code'}
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1 md:gap-2 bg-white/10 text-white px-3 md:px-4 py-2 md:py-3 rounded-xl hover:bg-white/20 transition-all text-xs sm:text-sm md:text-base"
            >
              <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 md:gap-2 bg-blue-500/20 text-blue-300 px-3 md:px-4 py-2 md:py-3 rounded-xl hover:bg-blue-500/30 transition-all text-xs sm:text-sm md:text-base"
            >
              <Save className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Save</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1 md:gap-2 bg-purple-500/20 text-purple-300 px-3 md:px-4 py-2 md:py-3 rounded-xl hover:bg-purple-500/30 transition-all text-xs sm:text-sm md:text-base"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
        )}

        {/* Editor and Output */}
        {!allDifficultiesCompleted && (
        <div className="grid lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
          {/* Code Editor */}
          <div className="bg-gray-900 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gray-800 px-3 sm:px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 border-b border-gray-700">
              <Code2 className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
              <span className="text-white font-semibold text-xs sm:text-sm md:text-base">Code Editor</span>
              <span className="ml-auto text-gray-400 text-xs sm:text-sm">
                {code.split('\n').length} lines
              </span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px] bg-gray-900 text-green-400 font-mono text-xs sm:text-sm p-3 sm:p-4 md:p-6 focus:outline-none resize-none"
              spellCheck={false}
              placeholder={`Write your ${language.name} code here...`}
            />
          </div>

          {/* Output Panel */}
          <div className="bg-gray-900 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gray-800 px-3 sm:px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 border-b border-gray-700">
              <Terminal className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              <span className="text-white font-semibold text-xs sm:text-sm md:text-base">Output</span>
              {isRunning && (
                <span className="ml-auto text-yellow-400 text-xs sm:text-sm animate-pulse">
                  Executing...
                </span>
              )}
            </div>
            <div className="w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px] bg-gray-900 text-gray-300 font-mono text-xs sm:text-sm p-3 sm:p-4 md:p-6 overflow-auto whitespace-pre-wrap">
              {output || '// Click "Run Code" to see the output here...'}
            </div>
          </div>
        </div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 md:mt-6 bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6"
        >
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 text-white">
            <div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2">🎯 Experiment Freely</h3>
              <p className="text-white/80 text-xs sm:text-sm">
                Try different {language.name} syntax and see instant results. No setup required!
              </p>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2">💾 Save Your Work</h3>
              <p className="text-white/80 text-xs sm:text-sm">
                Save your code to browser storage or download it to your computer.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2">⭐ Earn XP</h3>
              <p className="text-white/80 text-xs sm:text-sm">
                Every time you run code, you earn {XP_REWARDS.SANDBOX_EXECUTE} XP. Keep experimenting!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function getSimulatedOutput(languageId: string, _code?: string): string {
  void _code
  // Simulate different outputs based on language
  const outputs: { [key: string]: string } = {
    javascript: '"Hello, World!"\n"Hello, Learner!"',
    python: 'Hello, World!\nHello, Learner!',
    html: 'Rendered HTML page (This would show in a preview window)',
    css: 'Styles applied successfully!',
    react: 'React component rendered successfully!',
  }

  return outputs[languageId] || 'Code executed successfully!\n> Output would appear here in a real execution environment.'
}
