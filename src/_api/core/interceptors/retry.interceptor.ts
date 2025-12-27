import { AxiosInstance } from "axios"

export function attachRetryInterceptor(client: AxiosInstance) {
  client.interceptors.response.use(undefined, async (error) => {
    const config = error.config
    if (!config || config.__retried) throw error

    if (error.response?.status >= 500) {
      config.__retried = true
      return client(config)
    }

    throw error
  })
}
