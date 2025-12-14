'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { getModuleById } from '@/utils/techModules'
import LanguageCard from '@/components/Dashboard/LanguageCard'

export default function ModuleLanguagesPage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = params.moduleId as string

  const selectedModule = getModuleById(moduleId)

  if (!selectedModule) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Module Not Found</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
          >
            Go Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pb-20">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [null, Math.random() * 0.5 + 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push('/dashboard')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-8 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Modules</span>
        </motion.button>

        {/* Module Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="text-8xl">{selectedModule.icon}</div>
          </motion.div>

          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {selectedModule.name}
          </h1>

          <p className="text-2xl text-white/80 max-w-2xl mx-auto">
            {selectedModule.description}
          </p>

          {/* Decorative Line */}
          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-8"
            initial={{ width: 0 }}
            animate={{ width: '50%' }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        {/* Languages Section */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">Choose a Language</h2>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {selectedModule.languages.map((language, index) => (
              <LanguageCard
                key={language.id}
                language={language}
                moduleId={selectedModule.id}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
        >
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            📚 How Learning Works
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-white/90">
            <div className="text-center">
              <div className="text-4xl mb-2">📖</div>
              <h4 className="font-bold mb-2">Tutorial</h4>
              <p className="text-sm">
                Interactive lessons with syntax, usage, and descriptions. Practice in a live sandbox!
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎮</div>
              <h4 className="font-bold mb-2">Game</h4>
              <p className="text-sm">
                Learn while having fun! Games designed to teach concepts through play.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💻</div>
              <h4 className="font-bold mb-2">Sandbox</h4>
              <p className="text-sm">
                Test and experiment with code in a safe environment. Try anything!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
