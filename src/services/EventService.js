import axios from 'axios'

// A single axios instance for the app
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // URL for all calls
  // Authentication configurations
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents() {
    return apiClient.get('/events')
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
