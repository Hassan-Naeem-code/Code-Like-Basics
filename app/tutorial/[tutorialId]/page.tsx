'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { generateComprehensiveTutorial } from '@/utils/comprehensiveTutorialContent'
import { getLanguageByModuleAndId } from '@/utils/techModules'
import InteractiveTutorial from '@/components/Tutorials/InteractiveTutorial'
import { validateSession } from '@/utils/sessionManager'

export default function TutorialPage({
  params,
}: {
  params: Promise<{ tutorialId: string }>
}) {
  const router = useRouter()
  const { tutorialId } = use(params)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Validate session before showing page
  useEffect(() => {
    const userCode = validateSession(() => router.push('/'))
    if (!userCode) {
      return
    }
    setIsAuthenticated(true)
  }, [router])

  // Parse moduleId-languageId format
  const knownModules = [
    'web-development',
    'mobile-development',
    'data-science',
    'ai-ml',
    'game-development',
    'backend-development',
    'devops',
    'cybersecurity',
    'blockchain',
    'database',
  ]

  let moduleId: string | null = null
  let languageId: string | null = null

  // Find which module this route starts with
  for (const knownModule of knownModules) {
    if (tutorialId.startsWith(knownModule + '-')) {
      moduleId = knownModule
      languageId = tutorialId.substring(knownModule.length + 1)
      break
    }
  }

  if (!moduleId || !languageId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Tutorial Not Found</h1>
          <p className="text-xl mb-6">Invalid route format: {tutorialId}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-500 px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const language = getLanguageByModuleAndId(moduleId, languageId)

  if (!language) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Tutorial Not Found</h1>
          <p className="text-xl mb-6">
            Could not find tutorial for {tutorialId}
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-500 px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  // Generate comprehensive tutorial teaching the entire language
  const tutorial = generateComprehensiveTutorial(
    languageId,
    language.name,
    language.icon,
    language.description
  )

  // Add missing properties for the new Tutorial interface
  const enhancedTutorial = {
    ...tutorial,
    languageId,
    languageName: language.name
  }

  // Show loading while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <InteractiveTutorial
      tutorial={enhancedTutorial}
      language={language}
      moduleId={moduleId}
      languageId={languageId}
    />
  )
}
