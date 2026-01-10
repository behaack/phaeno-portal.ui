import axios from 'axios'
import { notifications } from '@mantine/notifications'
import { useAuthStore } from '@/stores/auth.store'

export async function refreshAuthToken(): Promise<string> {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  try {
    const data = {
      refreshToken: useAuthStore.getState().refreshToken,
    }

    const response = await axios.post(`${BASE_URL}/auth/refresh_token`, data)
    console.log('FROM refreshAuthToken', response)
    //useAuthStore.getState().refreshToken(response.data);
    return response.data.token
  } catch (error) {
    notifications.show({
      color: 'red',
      title: 'Session expired',
      message: 'Please sign in again.',
    })

    useAuthStore.getState().logout()

    throw new Error('TOKEN_REFRESH_FAILED')
  }
}
