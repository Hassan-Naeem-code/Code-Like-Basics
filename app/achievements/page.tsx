'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useUserStore } from '@/stores/userStore'
import { Award, Lock } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first tutorial',
    icon: '🎯',
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 'game-master',
    title: 'Game Master',
    description: 'Win any game on hard difficulty',
    icon: '🎮',
    color: 'from-purple-500 to-purple-700',
  },
  {
    id: 'scholar',
    title: 'Scholar',
    description: 'Complete all tutorials in one topic',
    icon: '📚',
    color: 'from-green-500 to-green-700',
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete a game in under 2 minutes',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: 'Win a game with 0 mistakes',
    icon: '💯',
    color: 'from-pink-500 to-rose-700',
  },
  {
    id: 'experimenter',
    title: 'Experimenter',
    description: 'Spend 30 minutes in sandboxes',
    icon: '🔬',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Finish one entire topic all 3 ways',
    icon: '🏅',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'legend',
    title: 'Legend',
    description: 'Complete all 7 topics',
    icon: '👑',
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    id: 'speedrunner',
    title: 'Speedrunner',
    description: 'Get time bonus in 5 games',
    icon: '🏃',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'thinker',
    title: 'Thinker',
    description: 'Score 100% on any tutorial quiz',
    icon: '🧠',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    color: 'from-red-500 to-orange-600',
  },
  {
    id: 'triple-threat',
    title: 'Triple Threat',
    description: 'Complete tutorial, game, and sandbox in one day',
    icon: '🎭',
    color: 'from-violet-500 to-purple-700',
  },
]

export default function AchievementsPage() {
  const { user, loadFromStorage } = useUserStore()

  useEffect(() => {
    loadFromStorage()
  }, [loadFromStorage])

  const unlockedIds = user.achievements
  const unlockedCount = unlockedIds.length
  const totalCount = ALL_ACHIEVEMENTS.length
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100)

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
            🏆 Achievements
          </h1>
          <p className="text-xl text-white/80 mb-6">
            Unlock badges by completing challenges
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Progress</span>
              <span className="text-white font-bold">
                {unlockedCount} / {totalCount}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-christmas-gold to-yellow-400 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ALL_ACHIEVEMENTS.map((achievement, index) => {
            const isUnlocked = unlockedIds.includes(achievement.id)

            return (
              <motion.div
                key={achievement.id}
                className={`
                  glass-card p-6 text-center relative overflow-hidden
                  ${isUnlocked ? 'ring-2 ring-christmas-gold' : 'opacity-70'}
                `}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-10`}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`text-6xl mb-4 ${!isUnlocked && 'grayscale'}`}
                    animate={isUnlocked ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {achievement.icon}
                  </motion.div>

                  {/* Lock Overlay */}
                  {!isUnlocked && (
                    <div className="absolute top-4 right-4">
                      <Lock className="w-6 h-6 text-white/50" />
                    </div>
                  )}

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-2 ${isUnlocked ? 'text-christmas-gold' : 'text-white/50'}`}>
                    {achievement.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm ${isUnlocked ? 'text-white/80' : 'text-white/40'}`}>
                    {achievement.description}
                  </p>

                  {/* Unlocked Badge */}
                  {isUnlocked && (
                    <motion.div
                      className="mt-4 inline-flex items-center space-x-1 bg-christmas-gold/20 border border-christmas-gold rounded-full px-3 py-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Award className="w-4 h-4 text-christmas-gold" />
                      <span className="text-christmas-gold text-xs font-semibold">Unlocked</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Motivational Message */}
        {unlockedCount === 0 && (
          <motion.div
            className="glass-card p-8 mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Start Your Journey!
            </h3>
            <p className="text-white/80">
              Complete tutorials, play games, and experiment in sandboxes to unlock achievements!
            </p>
          </motion.div>
        )}

        {unlockedCount === totalCount && (
          <motion.div
            className="glass-card p-8 mt-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-8xl mb-4">🎊</div>
            <h3 className="text-3xl font-bold text-christmas-gold mb-2">
              Congratulations!
            </h3>
            <p className="text-white/90 text-xl">
              You&apos;ve unlocked all achievements! You&apos;re a learning legend! 👑
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
