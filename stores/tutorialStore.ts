import { create } from 'zustand'
import { storage, STORAGE_KEYS } from '@/utils/storage'

export interface TutorialProgress {
  currentSection: number
  totalSections: number
  completed: boolean
  bookmarked: boolean
  quizScore?: number
  lastAccessedAt: Date
}

export interface TopicProgress {
  tutorial: number // 0-100%
  game: number // 0-100%
  sandbox: number // 0-100%
}

export interface AllProgress {
  [topicId: string]: TopicProgress
}

interface TutorialStore {
  tutorialProgress: { [tutorialId: string]: TutorialProgress }
  topicProgress: AllProgress

  // Actions
  updateTutorialProgress: (tutorialId: string, section: number, total: number) => void
  completeTutorial: (tutorialId: string, quizScore: number) => void
  toggleBookmark: (tutorialId: string) => void
  updateTopicProgress: (topicId: string, type: 'tutorial' | 'game' | 'sandbox', percentage: number) => void
  loadFromStorage: () => void
  getTutorialProgress: (tutorialId: string) => TutorialProgress | null
  getOverallProgress: () => number
}

const DEFAULT_TOPIC_PROGRESS: TopicProgress = {
  tutorial: 0,
  game: 0,
  sandbox: 0,
}

export const useTutorialStore = create<TutorialStore>((set, get) => ({
  tutorialProgress: {},
  topicProgress: {},

  updateTutorialProgress: (tutorialId: string, section: number, total: number) => {
    set((state) => {
      const updated = {
        ...state.tutorialProgress,
        [tutorialId]: {
          ...state.tutorialProgress[tutorialId],
          currentSection: section,
          totalSections: total,
          completed: section >= total,
          lastAccessedAt: new Date(),
        } as TutorialProgress,
      }
      storage.set(STORAGE_KEYS.TUTORIAL_PROGRESS, updated)
      return { tutorialProgress: updated }
    })
  },

  completeTutorial: (tutorialId: string, quizScore: number) => {
    set((state) => {
      const updated = {
        ...state.tutorialProgress,
        [tutorialId]: {
          ...state.tutorialProgress[tutorialId],
          completed: true,
          quizScore,
          lastAccessedAt: new Date(),
        } as TutorialProgress,
      }
      storage.set(STORAGE_KEYS.TUTORIAL_PROGRESS, updated)
      return { tutorialProgress: updated }
    })
  },

  toggleBookmark: (tutorialId: string) => {
    set((state) => {
      const current = state.tutorialProgress[tutorialId] || {
        currentSection: 0,
        totalSections: 0,
        completed: false,
        bookmarked: false,
        lastAccessedAt: new Date(),
      }

      const updated = {
        ...state.tutorialProgress,
        [tutorialId]: {
          ...current,
          bookmarked: !current.bookmarked,
        },
      }
      storage.set(STORAGE_KEYS.TUTORIAL_PROGRESS, updated)
      return { tutorialProgress: updated }
    })
  },

  updateTopicProgress: (topicId: string, type: 'tutorial' | 'game' | 'sandbox', percentage: number) => {
    set((state) => {
      const currentProgress = state.topicProgress[topicId] || DEFAULT_TOPIC_PROGRESS
      const updated = {
        ...state.topicProgress,
        [topicId]: {
          ...currentProgress,
          [type]: Math.min(100, Math.max(0, percentage)),
        },
      }
      storage.set(STORAGE_KEYS.USER_PROGRESS, updated)
      return { topicProgress: updated }
    })
  },

  loadFromStorage: () => {
    const savedTutorials = storage.get<{ [tutorialId: string]: TutorialProgress }>(
      STORAGE_KEYS.TUTORIAL_PROGRESS,
      {}
    )
    const savedProgress = storage.get<AllProgress>(STORAGE_KEYS.USER_PROGRESS, {})
    set({ tutorialProgress: savedTutorials, topicProgress: savedProgress })
  },

  getTutorialProgress: (tutorialId: string) => {
    const { tutorialProgress } = get()
    return tutorialProgress[tutorialId] || null
  },

  getOverallProgress: () => {
    const { topicProgress } = get()
    const topics = Object.values(topicProgress)
    if (topics.length === 0) return 0

    const totalProgress = topics.reduce((acc, topic) => {
      return acc + (topic.tutorial + topic.game + topic.sandbox) / 3
    }, 0)

    return Math.round(totalProgress / topics.length)
  },
}))
