import { useMemo } from 'react'

export function Petals({ count = 24 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 6,
        size: 8 + Math.random() * 10,
        rotation: Math.random() * 360,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute opacity-70"
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          🌸
        </span>
      ))}
    </div>
  )
}
