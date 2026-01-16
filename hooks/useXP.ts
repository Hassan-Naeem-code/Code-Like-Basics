import { useState, useCallback } from 'react'
import { addUserXP } from '@/lib/firebaseService'
import confetti from 'canvas-confetti'
import { notifyXPEarned, notifyProgressSaveFailed } from '@/utils/progressNotifications'

export const XP_REWARDS = {
  TUTORIAL_COMPLETE: 100,
  TUTORIAL_SECTION: 50,
  GAME_WIN: 150,
  GAME_COMPLETE_LEVEL: 75,
  SANDBOX_EXECUTE: 25,
  SANDBOX_COMPLETE: 100,
  FIRST_TIME_BONUS: 200,
  STREAK_BONUS: 50,
}

export function useXP(userCode: string | null) {
  const [isAwarding, setIsAwarding] = useState(false)

  const awardXP = useCallback(
    async (amount: number, showConfetti: boolean = true, showNotification: boolean = true) => {
      if (!userCode) {
        console.error('No user code provided')
        return
      }

      setIsAwarding(true)

      try {
        await addUserXP(userCode, amount)

        // Show celebration
        if (showConfetti) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500', '#FF6347', '#00FF00'],
          })
        }

        // Show save confirmation notification
        if (showNotification) {
          notifyXPEarned(amount)
        }

        return true
      } catch (error) {
        console.error('Failed to award XP:', error)
        notifyProgressSaveFailed()
        return false
      } finally {
        setIsAwarding(false)
      }
    },
    [userCode]
  )

  return {
    awardXP,
    isAwarding,
  }
}
