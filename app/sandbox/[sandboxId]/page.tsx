'use client'

import { use } from 'react'
import CodeSimulator from '@/games/SoftwareDev/CodeSimulator'
import { notFound } from 'next/navigation'

const SANDBOXES: { [key: string]: any } = {
  'code-simulator': CodeSimulator,
  // More sandboxes will be added
}

export default function SandboxPage({
  params,
}: {
  params: Promise<{ sandboxId: string }>
}) {
  const { sandboxId } = use(params)
  const SandboxComponent = SANDBOXES[sandboxId]

  if (!SandboxComponent) {
    notFound()
  }

  return <SandboxComponent />
}
