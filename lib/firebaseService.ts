import { db } from './firebase'
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { generateUniqueCode } from '@/utils/userCodeGenerator'

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
