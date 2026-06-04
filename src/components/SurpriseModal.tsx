import { AnimatePresence, motion } from 'framer-motion'
import { HER_NAME, HIS_NAME } from '../data/personal'
import { triggerHaptic } from '../utils/haptic'
import { Sparkles } from './Sparkles'

interface SurpriseModalProps {
  open: boolean
  onClose: () => void
}

const LETTER = `My dearest ${HER_NAME},

Thank you for making this first year of marriage the happiest year of my life.

Thank you for every laugh.

Every conversation.

Every memory.

Every little thing you do.

I know I am not perfect.

But I promise one thing.

No matter where life takes us,

I will always choose you.

Again.

And again.

And again.

Happy First Anniversary ❤️

Forever Yours,

${HIS_NAME}`

export function SurpriseModal({ open, onClose }: SurpriseModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-[#4a3728]/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <Sparkles count={25} intense />

          <motion.div
            className="glass-card relative z-10 max-h-[85vh] max-w-[340px] overflow-y-auto rounded-3xl p-6 glow-gold"
            initial={{ scale: 0.85, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 text-center">
              <span className="text-3xl">💌</span>
            </div>
            <div className="whitespace-pre-line font-body text-base leading-relaxed text-[#5c4033]">
              {LETTER}
            </div>
            <motion.button
              type="button"
              className="btn-premium mt-6 w-full rounded-full py-3 text-sm font-semibold"
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                triggerHaptic(12)
                onClose()
              }}
            >
              Close with Love ❤️
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
