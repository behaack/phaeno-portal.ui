// account.service.ts
import type { UserAccount } from "../types/account";
import { axiosInstance } from "../core/axios.instance";

export const accountService = {
  me: () => axiosInstance.get<UserAccount>("/account/me"),
};