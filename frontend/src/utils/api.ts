import axios from 'axios'

const defaultApiUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://laudable-vision-production.up.railway.app/').replace(/\/+$/, '') + '/api/'

const API_URL = defaultApiUrl

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
      timeout: 10000, // optional: 10 seconds max wait for collections
    })
    console.log(`✅ Fetched collections for ${businessType}:`, response.data)
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