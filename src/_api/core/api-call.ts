// @/_api/core/api-client.ts
import type { AxiosRequestConfig } from "axios"
import { axiosInstance } from "./axios.instance" // adjust import path to your file

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete"

// Your interceptors already unwrap to "data", so these resolve to T (not AxiosResponse<T>)
export const api = {
  get<T>(url: string, config?: AxiosRequestConfig) {
    return axiosInstance.get<unknown, T>(url, config)
  },

  post<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) {
    return axiosInstance.post<unknown, T, B>(url, body, config)
  },

  put<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) {
    return axiosInstance.put<unknown, T, B>(url, body, config)
  },

  patch<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) {
    return axiosInstance.patch<unknown, T, B>(url, body, config)
  },

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return axiosInstance.delete<unknown, T>(url, config)
  },
} as const