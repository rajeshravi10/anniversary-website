import { motion, useScroll, useTransform } from 'framer-motion'
import { MARRIAGE_IMAGE } from '../types'

interface BackgroundLayerProps {
  blur?: number
  opacity?: number
  parallax?: boolean
  scale?: number
  className?: string
}

export function BackgroundLayer({
  blur = 12,
  opacity = 0.32,
  parallax = false,
  scale = 1.1,
  className = '',
}: BackgroundLayerProps) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, parallax ? -30 : 0])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={parallax ? { y } : undefined}
        initial={{ scale }}
        animate={{ scale }}
        transition={{ duration: 0 }}
      >
        <img
          src={MARRIAGE_IMAGE}
          alt=""
          className="h-full w-full object-cover"
          style={{
            filter: `blur(${blur}px)`,
            transform: 'scale(1.08)',
          }}
          aria-hidden
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(255, 250, 245, 0.55) 0%,
            rgba(255, 241, 242, 0.45) 45%,
            rgba(245, 235, 224, 0.5) 100%
          )`,
          opacity,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-rose-50/20 via-transparent to-cream/50" />
    </div>
  )
}
