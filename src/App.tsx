import { useState } from 'react'
import './App.css'
import { PasswordModal } from './PasswordModal'
import SecretScreen from './SecretScreen'
import CelebrationModal from './CelebrationModal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [password, setPassword] = useState<string | null>(null)
  const [showSecret, setShowSecret] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const handlePasswordSubmit = (newPassword: string) => {
    setPassword(newPassword)
    setIsModalOpen(false)
    setShowSecret(true)
    // Here you can send the password to your backend or do whatever you need
    console.log('Password created:', newPassword)
  }

  return (
    <div className="app-root">
      <div className="cute-bg" aria-hidden="true">
        <span className="float heart pos1" />
        <span className="float heart pos2" />
        <span className="float heart pos3" />
        <span className="float heart pos4" />
        <span className="float bear pos1" />
        <span className="float bear pos2" />
      </div>
      {showSecret ? (
        <SecretScreen
          onYes={() => {
            setShowSecret(false)
            setShowCelebration(true)
          }}
          onNo={() => {
            console.log('User clicked No')
          }}
          onClose={() => {
            setPassword(null)
          }}
        />
      ) : (
        <>
          <h1>Enter the password to see the secret message!</h1>
          <button onClick={() => setIsModalOpen(true)}>Enter Password</button>
          {password && <p style={{ color: 'green' }}>Password successfully created!</p>}
          <PasswordModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handlePasswordSubmit}
          />
        </>
      )}
      <CelebrationModal isOpen={showCelebration} onClose={() => setShowCelebration(false)} />
    </div>
  )
}

export default App
