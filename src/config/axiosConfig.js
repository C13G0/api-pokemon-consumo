import axios from 'axios'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para manejo de errores
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición:', error.message)
    return Promise.reject(error)
  }
)

export default axiosInstance
