import { SHOW_TEST_NEXT_BUTTON } from '../config'
import { triggerHaptic } from '../utils/haptic'

interface TestNextButtonProps {
  onNext: () => void
}

/** Temporary helper for desktop testing — toggle off in `src/config.ts`. */
export function TestNextButton({ onNext }: TestNextButtonProps) {
  if (!SHOW_TEST_NEXT_BUTTON) return null

  return (
    <button
      type="button"
      className="mt-4 w-full rounded-full border-2 border-dashed border-rose-gold/50 bg-white/50 py-2.5 font-display text-sm font-semibold tracking-wide text-rose-gold transition-colors hover:bg-white/80 active:scale-[0.98]"
      onClick={() => {
        triggerHaptic(8)
        onNext()
      }}
    >
      Next → (testing)
    </button>
  )
}
