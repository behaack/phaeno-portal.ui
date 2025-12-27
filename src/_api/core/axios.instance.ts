import axios from "axios"
import { applyInterceptors } from "./interceptors/index"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 30_000
})

applyInterceptors(axiosInstance)
