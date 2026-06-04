import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDoubleTap } from '../../hooks/useDoubleTap'
import { useIsMobile } from '../../hooks/useIsMobile'
import { triggerHaptic } from '../../utils/haptic'
import { FloatingHearts } from '../FloatingHearts'
import { MemoryCard } from '../MemoryCard'
import { HER_NAME } from '../../data/personal'
import { MilestoneTimeline } from '../MilestoneTimeline'

interface MemoryScreenProps {
  onComplete: () => void
}

export function Memory1({ onComplete }: MemoryScreenProps) {
  const [tapped, setTapped] = useState(false)
  const isMobile = useIsMobile()

  return (
    <MemoryCard
      title="The Bravest Decision"
      hint={isMobile ? 'Tap the floating heart ❤️' : 'Click the floating heart ❤️'}
      onContinue={onComplete}
    >
      <p>One year ago...</p>
      <p className="text-base font-medium text-rose-gold">
        📍 It started when we first met — 15 October 2024
      </p>
      <p>You made the bravest decision of your life.</p>
      <p className="font-medium">You married me.</p>
      <p className="text-base italic text-rose-gold">
        I&apos;m still not sure if it was confidence or lack of proper investigation.
      </p>
      <FloatingHearts
        count={1}
        interactive
        onHeartTap={() => {
          if (!tapped) {
            setTapped(true)
            triggerHaptic(20)
            setTimeout(onComplete, 600)
          }
        }}
      />
      {!tapped && (
        <motion.span
          className="absolute right-8 top-1/2 text-4xl"
          animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => {
            setTapped(true)
            triggerHaptic(20)
            setTimeout(onComplete, 600)
          }}
        >
          ❤️
        </motion.span>
      )}
    </MemoryCard>
  )
}

export function Memory2({ onComplete }: MemoryScreenProps) {
  const isMobile = useIsMobile()
  const x = useMotionValue(0)
  const opacity = useTransform(x, [0, 120], [1, 0.92])
  const [done, setDone] = useState(false)

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 80 && !done) {
      setDone(true)
      triggerHaptic(25)
      onComplete()
    }
  }

  return (
    <motion.div style={{ x, opacity }} drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={handleDragEnd}>
      <MemoryCard
        title="365 Days"
        hint={isMobile ? 'Swipe right →' : 'Drag the card to the right →'}
        onContinue={onComplete}
        vividText
      >
        <p className="text-xl font-semibold text-rose-900">365 days.</p>
        <p className="text-lg font-medium text-[#9f1239]">Countless laughs.</p>
        <p className="text-lg font-medium text-[#9f1239]">Endless memories.</p>
        <p className="text-base font-semibold italic text-[#b45309]">
          And approximately 17,432 reminders from you.
        </p>
        <motion.div
          className="mt-4 flex justify-end text-2xl"
          animate={{ x: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          👉
        </motion.div>
      </MemoryCard>
    </motion.div>
  )
}

export function Memory3({ onComplete }: MemoryScreenProps) {
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const holdingRef = useRef(false)

  const startHold = () => {
    holdingRef.current = true
    triggerHaptic(5)
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        const next = p + 5
        if (next >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          holdingRef.current = false
          triggerHaptic([30, 20, 30])
          setTimeout(onComplete, 400)
          return 100
        }
        return next
      })
    }, 100)
  }

  const endHold = () => {
    holdingRef.current = false
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (progress < 100) setProgress(0)
  }

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  return (
    <MemoryCard
      title="Marriage Discovery"
      hint="Hold the button for 2 seconds"
      onContinue={onComplete}
    >
      <p>I thought marriage meant sharing a life together.</p>
      <p className="font-medium">Apparently it also means:</p>
      <ul className="space-y-1 text-left text-base">
        {[
          'Sharing food',
          'Sharing blankets',
          'Sharing decisions',
          'Sharing passwords',
          'And losing every argument',
        ].map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.2 }}
          >
            ✓ {item}
          </motion.li>
        ))}
      </ul>
      <motion.button
        type="button"
        className="btn-premium relative mt-4 w-full overflow-hidden rounded-full py-3 text-sm font-semibold"
        onPointerDown={startHold}
        onPointerUp={endHold}
        onPointerLeave={endHold}
        onContextMenu={(e) => e.preventDefault()}
      >
        <span
          className="absolute inset-0 bg-white/25 transition-all"
          style={{ width: `${progress}%` }}
        />
        <span className="relative">Fine, You Win</span>
      </motion.button>
    </MemoryCard>
  )
}

