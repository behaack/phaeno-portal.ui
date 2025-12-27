import type { AxiosInstance } from "axios"

export function attachRetryInterceptor(client: AxiosInstance) {
  client.interceptors.response.use(undefined, async (error) => {
    const config = error.config
    if (!config || config.__retried) throw error

    const status = error.response?.status
    const method = (config.method ?? "get").toLowerCase()

    const canRetryMethod = method === "get" || method === "head" || method === "options"
    if (status >= 500 && canRetryMethod) {
      config.__retried = true
      return client(config)
    }

    throw error
  })
}
