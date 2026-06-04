import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { TestNextButton } from './TestNextButton'

interface MemoryCardProps {
  title: string
  children: ReactNode
  hint?: string
  onContinue?: () => void
  /** Brighter body text (e.g. Memory 2) for readability on light backgrounds */
  vividText?: boolean
  /** Extra classes on the body wrapper (e.g. Memory 7 layout) */
  bodyClassName?: string
  scrollable?: boolean
}

export function MemoryCard({
  title,
  children,
  hint,
  onContinue,
  vividText = false,
  bodyClassName = 'text-center',
  scrollable = false,
}: MemoryCardProps) {
  const bodyTextClass = vividText
    ? 'text-rose-950 font-medium'
    : 'text-[#5c4033]'

  return (
    <motion.article
      className={`glass-card relative z-20 mx-5 flex flex-col justify-center overflow-visible rounded-3xl px-6 py-8 ${
        scrollable ? 'max-h-[min(78vh,580px)] overflow-y-auto' : 'max-h-[min(72vh,540px)]'
      }`}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15 }}
    >
      <h2 className="font-display shrink-0 text-center text-2xl font-semibold tracking-wide text-gradient-gold">
        {title}
      </h2>
      <div
        className={`mt-5 flex w-full flex-col gap-4 text-lg leading-relaxed ${bodyTextClass} ${bodyClassName}`}
      >
        {children}
      </div>
      {hint && (
        <motion.p
          className={`mt-4 shrink-0 text-center text-sm italic ${
            vividText ? 'font-medium text-rose-800' : 'text-rose-gold/90'
          }`}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {hint}
        </motion.p>
      )}
      {onContinue && <TestNextButton onNext={onContinue} />}
    </motion.article>
  )
}
