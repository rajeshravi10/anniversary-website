import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { HER_NAME, HIS_NAME } from '../data/personal'
import { GIFT_IMAGE, MARRIAGE_IMAGE } from '../types'
import { fireHeartExplosion, fireRomanticConfetti } from '../utils/confetti'
import { triggerHaptic } from '../utils/haptic'
import { FloatingHearts } from './FloatingHearts'
import { MilestoneTimeline } from './MilestoneTimeline'
import { Petals } from './Petals'
import { Sparkles } from './Sparkles'

interface GiftRevealProps {
  onSurpriseClick: () => void
  showSurpriseButton: boolean
}

const STORY_LINES = [
  'One year ago...',
  `I married ${HER_NAME}.`,
  'A best friend.',
  'A partner.',
  'My biggest supporter.',
  'And my favorite person.',
]

type GiftPhase =
  | 'story'
  | 'anniversary'
  | 'quote'
  | 'giftbox'
  | 'opened'
  | 'message'
  | 'signature'

function getBlurAmount(phase: GiftPhase, giftOpened: boolean): number {
  if (giftOpened) return 0
  if (phase === 'story') return 8
  return 4
}

export function GiftReveal({ onSurpriseClick, showSurpriseButton }: GiftRevealProps) {
  const [phase, setPhase] = useState<GiftPhase>('story')
  const [lineIndex, setLineIndex] = useState(0)
  const [giftOpened, setGiftOpened] = useState(false)
  const blurAmount = getBlurAmount(phase, giftOpened)

  useEffect(() => {
    if (phase !== 'story') return
    if (lineIndex < STORY_LINES.length) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 2200)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setPhase('anniversary'), 1500)
    return () => clearTimeout(t)
  }, [phase, lineIndex])

  useEffect(() => {
    if (phase === 'anniversary') {
      const t = setTimeout(() => setPhase('quote'), 3500)
      return () => clearTimeout(t)
    }
    if (phase === 'quote') {
      const t = setTimeout(() => setPhase('giftbox'), 4500)
      return () => clearTimeout(t)
    }
  }, [phase])

  const openGift = useCallback(() => {
    triggerHaptic([20, 40, 20])
    setGiftOpened(true)
    setPhase('opened')
    fireHeartExplosion()
    setTimeout(() => setPhase('message'), 2500)
    setTimeout(() => setPhase('signature'), 5500)
  }, [])

  return (
    <section className="relative h-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ scale: giftOpened ? 1.05 : [1, 1.02, 1] }}
        transition={{ duration: giftOpened ? 2 : 8, repeat: giftOpened ? 0 : Infinity }}
      >
        <motion.img
          src={MARRIAGE_IMAGE}
          alt="Our wedding"
          className="h-full w-full object-cover"
          animate={{ filter: `blur(${blurAmount}px)` }}
          transition={{ duration: 1.5 }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-rose-50/50 via-white/40 to-white/90"
        animate={{ opacity: giftOpened ? 0.92 : 0.65 }}
      />

      <Petals count={20} />
      <Sparkles count={35} intense />
      <FloatingHearts count={6} />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-24 pt-16">
        <AnimatePresence mode="wait">
          {phase === 'story' && lineIndex > 0 && (
            <motion.div
              key={lineIndex}
              className="text-center"
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="font-display text-2xl leading-relaxed text-white drop-shadow-lg">
                {STORY_LINES[lineIndex - 1]}
              </p>
            </motion.div>
          )}

          {phase === 'anniversary' && (
            <motion.div
              key="anniversary"
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="font-display text-3xl font-bold text-white drop-shadow-md">
                ❤️ Happy First Anniversary ❤️
              </h1>
              <div className="mt-8 rounded-2xl border border-white/25 bg-white/10 px-5 py-4 backdrop-blur-sm">
                <p className="mb-3 font-display text-sm font-semibold tracking-wide text-white/90">
                  Our journey together
                </p>
                <MilestoneTimeline variant="light" compact />
              </div>
            </motion.div>
          )}

          {phase === 'quote' && (
            <motion.div
              key="quote"
              className="max-w-[320px] text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="font-display text-xl italic leading-relaxed text-white drop-shadow-md">
                &ldquo;You are my favorite chapter, my favorite memory, and my favorite forever.&rdquo;
              </p>
            </motion.div>
          )}

          {phase === 'giftbox' && !giftOpened && (
            <motion.div
              key="giftbox"
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="text-7xl"
                animate={{ y: [0, -12, 0], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎁
              </motion.div>
              <motion.button
                type="button"
                className="btn-premium mt-8 rounded-full px-8 py-4 text-base font-semibold"
                whileTap={{ scale: 0.94 }}
                onClick={openGift}
              >
                🎁 Open Your Surprise
              </motion.button>
            </motion.div>
          )}

          {(phase === 'opened' || phase === 'message' || phase === 'signature') && giftOpened && (
            <motion.div
              key="gift-content"
              className="flex w-full max-w-[340px] flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="glass-card glow-gold w-full overflow-hidden rounded-3xl p-3"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 18, duration: 1.2 }}
              >
                <motion.img
                  src={GIFT_IMAGE}
                  alt="Your surprise gift"
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-2xl object-cover"
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                />
              </motion.div>

              {(phase === 'message' || phase === 'signature') && (
                <motion.div
                  className="glass-card mt-6 w-full rounded-2xl px-5 py-5 text-center"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="font-display text-lg font-semibold leading-relaxed text-rose-950">
                    {`For ${HER_NAME}, the woman who makes every ordinary day extraordinary ❤️`}
                  </p>

                  {phase === 'signature' && (
                    <>
                      <p className="mt-4 text-base italic leading-relaxed text-[#5c4033]">
                        I love you today, tomorrow, and every day after.
                      </p>
                      <p className="mt-5 font-display text-xl font-semibold text-gradient-gold">
                        {`❤️ ${HIS_NAME} ❤️`}
                      </p>

                      {showSurpriseButton && (
                        <motion.button
                          type="button"
                          className="btn-premium mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => {
                            triggerHaptic(15)
                            fireRomanticConfetti('light')
                            onSurpriseClick()
                          }}
                        >
                          One More Surprise ❤️
                        </motion.button>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
