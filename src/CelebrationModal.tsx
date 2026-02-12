import React from 'react'
import './App.css'

interface CelebrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CelebrationModal({ isOpen, onClose }: CelebrationModalProps) {
  if (!isOpen) return null

  const palette = ['#ff6b9a', '#ffd166', '#ff9ec7', '#ffb3c6', '#f7aef8', '#a8e6cf', '#ffd6ea', '#f6c5ff', '#ffe6b3', '#f8b7d6']

  const pieces = Array.from({ length: 80 }).map((_, i) => {
    const left = Math.random() * 100
    const delay = Math.random() * 800
    const duration = 1200 + Math.random() * 2600
    const size = 8 + Math.random() * 16
    const color = palette[i % palette.length]
    const swing = (Math.random() * 160) - 80
    return { id: i, left, delay, duration, size, color, swing }
  })

  const hearts = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    left: Math.random() * 80 + 10,
    top: Math.random() * 40 + 10,
    delay: Math.random() * 800,
    size: 20 + Math.random() * 28,
  }))

  return (
    <div className="celebration-overlay" >
      <div className="celebration-content" onClick={(e) => e.stopPropagation()}>
        <h2>Yay! You said Yes!</h2>
        <p>Here's to a fun Valentine's day 🎉💕</p>
      </div>

      <div className="confetti-layer" aria-hidden="true">
        {pieces.map((p) => (
          <span
            key={p.id}
            className="confetti"
            style={{
              left: `${p.left}%`,
              background: p.color,
              width: `${p.size}px`,
              height: `${p.size * 1.4}px`,
              animationDelay: `${p.delay}ms`,
              animationDuration: `${p.duration}ms`,
              transform: `translateY(-12vh) translateX(0) rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}

        {hearts.map((h) => (
          <span
            key={h.id}
            className="burst-heart"
            style={{ left: `${h.left}%`, top: `${h.top}%`, fontSize: `${h.size}px`, animationDelay: `${h.delay}ms` }}
          >
            ❤️
          </span>
        ))}
      </div>
    </div>
  )
}
