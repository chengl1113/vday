import React, { useState } from 'react'
import './App.css'

interface SecretScreenProps {
  onClose: () => void
  onYes?: () => void
  onNo?: () => void
}

export function SecretScreen({ onClose, onYes, onNo }: SecretScreenProps) {
  const [yesScale, setYesScale] = useState(1)
  const [yesTextIndex, setYesTextIndex] = useState(0)
  const SCALE_STEP = 0.25
  const SCALE_MAX = 3.5

  const YES_TEXTS = [
    'Yes',
    'I thought you\'d never ask!',
    'Absolutely!',
    'Yes daddy!',
    'Of course!',
    'I\m yours!',
    'Now you have no choice but to say yes!',
    'Obviously!',
    'You know it!',
    'Yes, a million times yes!',
  ]


  const handleYes = () => {
    if (onYes) onYes()
    else onClose()
  }

  const handleNo = () => {
    setYesScale((s) => Math.min(s + SCALE_STEP, SCALE_MAX))
    setYesTextIndex(yesTextIndex + 1)
    if (onNo) onNo()
  }

  return (
    <div className="secret-screen">
      <div className="secret-content">
        <h1>Surprise!</h1>
        <p>
          Will you be my Valentine sweetie? <span role="img" aria-label="heart">❤️</span>
        </p>

        <div className="secret-actions">
          <button
            className="yes-btn"
            onClick={handleYes}
            style={{ transform: `scale(${yesScale})` }}
            aria-pressed={yesScale > 1}
          >
            {YES_TEXTS[yesTextIndex]}
          </button>
          <button className="no-btn" onClick={handleNo}>
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default SecretScreen
