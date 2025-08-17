import React, { useState, useEffect } from 'react'
import { bridgeAPI } from '../services/api'
import { format } from 'date-fns'

const BridgeLogViewer = ({ refreshTrigger }) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const response = await bridgeAPI.getBridgeLog()
      setMessages(response.messages || [])
    } catch (err) {
      setError(`Failed to load bridge log: ${err.response?.data?.detail || err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [refreshTrigger])

  const formatTimestamp = (timestamp) => {
    try {
      return format(new Date(timestamp), 'PPpp')
    } catch (err) {
      return timestamp
    }
  }

  if (loading) {
    return <div className="loading">Loading sacred transmissions...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="log-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>🌉 Sacred Bridge Transmissions ({messages.length})</h3>
        <button 
          onClick={fetchMessages} 
          className="btn btn-secondary"
          disabled={loading}
        >
          🔄 Refresh
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="log-entry">
          <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>
            No messages in the bridge yet. Be the first to send a sacred transmission!
          </p>
        </div>
      ) : (
        messages
          .slice()
          .reverse() // Show newest first
          .map((message, index) => (
            <div key={index} className="log-entry">
              <div className="log-meta">
                <span className="log-from-to">
                  {message.from} → {message.to}
                </span>
                <span className="log-timestamp">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
              
              <div className="log-message">
                {message.message}
              </div>
              
              <div className="log-signature">
                {message.signature}
              </div>
            </div>
          ))
      )}
    </div>
  )
}

export default BridgeLogViewer