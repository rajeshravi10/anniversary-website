import { useCallback, useState } from 'react'
import { BackgroundLayer } from './components/BackgroundLayer'
import { FloatingHearts } from './components/FloatingHearts'
import { GiftReveal } from './components/GiftReveal'
import { IntroScreen } from './components/IntroScreen'
import { MilestonesScreen } from './components/MilestonesScreen'
import { LoveBattery } from './components/LoveBattery'
import {
  Memory1,
  Memory2,
  Memory3,
  Memory4,
  Memory5,
  Memory6,
  Memory7,
  Memory8,
  Memory9,
} from './components/memories/MemoryScreens'
import { MusicPlayer } from './components/MusicPlayer'
import { PageTransition } from './components/PageTransition'
import { ProgressBar } from './components/ProgressBar'
import { Sparkles } from './components/Sparkles'
import { SurpriseModal } from './components/SurpriseModal'
import { TOTAL_MEMORIES } from './types'
import { fireRomanticConfetti } from './utils/confetti'

type Step = 'intro' | 'milestones' | number

function getScreenKey(step: Step) {
  if (step === 'intro') return 'intro'
  if (step === 'milestones') return 'milestones'
  return `memory-${step}`
}

function getBlurForStep(step: Step) {
  if (step === 'intro' || step === 'milestones') return 12
  if (typeof step === 'number' && step >= 10) return 2
  return 10 - (typeof step === 'number' ? step * 0.6 : 0)
}

export default function App() {
  const [step, setStep] = useState<Step>('intro')
  const [musicOn, setMusicOn] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const memoryIndex = typeof step === 'number' ? step : 0
  const loveBattery =
    step === 'intro' || step === 'milestones' ? 0 : Math.min(step * 10, 100)
  const showHud = typeof step === 'number'
  const isFinal = step === TOTAL_MEMORIES

  const advance = useCallback(() => {
    if (step === 'intro') {
      setStep('milestones')
      return
    }
    if (step === 'milestones') {
      setStep(1)
      return
    }
    if (typeof step === 'number' && step < TOTAL_MEMORIES) {
      if (step === 9) fireRomanticConfetti('light')
      setStep(step + 1)
    }
  }, [step])

  const renderMemory = () => {
    switch (step) {
      case 1:
        return <Memory1 onComplete={advance} />
      case 2:
        return <Memory2 onComplete={advance} />
      case 3:
        return <Memory3 onComplete={advance} />
      case 4:
        return <Memory4 onComplete={advance} />
      case 5:
        return <Memory5 onComplete={advance} />
      case 6:
        return <Memory6 onComplete={advance} />
      case 7:
        return <Memory7 onComplete={advance} />
      case 8:
        return <Memory8 onComplete={advance} />
      case 9:
        return <Memory9 onComplete={advance} />
      case 10:
        return (
          <GiftReveal
            onSurpriseClick={() => setModalOpen(true)}
            showSurpriseButton
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="app-shell">
      <MusicPlayer enabled={musicOn} onToggle={setMusicOn} hudVisible={showHud} />

      {step !== 'intro' && step !== 'milestones' && !isFinal && (
        <>
          <BackgroundLayer blur={getBlurForStep(step)} opacity={0.28} parallax />
          <FloatingHearts count={5} />
          <Sparkles count={12} />
        </>
      )}

      {showHud && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40">
          <ProgressBar memoryIndex={memoryIndex} visible />
        </div>
      )}
      {showHud && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40">
          <LoveBattery percentage={loveBattery} visible />
        </div>
      )}

      <main className="relative h-full">
        {step === 'intro' ? (
          <PageTransition screenKey="intro">
            <IntroScreen onBegin={advance} />
          </PageTransition>
        ) : step === 'milestones' ? (
          <PageTransition screenKey="milestones">
            <MilestonesScreen onContinue={advance} />
          </PageTransition>
        ) : (
          <PageTransition screenKey={getScreenKey(step)}>
            <section
              className={`relative flex h-full flex-col ${
                isFinal ? '' : 'pt-14 pb-16'
              }`}
            >
              {!isFinal && (
                <div className="relative z-10 flex flex-1 flex-col justify-center">
                  {renderMemory()}
                </div>
              )}
              {isFinal && renderMemory()}
            </section>
          </PageTransition>
        )}
      </main>

      <SurpriseModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
