'use client'

import { useDroppable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface DragDropZoneProps {
  id: string
  children?: ReactNode
  className?: string
  isEmpty?: boolean
}

export default function DragDropZone({
  id,
  children,
  className = '',
  isEmpty = true,
}: DragDropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  })

  return (
    <motion.div
      ref={setNodeRef}
      className={`
        min-h-[80px] rounded-lg border-2 border-dashed
        transition-all duration-200
        ${isOver ? 'border-christmas-gold bg-christmas-gold/20 scale-105' : 'border-white/30 bg-white/5'}
        ${!isEmpty ? 'bg-white/10' : ''}
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
    >
      {children ? (
        <div className="p-4">{children}</div>
      ) : (
        <div className="p-4 flex items-center justify-center text-white/50 text-sm">
          Drop here
        </div>
      )}
    </motion.div>
  )
}
