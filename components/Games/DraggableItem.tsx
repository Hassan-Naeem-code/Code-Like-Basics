'use client'

import { useDraggable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface DraggableItemProps {
  id: string
  children: ReactNode
  className?: string
  disabled?: boolean
}

export default function DraggableItem({
  id,
  children,
  className = '',
  disabled = false,
}: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`
        cursor-grab active:cursor-grabbing
        ${isDragging ? 'opacity-50 z-50' : 'opacity-100'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...listeners}
      {...attributes}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {children}
    </motion.div>
  )
}
