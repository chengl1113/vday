import { useState } from 'react'
import './PasswordModal.css'

interface PasswordRequirement {
  label: string
  test: (password: string) => boolean
}

const getDaysSinceDating = (): number => {
  const startDate = new Date('2023-07-22')
  const today = new Date()
  return 936
}

const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
//   { label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
//   { label: 'Contains uppercase letter (A-Z)', test: (pw) => /[A-Z]/.test(pw) },
//   { label: 'Contains lowercase letter (a-z)', test: (pw) => /[a-z]/.test(pw) },
//   { label: 'Contains number (0-9)', test: (pw) => /[0-9]/.test(pw) },
//   { label: 'Contains special character (!@#$%^&*)', test: (pw) => /[!@#$%^&*]/.test(pw) },
    { 
      label: `Contains the number of days we have been dating`, 
      test: (pw) => pw.includes(getDaysSinceDating().toString()) 
    },
    { 
      label: 'Contains the number of times we\'ve gone to NYC', 
      test: (pw) => pw.includes('7')
    },
    {
      label: 'Contains the name of the best aquarium we\'ve been to',
      test: (pw) => pw.toLowerCase().includes('montereybay')
    },
    {
      label: "Contains the place that we go to every summer"
      , test: (pw) => pw.toLowerCase().includes('capecod')
    },
    {
      label: "Contains the date we first met (mm-dd-yyyy)"
      , test: (pw) => pw.includes('02-11-2023')
    },
    {
      label: "Contains what we did the first time we hung out alone"
      , test: (pw) => pw.toLowerCase().includes('daveandbusters')
    },
    {
      label: "Contains the name of our first child"
      , test: (pw) => pw.toLowerCase().includes('gabe')
    },
    {
      label: "Contains the name of your favorite matcha spot in SJ"
      , test: (pw) => pw.toLowerCase().includes('aroma')
    }
]

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (password: string) => void
}

export function PasswordModal({ isOpen, onClose, onSubmit }: PasswordModalProps) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)

  const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
    ...req,
    met: req.test(password),
  }))

  // Find the first unmet requirement index
  const firstUnmetIndex = requirements.findIndex((req) => !req.met)
  // Only show requirements up to and including the first unmet one
  const visibleRequirements =
    firstUnmetIndex === -1 ? requirements : requirements.slice(0, firstUnmetIndex + 1)

  const allRequirementsMet = requirements.every((req) => req.met)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (allRequirementsMet) {
      onSubmit(password)
      setPassword('')
      setConfirmPassword('')
    }
  }

  const handleClose = () => {
    setPassword('')
    setConfirmPassword('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Enter Password</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="requirements-section">
            <p className="requirements-title">Password hints:</p>
            <ul className="requirements-list">
              {visibleRequirements.map((req, index) => (
                <li key={index} className={req.met ? 'met' : 'unmet'}>
                  <span className="checkbox">{req.met ? '✓' : '✕'}</span>
                  {req.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-footer">
          
            <button
              type="submit"
              className="btn-submit"
              disabled={!allRequirementsMet}
            >
              Enter Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
