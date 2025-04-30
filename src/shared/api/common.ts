import axios from "axios"

const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_BASE_URL || "https://dummyjson.com"
  }
  return import.meta.env.VITE_API_BASE_URL || "/api"
}

export const baseApi = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
})
