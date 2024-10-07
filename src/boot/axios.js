// Load environment variables
import axios from 'axios'

const apiUrl = import.meta.env.VITE_PROXY_URL

export const api = axios.create({
  baseURL: apiUrl
})
