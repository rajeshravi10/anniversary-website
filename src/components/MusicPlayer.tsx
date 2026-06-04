import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { MUSIC_SRC } from '../types'
import { triggerHaptic } from '../utils/haptic'

interface MusicPlayerProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
  hudVisible?: boolean
}

export function MusicPlayer({ enabled, onToggle, hudVisible }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC)
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio

    audio.addEventListener('error', () => setAvailable(false))

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !available) return

    if (enabled) {
      audio.play().catch(() => {
        /* autoplay blocked until user gesture */
      })
    } else {
      audio.pause()
    }
  }, [enabled, available])

  return (
    <motion.button
      type="button"
      aria-label={enabled ? 'Turn off music' : 'Turn on romantic music'}
      className="fixed z-50 flex h-12 w-12 items-center justify-center rounded-full glass-card text-xl shadow-lg"
      style={
        hudVisible
          ? {
              bottom: 'calc(max(1rem, env(safe-area-inset-bottom)) + 3.5rem)',
              left: 'max(1rem, env(safe-area-inset-left))',
            }
          : {
              top: 'max(1rem, env(safe-area-inset-top))',
              right: 'max(1rem, env(safe-area-inset-right))',
            }
      }
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        triggerHaptic(8)
        onToggle(!enabled)
      }}
      animate={enabled ? { rotate: [0, 5, -5, 0] } : {}}
      transition={{ duration: 2, repeat: enabled ? Infinity : 0 }}
    >
      {enabled ? '🎵' : '🔇'}
      {!available && (
        <span className="sr-only">Add romantic-music.mp3 to public folder</span>
      )}
    </motion.button>
  )
}
