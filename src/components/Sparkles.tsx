import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface SparklesProps {
  count?: number
  intense?: boolean
}

export function Sparkles({ count = 20, intense = false }: SparklesProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: intense ? 3 + Math.random() * 5 : 2 + Math.random() * 3,
        delay: Math.random() * 3,
        duration: 1.5 + Math.random() * 2,
      })),
    [count, intense],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: intense
              ? 'radial-gradient(circle, #e8d48b 0%, #c9a227 50%, transparent 70%)'
              : 'radial-gradient(circle, white 0%, #fda4af 40%, transparent 70%)',
            boxShadow: intense ? '0 0 8px #c9a227' : '0 0 4px rgba(255,255,255,0.8)',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
