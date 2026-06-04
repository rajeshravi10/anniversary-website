import { motion } from 'framer-motion'
import { TOTAL_MEMORIES } from '../types'

interface ProgressBarProps {
  memoryIndex: number
  visible: boolean
}

export function ProgressBar({ memoryIndex, visible }: ProgressBarProps) {
  if (!visible) return null

  const progress = (memoryIndex / TOTAL_MEMORIES) * 100

  return (
    <motion.header
      className="relative z-30 px-5 pt-[max(0.75rem,env(safe-area-inset-top))]"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-2xl border border-white/70 bg-white/85 px-4 py-2.5 shadow-md backdrop-blur-md">
        <p className="font-display text-center text-sm font-semibold tracking-wide text-rose-950">
          ❤️ Memory {memoryIndex} of {TOTAL_MEMORIES}
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-rose-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rose-600 via-rose-gold to-amber-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.header>
  )
}
