// localStorage utility functions for persisting user data

const STORAGE_KEYS = {
  USER_PROGRESS: 'holiday_learning_user_progress',
  GAME_SCORES: 'holiday_learning_game_scores',
  TUTORIAL_PROGRESS: 'holiday_learning_tutorial_progress',
  ACHIEVEMENTS: 'holiday_learning_achievements',
  USER_DATA: 'holiday_learning_user_data',
} as const

export const storage = {
  // Get data from localStorage
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading from localStorage:`, error)
      return defaultValue
    }
  },

  // Set data to localStorage
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing to localStorage:`, error)
    }
  },

  // Remove data from localStorage
  remove: (key: string): void => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing from localStorage:`, error)
    }
  },

  // Clear all app data
  clearAll: (): void => {
    if (typeof window === 'undefined') return

    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        window.localStorage.removeItem(key)
      })
    } catch (error) {
      console.error(`Error clearing localStorage:`, error)
    }
  },
}

export { STORAGE_KEYS }
