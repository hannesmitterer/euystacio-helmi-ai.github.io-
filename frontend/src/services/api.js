import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const bridgeAPI = {
  // Bridge Messages
  async sendMessage(messageData) {
    const response = await api.post('/api/holy-gral-bridge/message', messageData)
    return response.data
  },

  async getBridgeLog() {
    const response = await api.get('/api/bridge-log')
    return response.data
  },

  // Pulse Events
  async sendPulse(pulseData) {
    const response = await api.post('/api/pulse', pulseData)
    return response.data
  },

  async getPulseLog() {
    const response = await api.get('/api/pulse-log')
    return response.data
  },

  // Vessel Declaration
  async getVesselDeclaration() {
    const response = await api.get('/api/vessel-declaration')
    return response.data
  },

  // Health Check
  async getHealth() {
    const response = await api.get('/')
    return response.data
  }
}

export default api