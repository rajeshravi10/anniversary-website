import confetti from 'canvas-confetti'

const colors = ['#fda4af', '#b76e79', '#c9a227', '#fff1f2', '#fecdd3']

export function fireRomanticConfetti(intensity: 'light' | 'burst' | 'explosion' = 'burst') {
  const count = intensity === 'light' ? 40 : intensity === 'burst' ? 120 : 200
  const spread = intensity === 'explosion' ? 100 : 70
  const origin = { y: 0.6 }

  confetti({
    particleCount: count,
    spread,
    origin,
    colors,
    ticks: 200,
    gravity: 0.8,
    scalar: intensity === 'explosion' ? 1.2 : 0.9,
  })

  if (intensity === 'explosion') {
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors,
      })
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors,
      })
    }, 200)
  }
}

export function fireHeartExplosion() {
  const defaults = { origin: { y: 0.5 }, colors: ['#e11d48', '#fda4af', '#b76e79', '#c9a227'] }

  confetti({
    ...defaults,
    particleCount: 150,
    spread: 360,
    startVelocity: 35,
    shapes: ['circle'],
    scalar: 1.1,
  })

  setTimeout(() => fireRomanticConfetti('explosion'), 300)
}
