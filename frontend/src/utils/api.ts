import axios from 'axios'

const defaultApiUrl = process.env.NEXT_PUBLIC_API_URL

const API_URL = (() => {
  if (defaultApiUrl) {
    return defaultApiUrl.replace(/\/+$/, '') + '/api/'
  }

  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    if (origin.includes('.app.github.dev')) {
      return origin.replace(/-3000\.app\.github\.dev$/, '-8000.app.github.dev') + '/api/'
    }
    if (origin.includes('localhost')) {
      return 'http://localhost:8000/api/'
    }
    const fallbackApiUrl = 'https://laudable-vision-production.up.railway.app/api/'
    console.warn('⚠️ NEXT_PUBLIC_API_URL is not set; falling back to', fallbackApiUrl)
    return fallbackApiUrl
  }

  return 'http://localhost:8000/api/'
})()

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

export const fetchCollectionsByBusiness = async (businessType: string) => {
  try {
    const response = await axios.get(`${API_URL}collections/${businessType}/`, {
      timeout: 3000,
    })
    return response.data
  } catch (error) {
    console.warn(`⚠️ Failed to fetch collections for ${businessType} — returning empty.`)
    return { business: null, collections: [] }
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