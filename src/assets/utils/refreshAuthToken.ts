import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { notifications } from "@mantine/notifications";
import { constants } from '@/assets/constants';

export async function refreshAuthToken(): Promise<string> {
  const BASE_URL = import.meta.env.DEV ? constants.DEV_URL : constants.PROD_URL;

  try {
    const data = {
      userId: useAuthStore.getState().authToken?.userId,
      refreshToken: useAuthStore.getState().authToken?.refreshToken,
    };

    const response = await axios.post(
      `${BASE_URL}auth/RefreshAccessToken`,
      data
    );

    useAuthStore.getState().refreshToken(response.data);
    return response.data.token;
  } catch (error) {
    notifications.show({
      color: "red",
      title: "Session expired",
      message: "Please sign in again.",
    });

    useAuthStore.getState().logout();

    throw new Error("TOKEN_REFRESH_FAILED");
  }
}
