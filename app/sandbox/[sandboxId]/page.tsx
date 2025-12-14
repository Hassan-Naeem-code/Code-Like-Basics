'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { getLanguageByModuleAndId } from '@/utils/techModules'
import UniversalSandbox from '@/components/Sandbox/UniversalSandbox'

export default function SandboxPage({
  params,
}: {
  params: Promise<{ sandboxId: string }>
}) {
  const router = useRouter()
  const { sandboxId } = use(params)

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
    if (sandboxId.startsWith(knownModule + '-')) {
      moduleId = knownModule
      languageId = sandboxId.substring(knownModule.length + 1)
      break
    }
  }

  if (!moduleId || !languageId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Sandbox Not Found</h1>
          <p className="text-xl mb-6">Invalid route format: {sandboxId}</p>
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
          <h1 className="text-4xl font-bold mb-4">Sandbox Not Found</h1>
          <p className="text-xl mb-6">
            Could not find sandbox for {sandboxId}
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

  return <UniversalSandbox language={language} moduleId={moduleId} languageId={languageId} />
}
