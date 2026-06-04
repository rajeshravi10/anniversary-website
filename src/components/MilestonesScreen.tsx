import { motion } from 'framer-motion'
import { HER_NAME } from '../data/personal'
import { triggerHaptic } from '../utils/haptic'
import { BackgroundLayer } from './BackgroundLayer'
import { MilestoneTimeline } from './MilestoneTimeline'
import { Sparkles } from './Sparkles'
import { TestNextButton } from './TestNextButton'

interface MilestonesScreenProps {
  onContinue: () => void
}

export function MilestonesScreen({ onContinue }: MilestonesScreenProps) {
  return (
    <section className="relative flex h-full flex-col">
      <BackgroundLayer blur={10} opacity={0.22} />
      <Sparkles count={12} />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-8">
        <motion.div
          className="glass-card w-full max-w-[340px] rounded-3xl px-6 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-center font-display text-sm tracking-widest text-rose-gold uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Our story in dates
          </motion.p>
          <motion.h2
            className="mt-2 text-center font-display text-2xl font-semibold text-gradient-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            {`${HER_NAME}, Our Story ❤️`}
          </motion.h2>
          <motion.p
            className="mt-3 text-center text-base leading-relaxed text-[#5c4033]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            Every date below is a chapter of us — woven into every memory you&apos;re about to
            unlock.
          </motion.p>

          <div className="mt-6">
            <MilestoneTimeline variant="card" />
          </div>

          <TestNextButton onNext={onContinue} />

          <motion.a
            href="#memories"
            role="button"
            className="btn-premium mt-6 block w-full rounded-full py-3.5 text-center text-base font-semibold no-underline"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => {
              e.preventDefault()
              triggerHaptic(15)
              onContinue()
            }}
          >
            Unlock Our Memories ❤️
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
