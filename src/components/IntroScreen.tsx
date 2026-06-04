import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BackgroundLayer } from './BackgroundLayer'
import { Sparkles } from './Sparkles'
import { HER_NAME } from '../data/personal'
import { triggerHaptic } from '../utils/haptic'

interface IntroScreenProps {
  onBegin: () => void
}

const LINES = [
  { text: `Hey ${HER_NAME} ❤️`, delay: 0.3 },
  { text: `I made something for you, ${HER_NAME}.`, delay: 1.8 },
  { text: 'Actually...', delay: 3.6 },
  { text: "It's not a website.", delay: 4.8 },
  { text: "It's a journey.", delay: 6.2 },
]

export function IntroScreen({ onBegin }: IntroScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay * 1000),
    )
    const btnTimer = setTimeout(() => setShowButton(true), 7500)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(btnTimer)
    }
  }, [])

  return (
    <section className="relative flex h-full flex-col">
      <BackgroundLayer blur={12} opacity={0.25} />
      <Sparkles count={15} />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8">
        <div className="min-h-[220px] space-y-4 text-center">
          {LINES.map((line, i) =>
            i < visibleLines ? (
              <motion.p
                key={line.text}
                className="font-display text-2xl leading-snug text-[#5c4033] first:text-3xl first:font-semibold first:text-gradient-gold"
                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7 }}
              >
                {line.text}
              </motion.p>
            ) : null,
          )}
        </div>

        {showButton && (
          <motion.a
            href="#begin"
            role="button"
            className="btn-premium mt-10 inline-block rounded-full px-12 py-4 text-lg font-semibold no-underline"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              triggerHaptic(15)
              onBegin()
            }}
          >
            Begin
          </motion.a>
        )}
      </div>
    </section>
  )
}
