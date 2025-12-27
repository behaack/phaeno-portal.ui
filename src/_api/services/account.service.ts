import { axiosInstance } from "../core/axios.instance"
import type { UserAccount } from "../types/account"

export const accountService = {
  me: () => axiosInstance.get<unknown, UserAccount>("/account/me"),
}
