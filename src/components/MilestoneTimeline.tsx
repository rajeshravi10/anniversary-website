import { motion } from 'framer-motion'
import { LOVE_MILESTONES } from '../data/milestones'

interface MilestoneTimelineProps {
  /** `card` = inside memory cards; `light` = on dark/photo backgrounds */
  variant?: 'card' | 'light'
  compact?: boolean
  className?: string
}

export function MilestoneTimeline({
  variant = 'card',
  compact = false,
  className = '',
}: MilestoneTimelineProps) {
  const titleClass =
    variant === 'light'
      ? 'font-display font-semibold text-white drop-shadow-md'
      : 'font-display font-semibold text-rose-950'

  const dateClass =
    variant === 'light'
      ? 'font-medium text-rose-100 drop-shadow'
      : 'font-semibold text-rose-gold'

  const lineClass = variant === 'light' ? 'bg-white/40' : 'bg-rose-gold/40'

  return (
    <ul className={`space-y-0 ${className}`} aria-label="Our love story milestones">
      {LOVE_MILESTONES.map((milestone, index) => (
        <motion.li
          key={milestone.id}
          className="relative flex w-full gap-3 text-left"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15, duration: 0.5 }}
        >
          <div className="flex flex-col items-center pt-0.5">
            <span className={compact ? 'text-lg leading-none' : 'text-xl leading-none'} aria-hidden>
              {milestone.emoji}
            </span>
            {index < LOVE_MILESTONES.length - 1 && (
              <span className={`my-1 w-px flex-1 ${compact ? 'min-h-10' : 'min-h-14'} ${lineClass}`} />
            )}
          </div>
          <div
            className={`min-w-0 flex-1 ${index < LOVE_MILESTONES.length - 1 ? (compact ? 'pb-3' : 'pb-5') : ''}`}
          >
            <p
              className={`${titleClass} leading-snug ${compact ? 'text-sm' : 'text-base'} break-words`}
            >
              {milestone.title}
            </p>
            <p className={`${dateClass} ${compact ? 'text-xs' : 'text-sm'} mt-0.5`}>
              {milestone.dateLabel}
            </p>
            {!compact && (
              <p
                className={`mt-0.5 text-xs ${variant === 'light' ? 'text-white/75' : 'text-rose-gold/85'}`}
              >
                {milestone.date}
              </p>
            )}
          </div>
        </motion.li>
      ))}
    </ul>
  )
}
