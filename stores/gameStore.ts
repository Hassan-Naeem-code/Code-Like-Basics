import { create } from 'zustand'
import { storage, STORAGE_KEYS } from '@/utils/storage'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface GameScore {
  score: number
  completed: boolean
  stars: number // 0-3
  timeInSeconds: number
  accuracy: number // 0-100
  completedAt?: Date
}

export interface GameScores {
  [gameId: string]: {
    [difficulty in Difficulty]?: GameScore
  }
}

interface GameStore {
  currentGame: string | null
  currentDifficulty: Difficulty
  currentScore: number
  lives: number
  hintsUsed: number
  gameScores: GameScores

  // Actions
  startGame: (gameId: string, difficulty: Difficulty) => void
  endGame: (finalScore: number, timeInSeconds: number, accuracy: number) => void
  updateScore: (points: number) => void
  loseLife: () => void
  useHint: () => void
  resetCurrentGame: () => void
  loadFromStorage: () => void
  getBestScore: (gameId: string, difficulty: Difficulty) => GameScore | null
}

const DEFAULT_LIVES = 3
const DEFAULT_HINTS = 3

export const useGameStore = create<GameStore>((set, get) => ({
  currentGame: null,
  currentDifficulty: 'easy',
  currentScore: 0,
  lives: DEFAULT_LIVES,
  hintsUsed: 0,
  gameScores: {},

  startGame: (gameId: string, difficulty: Difficulty) => {
    set({
      currentGame: gameId,
      currentDifficulty: difficulty,
      currentScore: 0,
      lives: DEFAULT_LIVES,
      hintsUsed: 0,
    })
  },

  endGame: (finalScore: number, timeInSeconds: number, accuracy: number) => {
    const { currentGame, currentDifficulty, gameScores } = get()
    if (!currentGame) return

    // Calculate stars (1-3)
    let stars = 1
    if (accuracy >= 80 && timeInSeconds < 180) stars = 2
    if (accuracy >= 95 && timeInSeconds < 120) stars = 3

    const newScore: GameScore = {
      score: finalScore,
      completed: true,
      stars,
      timeInSeconds,
      accuracy,
      completedAt: new Date(),
    }

    // Update scores
    const updatedScores = {
      ...gameScores,
      [currentGame]: {
        ...gameScores[currentGame],
        [currentDifficulty]: newScore,
      },
    }

    storage.set(STORAGE_KEYS.GAME_SCORES, updatedScores)
    set({ gameScores: updatedScores })
  },

  updateScore: (points: number) => {
    set((state) => ({
      currentScore: state.currentScore + points,
    }))
  },

  loseLife: () => {
    set((state) => ({
      lives: Math.max(0, state.lives - 1),
    }))
  },

  useHint: () => {
    set((state) => ({
      hintsUsed: state.hintsUsed + 1,
    }))
  },

  resetCurrentGame: () => {
    set({
      currentGame: null,
      currentScore: 0,
      lives: DEFAULT_LIVES,
      hintsUsed: 0,
    })
  },

  loadFromStorage: () => {
    const savedScores = storage.get<GameScores>(STORAGE_KEYS.GAME_SCORES, {})
    set({ gameScores: savedScores })
  },

  getBestScore: (gameId: string, difficulty: Difficulty) => {
    const { gameScores } = get()
    return gameScores[gameId]?.[difficulty] || null
  },
}))
