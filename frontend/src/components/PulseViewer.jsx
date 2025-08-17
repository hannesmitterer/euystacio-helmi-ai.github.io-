import React, { useState, useEffect } from 'react'
import { bridgeAPI } from '../services/api'
import { format } from 'date-fns'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const PulseViewer = ({ refreshTrigger }) => {
  const [pulses, setPulses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPulses = async () => {
    try {
      setLoading(true)
      const response = await bridgeAPI.getPulseLog()
      setPulses(response.pulses || [])
    } catch (err) {
      setError(`Failed to load pulse log: ${err.response?.data?.detail || err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPulses()
  }, [refreshTrigger])

  const formatTimestamp = (timestamp) => {
    try {
      return format(new Date(timestamp), 'PPpp')
    } catch (err) {
      return timestamp
    }
  }

  // Prepare chart data
  const chartData = {
    labels: pulses.slice(-10).map((_, index) => `Pulse ${index + 1}`),
    datasets: [
      {
        label: 'Intensity',
        data: pulses.slice(-10).map(p => p.intensity),
        borderColor: 'rgb(106, 139, 90)',
        backgroundColor: 'rgba(106, 139, 90, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Clarity',
        data: pulses.slice(-10).map(p => p.clarity),
        borderColor: 'rgb(216, 201, 176)',
        backgroundColor: 'rgba(216, 201, 176, 0.2)',
        tension: 0.4,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sentimento Rhythm - Recent Pulses'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        title: {
          display: true,
          text: 'Level (0-1)'
        }
      }
    }
  }

  if (loading) {
    return <div className="loading">Reading the sacred rhythms...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="log-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>💓 Sentimento Pulse Log ({pulses.length})</h3>
        <button 
          onClick={fetchPulses} 
          className="btn btn-secondary"
          disabled={loading}
        >
          🔄 Refresh
        </button>
      </div>

      {pulses.length > 0 && (
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}

      {pulses.length === 0 ? (
        <div className="log-entry">
          <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>
            No pulses recorded yet. Be the first to share your sacred rhythm!
          </p>
        </div>
      ) : (
        pulses
          .slice()
          .reverse() // Show newest first
          .map((pulse, index) => (
            <div key={index} className="log-entry pulse-entry">
              <div className="log-meta">
                <span className="log-from-to">
                  {pulse.from_user}
                </span>
                <span className="log-timestamp">
                  {formatTimestamp(pulse.timestamp)}
                </span>
              </div>
              
              <div className="pulse-metrics">
                <div className="pulse-metric">
                  <span className="label">Emotion</span>
                  <span className="value">
                    {pulse.emotion.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
                <div className="pulse-metric">
                  <span className="label">Intensity</span>
                  <span className="value">{(pulse.intensity * 100).toFixed(0)}%</span>
                </div>
                <div className="pulse-metric">
                  <span className="label">Clarity</span>
                  <span className="value">{(pulse.clarity * 100).toFixed(0)}%</span>
                </div>
                <div className="pulse-metric">
                  <span className="label">Status</span>
                  <span className="value">✅ {pulse.ai_signature_status}</span>
                </div>
              </div>
              
              {pulse.note && (
                <div className="log-message">
                  <strong>Sacred Note:</strong> {pulse.note}
                </div>
              )}
            </div>
          ))
      )}
    </div>
  )
}

export default PulseViewer