'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface InteractiveSliderProps {
  label: string
  min: number
  max: number
  defaultValue: number
  step?: number
  onChange?: (value: number) => void
  renderValue?: (value: number) => React.ReactNode
}

export default function InteractiveSlider({
  label,
  min,
  max,
  defaultValue,
  step = 1,
  onChange,
  renderValue,
}: InteractiveSliderProps) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    setValue(newValue)
    onChange?.(newValue)
  }

  return (
    <div className="my-6 p-4 bg-white/5 rounded-lg border border-white/10">
      <label className="block text-white font-semibold mb-2">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-christmas-gold"
      />
      <div className="mt-4 flex justify-between items-center">
        <span className="text-white/70 text-sm">
          {min}
        </span>
        <motion.div
          className="text-white font-bold text-lg"
          key={value}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
        >
          {renderValue ? renderValue(value) : value}
        </motion.div>
        <span className="text-white/70 text-sm">
          {max}
        </span>
      </div>
    </div>
  )
}
