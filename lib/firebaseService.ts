import { db } from './firebase'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore'
import { generateUniqueCode } from '@/utils/userCodeGenerator'

export interface LanguageProgress {
  difficulty: 'easy' | 'medium' | 'hard'
  tutorialProgress: {
    currentSection: number
    completedSections: number[]
    totalSections: number
    completed: boolean
  }
  gameProgress: {
    currentLevel: number
    completedLevels: number[]
    totalLevels: number
    completed: boolean
  }
  lastAccessed: Timestamp
}

export interface UserProfile {
  code: string
  name: string
  age: number
  drinkPreference?: 'beer' | 'coffee' | 'coke'
  level: number
  totalXP: number
  streak: number
  achievements: string[]
  glassProgress: number // 0-100, represents how full the glass is
  languageProgress?: { [key: string]: LanguageProgress } // key format: "moduleId-languageId"
  createdAt: Timestamp
  lastActive: Timestamp
}

const USERS_COLLECTION = 'users'

/**
 * Creates a new user profile with a unique code
 */
export async function createUserProfile(
  name: string,
  age: number
): Promise<string> {
  let code = generateUniqueCode()
  let attempts = 0
  const maxAttempts = 10

  // Ensure the code is unique
  while (attempts < maxAttempts) {
    const userRef = doc(db, USERS_COLLECTION, code)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      // Code is unique, create the user
      const newUser: UserProfile = {
        code,
        name,
        age,
        level: 1,
        totalXP: 0,
        streak: 0,
        achievements: [],
        glassProgress: 0,
        createdAt: Timestamp.now(),
        lastActive: Timestamp.now(),
      }

      await setDoc(userRef, newUser)
      return code
    }

    // Code exists, generate a new one
    code = generateUniqueCode()
    attempts++
  }

  throw new Error('Failed to generate a unique code. Please try again.')
}

/**
 * Fetches user profile by code
 */
export async function getUserProfile(code: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      return userDoc.data() as UserProfile
    }
    return null
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

/**
 * Updates user's drink preference
 */
export async function updateDrinkPreference(
  code: string,
  preference: 'beer' | 'coffee' | 'coke'
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, code)
  await updateDoc(userRef, {
    drinkPreference: preference,
    lastActive: Timestamp.now(),
  })
}

/**
 * Adds XP to user and updates glass progress
 */
export async function addUserXP(code: string, xpAmount: number): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, code)
  const userDoc = await getDoc(userRef)

  if (userDoc.exists()) {
    const userData = userDoc.data() as UserProfile
    const newTotalXP = userData.totalXP + xpAmount
    const newLevel = Math.floor(newTotalXP / 1000) + 1

    // Increase glass progress (every 100 XP = 10% fill)
    let newGlassProgress = userData.glassProgress + (xpAmount / 10)

    // Cap at 100
    if (newGlassProgress > 100) {
      newGlassProgress = 100
    }

    await updateDoc(userRef, {
      totalXP: newTotalXP,
      level: newLevel,
      glassProgress: newGlassProgress,
      lastActive: Timestamp.now(),
    })
  }
}

/**
 * Empties the glass (called when Santa drinks it)
 */
export async function emptyGlass(code: string): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, code)
  await updateDoc(userRef, {
    glassProgress: 0,
    lastActive: Timestamp.now(),
  })
}

/**
 * Unlocks an achievement
 */
export async function unlockAchievement(
  code: string,
  achievementId: string
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, code)
  const userDoc = await getDoc(userRef)

  if (userDoc.exists()) {
    const userData = userDoc.data() as UserProfile
    if (!userData.achievements.includes(achievementId)) {
      await updateDoc(userRef, {
        achievements: [...userData.achievements, achievementId],
        lastActive: Timestamp.now(),
      })
    }
  }
}

/**
 * Updates user's last active timestamp
 */
export async function updateLastActive(code: string): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, code)
  await updateDoc(userRef, {
    lastActive: Timestamp.now(),
  })
}

/**
 * Gets language progress for a specific language
 */
export async function getLanguageProgress(
  code: string,
  languageKey: string // format: "moduleId-languageId"
): Promise<LanguageProgress | null> {
  const userRef = doc(db, USERS_COLLECTION, code)
  const userDoc = await getDoc(userRef)

  if (userDoc.exists()) {
    const userData = userDoc.data() as UserProfile
    return userData.languageProgress?.[languageKey] || null
  }
  return null
}

/**
 * Initializes language progress when user starts learning
 */
export async function initializeLanguageProgress(
  code: string,
  languageKey: string,
  difficulty: 'easy' | 'medium' | 'hard',
  totalTutorialSections: number,
  totalGameLevels: number
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, code)
  const userDoc = await getDoc(userRef)

  if (userDoc.exists()) {
    const userData = userDoc.data() as UserProfile
    const languageProgress = userData.languageProgress || {}

    languageProgress[languageKey] = {
      difficulty,
      tutorialProgress: {
        currentSection: 0,
        completedSections: [],
        totalSections: totalTutorialSections,
        completed: false,
      },
      gameProgress: {
        currentLevel: 0,
        completedLevels: [],
        totalLevels: totalGameLevels,
        completed: false,
      },
      lastAccessed: Timestamp.now(),
    }

    await updateDoc(userRef, {
      languageProgress,
      lastActive: Timestamp.now(),
    })
  }
}

/**
 * Updates tutorial progress for a language
 */
export async function updateTutorialProgress(
  code: string,
  languageKey: string,
  currentSection: number,
  completedSections: number[],
  completed: boolean
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, code)
  const userDoc = await getDoc(userRef)

  if (userDoc.exists()) {
    const userData = userDoc.data() as UserProfile
    const languageProgress = userData.languageProgress || {}

    if (languageProgress[languageKey]) {
      languageProgress[languageKey].tutorialProgress = {
        ...languageProgress[languageKey].tutorialProgress,
        currentSection,
        completedSections,
        completed,
      }
      languageProgress[languageKey].lastAccessed = Timestamp.now()

      await updateDoc(userRef, {
        languageProgress,
        lastActive: Timestamp.now(),
      })
    }
  }
}

/**
 * Updates game progress for a language
 */
export async function updateGameProgress(
  code: string,
  languageKey: string,
  currentLevel: number,
  completedLevels: number[],
  completed: boolean
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, code)
  const userDoc = await getDoc(userRef)

  if (userDoc.exists()) {
    const userData = userDoc.data() as UserProfile
    const languageProgress = userData.languageProgress || {}

    if (languageProgress[languageKey]) {
      languageProgress[languageKey].gameProgress = {
        ...languageProgress[languageKey].gameProgress,
        currentLevel,
        completedLevels,
        completed,
      }
      languageProgress[languageKey].lastAccessed = Timestamp.now()

      await updateDoc(userRef, {
        languageProgress,
        lastActive: Timestamp.now(),
      })
    }
  }
}
