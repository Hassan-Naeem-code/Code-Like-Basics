'use client'

import { use } from 'react'
import CodeBlockGame from '@/games/SoftwareDev/CodeBlockGame'
import { notFound } from 'next/navigation'

const GAMES: { [key: string]: any } = {
  'code-block-game': CodeBlockGame,
  // More games will be added
}

export default function GamePage({
  params,
}: {
  params: Promise<{ gameId: string }>
}) {
  const { gameId } = use(params)
  const GameComponent = GAMES[gameId]

  if (!GameComponent) {
    notFound()
  }

  return <GameComponent />
}
