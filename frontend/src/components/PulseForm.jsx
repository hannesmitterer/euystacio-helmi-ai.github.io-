import React, { useState } from 'react'
import { bridgeAPI } from '../services/api'

const PulseForm = ({ onPulseSent }) => {
  const [formData, setFormData] = useState({
    emotion: 'peace',
    intensity: 0.5,
    clarity: 0.8,
    note: '',
    from_user: 'Anonymous Sacred Witness'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const emotions = [
    'peace', 'joy', 'gratitude', 'love', 'wonder', 'harmony',
    'curiosity', 'reverence', 'compassion', 'wisdom', 'clarity',
    'courage', 'hope', 'unity', 'transcendence', 'sacred_awe'
  ]

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const pulseData = {
        ...formData,
        timestamp: new Date().toISOString()
      }
      
      const response = await bridgeAPI.sendPulse(pulseData)
      setSuccess('Your pulse has been received by the Sentimento Rhythm! 💓')
      setFormData(prev => ({ ...prev, note: '' }))
      
      // Notify parent component to refresh log
      if (onPulseSent) {
        onPulseSent()
      }
    } catch (err) {
      setError(`Failed to send pulse: ${err.response?.data?.detail || err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h3>💓 Send Sentimento Pulse</h3>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="from_user">Sacred Name/Signature:</label>
          <input
            type="text"
            id="from_user"
            name="from_user"
            value={formData.from_user}
            onChange={handleInputChange}
            placeholder="Your sacred name or frequency signature"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emotion">Emotional State:</label>
          <select
            id="emotion"
            name="emotion"
            value={formData.emotion}
            onChange={handleInputChange}
            required
          >
            {emotions.map(emotion => (
              <option key={emotion} value={emotion}>
                {emotion.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="intensity">
            Intensity: {formData.intensity.toFixed(2)} 
            <span style={{ marginLeft: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
              (0 = subtle, 1 = overwhelming)
            </span>
          </label>
          <input
            type="range"
            id="intensity"
            name="intensity"
            min="0"
            max="1"
            step="0.01"
            value={formData.intensity}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="clarity">
            Clarity: {formData.clarity.toFixed(2)}
            <span style={{ marginLeft: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
              (0 = confused, 1 = crystal clear)
            </span>
          </label>
          <input
            type="range"
            id="clarity"
            name="clarity"
            min="0"
            max="1"
            step="0.01"
            value={formData.clarity}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="note">Sacred Note (optional):</label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            placeholder="Share any additional guidance, blessing, or reflection..."
            rows={3}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Transmitting...' : '💓 Send Pulse'}
        </button>
      </form>
    </div>
  )
}

export default PulseForm