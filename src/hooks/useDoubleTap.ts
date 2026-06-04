import { useCallback, useRef } from 'react'

export function useDoubleTap(onDoubleTap: () => void, delay = 300) {
  const lastTap = useRef(0)

  return useCallback(() => {
    const now = Date.now()
    if (now - lastTap.current < delay) {
      onDoubleTap()
      lastTap.current = 0
    } else {
      lastTap.current = now
    }
  }, [onDoubleTap, delay])
}
