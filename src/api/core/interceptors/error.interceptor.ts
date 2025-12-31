import { AxiosInstance } from "axios"
import { authSession } from "@/auth/auth.session"

export function attachErrorInterceptor(client: AxiosInstance) {
  client.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error?.error?.code === "UNAUTHORIZED") {
        authSession.logout()
      }

      return Promise.reject(error)
    }
  )
}
