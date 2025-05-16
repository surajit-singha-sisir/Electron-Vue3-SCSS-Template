import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { ref } from 'vue'
import { useToast } from './Toast'
const { showToast } = useToast()

// LICENSE KEY
const retrievedKey = ref<string>('')

// MOTHERBOARD ID
const motherboardID = ref<string>('')

// CREATE AXIOS CLIENT
const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://192.168.0.111:8000'
})

// SET REQUEST HEADERS
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (retrievedKey.value) {
    config.headers['Authorization'] = retrievedKey.value
  }

  if (motherboardID.value) {
    config.headers['serialID'] = motherboardID.value
  }

  config.headers['Content-Type'] = 'application/json'
  return config
})

export async function useApi() {
  // GET LICENSE KEY
  try {
    retrievedKey.value = await window.electronAPI.getLicenseKey()
  } catch {
    showToast('error', 'FAILED TO GET LICENSE KEY')
  }

  // GET MOTHERBOARD ID
  try {
    motherboardID.value = await window.electronAPI.getMotherboardID()
  } catch {
    showToast('error', 'FAILED TO GET SERIAL ID')
  }

  // RETURN CONFIGURED CLIENT AND UPDATERS
  return {
    apiClient,
    setToken: (newToken: string) => (retrievedKey.value = newToken),
    setSerialID: (id: string) => (motherboardID.value = id)
  }
}