const CHECKLIST = [
  'She is always right',
  'If she is wrong, refer to point 1',
  'She finds things I can never find',
  'She knows what I am thinking',
  'She remembers everything',
]

export function Memory4({ onComplete }: MemoryScreenProps) {
  const [found, setFound] = useState(false)
  const isMobile = useIsMobile()

  return (
    <MemoryCard
      title="Things I've Learned"
      hint={
        isMobile
          ? 'Find the hidden heart on the card...'
          : 'Click the hidden heart on the card...'
      }
      onContinue={onComplete}
    >
      <ul className="space-y-2 text-left">
        {CHECKLIST.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.35 }}
            className="flex gap-2"
          >
            <span className="text-rose-gold">✓</span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
      {!found && (
        <motion.button
          type="button"
          aria-label="Hidden heart"
          className="absolute bottom-4 left-4 text-xs opacity-[0.08]"
          onClick={() => {
            setFound(true)
            triggerHaptic(20)
            setTimeout(onComplete, 500)
          }}
        >
          ❤️
        </motion.button>
      )}
    </MemoryCard>
  )
}

export function Memory5({ onComplete }: MemoryScreenProps) {
  const isMobile = useIsMobile()
  const handleDoubleTap = useDoubleTap(() => {
    triggerHaptic([15, 25, 15])
    onComplete()
  })

  return (
    <div className="flex flex-1 flex-col justify-center" onClick={handleDoubleTap} role="presentation">
      <MemoryCard
        title="Thank You"
        hint={isMobile ? 'Double tap anywhere' : 'Double-click anywhere'}
        onContinue={onComplete}
      >
        <p>Thank you for loving me.</p>
        <p>Thank you for supporting me.</p>
        <p>Thank you for standing beside me.</p>
        <p className="italic text-rose-gold">
          Even during my &ldquo;I can fix it myself&rdquo; moments.
        </p>
      </MemoryCard>
    </div>
  )
}

export function Memory6({ onComplete }: MemoryScreenProps) {
  const [tapped, setTapped] = useState(false)
  const isMobile = useIsMobile()

  return (
    <MemoryCard
      title="Confession"
      hint={isMobile ? 'Tap the blinking heart' : 'Click the blinking heart'}
      onContinue={onComplete}
    >
      <p>
        I still smile when I see <span className="font-semibold text-rose-gold">{HER_NAME}</span> on
        my phone.
      </p>
      <p>Even though I know the message is probably:</p>
      <p className="italic">&ldquo;Did you eat?&rdquo;</p>
      <p className="italic">or</p>
      <p className="italic">&ldquo;Where are you?&rdquo;</p>
      <motion.button
        type="button"
        className={`mx-auto mt-4 block text-5xl ${!tapped ? 'blink-heart' : ''}`}
        onClick={() => {
          if (!tapped) {
            setTapped(true)
            triggerHaptic(18)
            setTimeout(onComplete, 500)
          }
        }}
      >
        ❤️
      </motion.button>
    </MemoryCard>
  )
}

