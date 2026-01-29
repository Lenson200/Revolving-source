import axios from 'axios'

const API_URL ='https://legendary-xylophone-7gqpw6xxxjwcwxxw-8000.app.github.dev/api/'

export const fetchBusinesses = async () => {
  try {
    const response = await axios.get(`${API_URL}businesses/`, {
      timeout: 3000, // optional: 3 seconds max wait
    })
    return response.data
  } catch (error) {
    console.warn('⚠️ Backend unavailable — using static data fallback.')
    return [] // return empty list instead of crashing
  }
}
export const submitContactForm = async (formData: any) => {
  try {
    const response = await axios.post(`${API_URL}contacts/`, formData, {
      headers: { 'Content-Type': 'application/json' },
    })
    return response.data
  } catch (error: any) {
    console.error('❌ Error submitting contact form:', error)
    throw error
  }
}