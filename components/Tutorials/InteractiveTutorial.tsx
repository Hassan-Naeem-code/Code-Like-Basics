'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Code2, Play, Trophy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Tutorial, TutorialSection } from '@/utils/tutorialContent'
import { Language } from '@/utils/techModules'
import { useXP, XP_REWARDS } from '@/hooks/useXP'
import confetti from 'canvas-confetti'

interface InteractiveTutorialProps {
  tutorial: Tutorial
  language: Language
  moduleId: string
  languageId: string
}

export default function InteractiveTutorial({
  tutorial,
  language,
  moduleId,
  languageId,
}: InteractiveTutorialProps) {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())
  const [sandboxCode, setSandboxCode] = useState('')
  const [sandboxOutput, setSandboxOutput] = useState('')
  const [showCelebration, setShowCelebration] = useState(false)

  const userCode = typeof window !== 'undefined' ? localStorage.getItem('userCode') : null
  const { awardXP, isAwarding } = useXP(userCode)

  const section = tutorial.sections[currentSection]
  const isLastSection = currentSection === tutorial.sections.length - 1
  const allCompleted = completedSections.size === tutorial.sections.length

  useEffect(() => {
    if (section.codeExample) {
      setSandboxCode(section.codeExample)
    }
  }, [currentSection, section.codeExample])

  const handleNext = () => {
    if (!isLastSection) {
      setCurrentSection(currentSection + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleCompleteSection = async () => {
    if (!completedSections.has(currentSection)) {
      const newCompleted = new Set(completedSections)
      newCompleted.add(currentSection)
      setCompletedSections(newCompleted)

      // Award XP
      await awardXP(XP_REWARDS.TUTORIAL_SECTION, true)

      // Check if all sections are complete
      if (newCompleted.size === tutorial.sections.length) {
        setShowCelebration(true)
        await awardXP(XP_REWARDS.TUTORIAL_COMPLETE, true)

        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
        })

        setTimeout(() => {
          setShowCelebration(false)
        }, 4000)
      }
    }

    if (!isLastSection) {
      handleNext()
    }
  }

  const handleRunCode = () => {
    // Simulated code execution
    setSandboxOutput(`// Code executed!\n// Output: Code ran successfully!\n// This is a simulation - the actual code execution would depend on the language.`)
    awardXP(XP_REWARDS.SANDBOX_EXECUTE, false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pb-20">
      {/* Celebration Modal */}
      <AnimatePresence>
        {showCelebration && (
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
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-12 text-center shadow-2xl max-w-md mx-4"
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: 3 }}
              >
                <Trophy className="w-24 h-24 mx-auto text-white mb-6" />
              </motion.div>
              <h2 className="text-5xl font-bold text-white mb-4">
                Congratulations! 🎉
              </h2>
              <p className="text-2xl text-white/90 mb-4">
                You completed the {language.name} tutorial!
              </p>
              <p className="text-xl text-white/80">
                +{XP_REWARDS.TUTORIAL_COMPLETE} XP Bonus!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => router.push(`/module/${moduleId}`)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            className="flex items-center gap-2 text-white/80 hover:text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {language.name}</span>
          </motion.button>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-xl px-6 py-3">
            <div className="text-6xl">{tutorial.icon}</div>
            <div>
              <h1 className="text-2xl font-bold text-white">{tutorial.title}</h1>
              <p className="text-white/70">{tutorial.description}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white font-semibold">
              Section {currentSection + 1} of {tutorial.sections.length}
            </p>
            <p className="text-white/70">
              {completedSections.size} / {tutorial.sections.length} completed
            </p>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
              initial={{ width: 0 }}
              animate={{
                width: `${(completedSections.size / tutorial.sections.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tutorial Content */}
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-bold text-gray-800">
                {section.title}
              </h2>
              {completedSections.has(currentSection) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-green-500 text-white p-3 rounded-full"
                >
                  <Check className="w-6 h-6" />
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {section.content}
                </p>
              </div>

              {section.syntax && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <h3 className="font-bold text-gray-800 mb-2">Syntax:</h3>
                  <code className="text-blue-700 font-mono">{section.syntax}</code>
                </div>
              )}

              {section.usage && (
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                  <h3 className="font-bold text-gray-800 mb-2">Usage:</h3>
                  <p className="text-gray-700">{section.usage}</p>
                </div>
              )}

              {section.codeExample && (
                <div className="bg-gray-900 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <Code2 className="w-5 h-5" />
                      Code Example
                    </h3>
                  </div>
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                    {section.codeExample}
                  </pre>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>

              <button
                onClick={handleCompleteSection}
                disabled={isAwarding}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {completedSections.has(currentSection) ? (
                  <>
                    <Check className="w-5 h-5" />
                    Completed
                  </>
                ) : (
                  <>
                    Complete & Earn {XP_REWARDS.TUTORIAL_SECTION} XP
                  </>
                )}
                {!isLastSection && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          {/* Interactive Sandbox */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Code2 className="w-8 h-8" />
              Try It Yourself
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Code Editor
                </label>
                <textarea
                  value={sandboxCode}
                  onChange={(e) => setSandboxCode(e.target.value)}
                  className="w-full h-64 bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-xl border-2 border-gray-700 focus:border-purple-500 focus:outline-none resize-none"
                  placeholder="Write your code here..."
                />
              </div>

              <button
                onClick={handleRunCode}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Run Code (+{XP_REWARDS.SANDBOX_EXECUTE} XP)
              </button>

              {sandboxOutput && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Output
                  </label>
                  <div className="bg-gray-900 text-gray-300 font-mono text-sm p-4 rounded-xl min-h-32 whitespace-pre-wrap">
                    {sandboxOutput}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>💡 Tip:</strong> Try modifying the code example above to see what happens!
                Experiment and learn by doing.
              </p>
            </div>
          </div>
        </div>

        {/* All Completed Message */}
        {allCompleted && !showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-center text-white"
          >
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">Tutorial Complete! 🎉</h3>
            <p className="text-xl mb-6">
              You&apos;ve mastered the basics of {language.name}!
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push(`/game/${moduleId}-${languageId}`)}
                className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                Play Game Next
              </button>
              <button
                onClick={() => router.push(`/sandbox/${moduleId}-${languageId}`)}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-bold hover:bg-white/30 transition-all"
              >
                Open Sandbox
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
