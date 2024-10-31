// Load environment variables
import axios from 'axios'

const apiUrl = import.meta.env.VITE_PROXY_URL
const token = import.meta.env.VITE_TOKEN

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'X-Token': token
  }
})
