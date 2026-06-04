import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface FloatingHeartsProps {
  count?: number
  interactive?: boolean
  onHeartTap?: (id: number) => void
  poppedIds?: Set<number>
}

const HEARTS = ['❤️', '💕', '💖', '💗', '🩷']

export function FloatingHearts({
  count = 8,
  interactive = false,
  onHeartTap,
  poppedIds,
}: FloatingHeartsProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: 8 + Math.random() * 84,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 5,
        size: 14 + Math.random() * 14,
        emoji: HEARTS[i % HEARTS.length],
        top: 15 + Math.random() * 70,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {hearts.map((heart) => {
        if (poppedIds?.has(heart.id)) return null

        const content = (
          <motion.span
            key={heart.id}
            className={`absolute select-none ${interactive ? 'pointer-events-auto cursor-pointer' : ''}`}
            style={{
              left: `${heart.left}%`,
              top: interactive ? `${heart.top}%` : undefined,
              fontSize: heart.size,
            }}
            initial={
              interactive
                ? { scale: 0, opacity: 0 }
                : { y: '100vh', opacity: 0, x: 0 }
            }
            animate={
              interactive
                ? {
                    scale: [1, 1.15, 1],
                    opacity: 1,
                    y: [0, -8, 0],
                  }
                : {
                    y: '-120vh',
                    opacity: [0, 0.5, 0.5, 0],
                    x: [0, (heart.id % 2 === 0 ? 1 : -1) * 20, 0],
                  }
            }
            transition={
              interactive
                ? { duration: 2, repeat: Infinity, delay: heart.delay * 0.3 }
                : {
                    duration: heart.duration,
                    delay: heart.delay,
                    repeat: Infinity,
                    ease: 'linear',
                  }
            }
            onClick={
              interactive && onHeartTap
                ? (e) => {
                    e.stopPropagation()
                    onHeartTap(heart.id)
                  }
                : undefined
            }
            whileTap={interactive ? { scale: 1.4 } : undefined}
          >
            {heart.emoji}
          </motion.span>
        )

        return content
      })}
    </div>
  )
}
