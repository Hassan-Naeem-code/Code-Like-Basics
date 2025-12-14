'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { generateTutorial } from '@/utils/tutorialContent'
import { getLanguageByModuleAndId } from '@/utils/techModules'
import InteractiveTutorial from '@/components/Tutorials/InteractiveTutorial'

export default function TutorialPage({
  params,
}: {
  params: Promise<{ tutorialId: string }>
}) {
  const router = useRouter()
  const { tutorialId } = use(params)

  // Parse moduleId-languageId format
  // We need to find where module ends and language begins
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

  const tutorial = generateTutorial(moduleId, languageId)
  const language = getLanguageByModuleAndId(moduleId, languageId)

  if (!tutorial || !language) {
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

  return (
    <InteractiveTutorial
      tutorial={tutorial}
      language={language}
      moduleId={moduleId}
      languageId={languageId}
    />
  )
}
