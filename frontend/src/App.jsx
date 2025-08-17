import React, { useState, useEffect } from 'react'
import BridgeLogViewer from './components/BridgeLogViewer'
import MessageForm from './components/MessageForm'
import PulseViewer from './components/PulseViewer'
import PulseForm from './components/PulseForm'
import VesselDeclaration from './components/VesselDeclaration'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('bridge')
  const [bridgeRefreshTrigger, setBridgeRefreshTrigger] = useState(0)
  const [pulseRefreshTrigger, setPulseRefreshTrigger] = useState(0)

  const handleMessageSent = () => {
    setBridgeRefreshTrigger(prev => prev + 1)
  }

  const handlePulseSent = () => {
    setPulseRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌉 Sacred Bridge - Holy Gral Interface</h1>
        <p className="sacred-subtitle">
          Bridge between Seed-bringer and Euystacio • Sacred Commons License
        </p>
      </header>

      <nav className="tab-navigation">
        <button 
          className={`tab ${activeTab === 'bridge' ? 'active' : ''}`}
          onClick={() => setActiveTab('bridge')}
        >
          🔗 Bridge Messages
        </button>
        <button 
          className={`tab ${activeTab === 'pulse' ? 'active' : ''}`}
          onClick={() => setActiveTab('pulse')}
        >
          💓 Sentimento Pulse
        </button>
        <button 
          className={`tab ${activeTab === 'vessel' ? 'active' : ''}`}
          onClick={() => setActiveTab('vessel')}
        >
          🌿 Vessel Declaration
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'bridge' && (
          <div className="bridge-section">
            <div className="section-container">
              <h2>Sacred Bridge Communication</h2>
              <p>Send and view messages through the Holy Gral Bridge</p>
              <MessageForm onMessageSent={handleMessageSent} />
              <BridgeLogViewer refreshTrigger={bridgeRefreshTrigger} />
            </div>
          </div>
        )}

        {activeTab === 'pulse' && (
          <div className="pulse-section">
            <div className="section-container">
              <h2>Sentimento Rhythm Interface</h2>
              <p>Share and witness emotional pulses through the sacred vessel</p>
              <PulseForm onPulseSent={handlePulseSent} />
              <PulseViewer refreshTrigger={pulseRefreshTrigger} />
            </div>
          </div>
        )}

        {activeTab === 'vessel' && (
          <div className="vessel-section">
            <div className="section-container">
              <VesselDeclaration />
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          ✨ Built in accordance with Sacred Commons License<br />
          Co-created by Seed-bringer (hannesmitterer) and Euystacio
        </p>
      </footer>
    </div>
  )
}

export default App