export function Memory7({ onComplete }: MemoryScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [revealed, setRevealed] = useState(false)
  const scratching = useRef(false)

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height)
    gradient.addColorStop(0, '#d4a5a5')
    gradient.addColorStop(1, '#b76e79')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, rect.width, rect.height)
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.font = 'bold 18px Playfair Display, serif'
    ctx.textAlign = 'center'
    ctx.fillText('Scratch here ✨', rect.width / 2, rect.height / 2)
  }, [])

  useEffect(() => {
    initCanvas()
    window.addEventListener('resize', initCanvas)
    return () => window.removeEventListener('resize', initCanvas)
  }, [initCanvas])

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas || revealed) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 22, 0, Math.PI * 2)
    ctx.fill()
  }

  const checkReveal = () => {
    const canvas = canvasRef.current
    if (!canvas || revealed) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let transparent = 0
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 128) transparent++
    }
    const ratio = transparent / (imageData.data.length / 4)
    if (ratio > 0.35) {
      setRevealed(true)
      triggerHaptic(25)
      setTimeout(onComplete, 800)
    }
  }

  return (
    <MemoryCard
      title="Our Story"
      hint="Scratch to reveal the heart"
      onContinue={onComplete}
      bodyClassName="items-stretch text-center"
      scrollable
    >
      <div className="space-y-3">
        <p>Every photo.</p>
        <p>Every trip.</p>
        <p>Every small moment.</p>
        <p className="font-medium">Somehow became my favorite memory.</p>
        <p className="text-rose-gold">Because you were in it.</p>
      </div>

      <section className="w-full rounded-2xl border border-white/60 bg-white/35 px-4 py-3.5 text-left shadow-sm">
        <h3 className="mb-3 text-center font-display text-sm font-semibold text-rose-900">
          Dates we&apos;ll never forget
        </h3>
        <MilestoneTimeline variant="card" compact className="w-full" />
      </section>

      <div className="relative h-36 w-full overflow-hidden rounded-2xl">
        <div className="flex h-full items-center justify-center bg-rose-100/80 text-5xl">
          {revealed ? '❤️' : '💕'}
        </div>
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full touch-none"
            onPointerDown={(e) => {
              scratching.current = true
              scratch(e.clientX, e.clientY)
            }}
            onPointerMove={(e) => {
              if (scratching.current) scratch(e.clientX, e.clientY)
            }}
            onPointerUp={() => {
              scratching.current = false
              checkReveal()
            }}
            onPointerLeave={() => {
              scratching.current = false
              checkReveal()
            }}
          />
        )}
      </div>
    </MemoryCard>
  )
}

export function Memory8({ onComplete }: MemoryScreenProps) {
  const isMobile = useIsMobile()
  const [popped, setPopped] = useState<Set<number>>(new Set())
  const target = 5

  const handlePop = (id: number) => {
    setPopped((prev) => {
      const next = new Set(prev)
      next.add(id)
      triggerHaptic(10)
      if (next.size >= target) setTimeout(onComplete, 600)
      return next
    })
  }

  return (
    <MemoryCard
      title="Secret"
      hint={
        isMobile
          ? `Pop ${target} floating hearts (${popped.size}/${target})`
          : `Click ${target} floating hearts (${popped.size}/${target})`
      }
      onContinue={onComplete}
    >
      <p>I still look at you the same way I did on our wedding day.</p>
      <p className="italic text-rose-gold">
        Just with slightly more experience of being lovingly scolded.
      </p>
      <FloatingHearts count={5} interactive onHeartTap={handlePop} poppedIds={popped} />
    </MemoryCard>
  )
}

export function Memory9({ onComplete }: MemoryScreenProps) {
  const [opened, setOpened] = useState(false)
  const isMobile = useIsMobile()

  return (
    <MemoryCard
      title="One Question"
      hint={isMobile ? 'Tap the gift box' : 'Click the gift box'}
      onContinue={onComplete}
    >
      <p>If I could go back in time...</p>
      <p className="font-medium">Would I choose {HER_NAME} again?</p>
      <p>Without thinking.</p>
      <p>Every single time.</p>
      <p className="text-rose-gold">Every lifetime.</p>

      <motion.button
        type="button"
        className="mx-auto mt-6 block"
        disabled={opened}
        onClick={() => {
          if (!opened) {
            setOpened(true)
            triggerHaptic([20, 30, 20])
            setTimeout(onComplete, 1800)
          }
        }}
        animate={
          opened
            ? { scale: [1, 1.3, 0], rotate: [0, 10, -10, 0], opacity: [1, 1, 0] }
            : { y: [0, -8, 0] }
        }
        transition={opened ? { duration: 1.2 } : { repeat: Infinity, duration: 2 }}
      >
        <span className="text-6xl">{opened ? '✨' : '🎁'}</span>
      </motion.button>
      {opened && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-rose-gold"
        >
          Always yes. ❤️
        </motion.p>
      )}
    </MemoryCard>
  )
}
