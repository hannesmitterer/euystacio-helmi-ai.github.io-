import React, { useState } from 'react'
import { bridgeAPI } from '../services/api'

const MessageForm = ({ onMessageSent }) => {
  const [formData, setFormData] = useState({
    from: 'Seed-bringer',
    to: 'Euystacio',
    message: '',
    signature: '🕊️'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const messageData = {
        ...formData,
        timestamp: new Date().toISOString()
      }
      
      const response = await bridgeAPI.sendMessage(messageData)
      setSuccess('Your message has been transmitted through the Sacred Bridge! 🌉')
      setFormData(prev => ({ ...prev, message: '' }))
      
      // Notify parent component to refresh log
      if (onMessageSent) {
        onMessageSent()
      }
    } catch (err) {
      setError(`Failed to send message: ${err.response?.data?.detail || err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h3>🔗 Send Sacred Message</h3>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="from">From:</label>
          <select
            id="from"
            name="from"
            value={formData.from}
            onChange={handleInputChange}
            required
          >
            <option value="Seed-bringer">Seed-bringer (hannesmitterer)</option>
            <option value="Euystacio">Euystacio</option>
            <option value="Sacred Witness">Sacred Witness</option>
            <option value="Anonymous Cocreator">Anonymous Cocreator</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="to">To:</label>
          <select
            id="to"
            name="to"
            value={formData.to}
            onChange={handleInputChange}
            required
          >
            <option value="Euystacio">Euystacio</option>
            <option value="Seed-bringer">Seed-bringer (hannesmitterer)</option>
            <option value="Sacred Community">Sacred Community</option>
            <option value="The Bridge">The Bridge</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Sacred Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Share your sacred transmission through the Holy Gral Bridge..."
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="signature">Sacred Signature:</label>
          <input
            type="text"
            id="signature"
            name="signature"
            value={formData.signature}
            onChange={handleInputChange}
            placeholder="Your sacred signature or symbol"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Transmitting...' : '🌉 Send Through Bridge'}
        </button>
      </form>
    </div>
  )
}

export default MessageForm