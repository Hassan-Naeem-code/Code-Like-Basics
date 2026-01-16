// Progress save notification utility
// Shows toast notifications when progress is saved

import { toast } from '@/components/Common/Toast'

export type ProgressType =
  | 'xp'
  | 'achievement'
  | 'tutorial'
  | 'quiz'
  | 'sandbox'
  | 'streak'
  | 'level'
  | 'general'

interface ProgressNotificationConfig {
  message: string
  icon?: string
}

const PROGRESS_MESSAGES: Record<ProgressType, ProgressNotificationConfig> = {
  xp: {
    message: 'XP earned and saved!',
    icon: '⚡'
  },
  achievement: {
    message: 'Achievement unlocked and saved!',
    icon: '🏆'
  },
  tutorial: {
    message: 'Tutorial progress saved!',
    icon: '📚'
  },
  quiz: {
    message: 'Quiz score saved!',
    icon: '🎯'
  },
  sandbox: {
    message: 'Code exercise completed!',
    icon: '💻'
  },
  streak: {
    message: 'Streak updated!',
    icon: '🔥'
  },
  level: {
    message: 'Level up saved!',
    icon: '⬆️'
  },
  general: {
    message: 'Progress saved!',
    icon: '✓'
  }
}

/**
 * Show a success notification when progress is saved
 */
export function notifyProgressSaved(type: ProgressType = 'general', customMessage?: string) {
  const config = PROGRESS_MESSAGES[type]
  const message = customMessage || `${config.icon} ${config.message}`
  toast.success(message, 3000)
}

/**
 * Show a notification when XP is earned
 */
export function notifyXPEarned(amount: number) {
  toast.success(`⚡ +${amount} XP earned!`, 3000)
}

/**
 * Show a notification when an achievement is unlocked
 */
export function notifyAchievementUnlocked(achievementName: string) {
  toast.success(`🏆 Achievement unlocked: ${achievementName}!`, 4000)
}

/**
 * Show a notification when tutorial section is completed
 */
export function notifyTutorialSectionComplete(sectionName?: string) {
  if (sectionName) {
    toast.success(`📚 "${sectionName}" completed and saved!`, 3000)
  } else {
    toast.success('📚 Section completed and saved!', 3000)
  }
}

/**
 * Show a notification when quiz is completed
 */
export function notifyQuizComplete(score: number, total: number) {
  const percentage = Math.round((score / total) * 100)
  if (percentage >= 80) {
    toast.success(`🎯 Quiz completed! Score: ${score}/${total} (${percentage}%) - Great job!`, 4000)
  } else if (percentage >= 60) {
    toast.info(`🎯 Quiz completed! Score: ${score}/${total} (${percentage}%) - Good effort!`, 4000)
  } else {
    toast.info(`🎯 Quiz completed! Score: ${score}/${total} (${percentage}%) - Keep practicing!`, 4000)
  }
}

/**
 * Show a notification when code exercise is completed
 */
export function notifySandboxComplete(exerciseName?: string) {
  if (exerciseName) {
    toast.success(`💻 "${exerciseName}" completed!`, 3000)
  } else {
    toast.success('💻 Exercise completed and saved!', 3000)
  }
}

/**
 * Show a notification when level up occurs
 */
export function notifyLevelUp(newLevel: number) {
  toast.success(`⬆️ Level Up! You're now Level ${newLevel}!`, 5000)
}

/**
 * Show a notification when progress save fails
 */
export function notifyProgressSaveFailed(error?: string) {
  toast.error(`❌ Failed to save progress${error ? `: ${error}` : '. Please try again.'}`, 4000)
}

/**
 * Show a notification when syncing with server
 */
export function notifySyncing() {
  toast.info('🔄 Syncing progress...', 2000)
}

/**
 * Show a notification when sync is complete
 */
export function notifySyncComplete() {
  toast.success('✓ Progress synced!', 2000)
}
