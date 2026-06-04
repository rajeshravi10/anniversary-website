import { motion } from 'framer-motion'

interface LoveBatteryProps {
  percentage: number
  visible: boolean
}

export function LoveBattery({ percentage, visible }: LoveBatteryProps) {
  if (!visible) return null

  return (
    <motion.footer
      className="relative z-30 px-5 pb-[max(1rem,env(safe-area-inset-bottom))]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="rounded-2xl border border-white/70 bg-white/85 px-4 py-2.5 shadow-md backdrop-blur-md">
        <div className="flex items-center justify-between text-xs font-semibold text-rose-950">
          <span className="font-display tracking-wide">Love Battery ❤️</span>
          <span>{percentage}%</span>
        </div>
        <div className="relative mt-1.5 h-2.5 overflow-hidden rounded-full border border-rose-200 bg-rose-50 shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rose-500 via-rose-gold to-amber-500"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.footer>
  )
}
