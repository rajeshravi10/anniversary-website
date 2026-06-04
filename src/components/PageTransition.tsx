import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PageTransitionProps {
  screenKey: string
  children: ReactNode
}

export function PageTransition({ screenKey, children }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screenKey}
        className="absolute inset-0 flex flex-col"
        initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
