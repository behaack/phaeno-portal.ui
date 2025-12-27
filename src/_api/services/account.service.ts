import { axiosInstance } from "../core/axios.instance"
import type { MeDto } from "../types/account"

export const accountService = {
  me: () => axiosInstance.get<unknown, MeDto>("/account/me"),
}
