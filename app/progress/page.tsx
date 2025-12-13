'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useUserStore } from '@/stores/userStore'
import { useTutorialStore } from '@/stores/tutorialStore'
import { useGameStore } from '@/stores/gameStore'
import { TOPICS } from '@/utils/topicConfig'
import { Trophy, Star, Flame, TrendingUp } from 'lucide-react'

export default function ProgressPage() {
  const { user, loadFromStorage } = useUserStore()
  const { topicProgress, getOverallProgress, loadFromStorage: loadTutorialStorage } = useTutorialStore()
  const { gameScores, loadFromStorage: loadGameStorage } = useGameStore()

  useEffect(() => {
    loadFromStorage()
    loadTutorialStorage()
    loadGameStorage()
  }, [loadFromStorage, loadTutorialStorage, loadGameStorage])

  const overallProgress = getOverallProgress()
  const totalGamesPlayed = Object.keys(gameScores).length
  const totalStars = Object.values(gameScores).reduce((acc, game) => {
    return acc + Object.values(game).reduce((sum, score) => sum + (score?.stars || 0), 0)
  }, 0)

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white text-glow mb-4">
            📊 Your Progress
          </h1>
          <p className="text-xl text-white/80">
            Track your learning journey across all topics
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Star className="w-12 h-12 text-christmas-gold mx-auto mb-3" />
            <div className="text-4xl font-bold text-christmas-gold mb-2">
              Lv.{user.level}
            </div>
            <div className="text-white/70 text-sm">Your Level</div>
          </motion.div>

          <motion.div
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {user.totalXP}
            </div>
            <div className="text-white/70 text-sm">Total XP</div>
          </motion.div>

          <motion.div
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Flame className="w-12 h-12 text-orange-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-400 mb-2">
              {user.streak}
            </div>
            <div className="text-white/70 text-sm">Day Streak</div>
          </motion.div>

          <motion.div
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-green-400 mb-2">
              {overallProgress}%
            </div>
            <div className="text-white/70 text-sm">Overall Progress</div>
          </motion.div>
        </div>

        {/* Topic Progress */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
            <span>📚</span>
            <span>Topic Progress</span>
          </h2>

          <div className="space-y-6">
            {TOPICS.map((topic, index) => {
              const progress = topicProgress[topic.id] || { tutorial: 0, game: 0, sandbox: 0 }
              const avgProgress = Math.round((progress.tutorial + progress.game + progress.sandbox) / 3)

              return (
                <motion.div
                  key={topic.id}
                  className="bg-white/5 rounded-lg p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-4xl">{topic.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{topic.title}</h3>
                        <p className="text-white/60 text-sm">{avgProgress}% Complete</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Tutorial Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm">📖 Tutorial</span>
                        <span className="text-white font-semibold">{progress.tutorial}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div
                          className="bg-blue-500 h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress.tutorial}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                    </div>

                    {/* Game Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm">🎮 Game</span>
                        <span className="text-white font-semibold">{progress.game}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div
                          className="bg-green-500 h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress.game}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                        />
                      </div>
                    </div>

                    {/* Sandbox Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm">🛠️ Sandbox</span>
                        <span className="text-white font-semibold">{progress.sandbox}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div
                          className="bg-purple-500 h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress.sandbox}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Game Stats */}
        <div className="glass-card p-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
            <span>🎮</span>
            <span>Game Statistics</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-6 text-center">
              <div className="text-5xl mb-3">🎯</div>
              <div className="text-3xl font-bold text-white mb-2">{totalGamesPlayed}</div>
              <div className="text-white/70 text-sm">Games Played</div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 text-center">
              <div className="text-5xl mb-3">⭐</div>
              <div className="text-3xl font-bold text-white mb-2">{totalStars}</div>
              <div className="text-white/70 text-sm">Total Stars Earned</div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 text-center">
              <div className="text-5xl mb-3">🏆</div>
              <div className="text-3xl font-bold text-white mb-2">{user.achievements.length}</div>
              <div className="text-white/70 text-sm">Achievements Unlocked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
