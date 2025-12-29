import { api } from "../core/api-call";
import type { UserAccount } from "../types/account";

export const accountService = {
  me: () => api.get<UserAccount>("/account/me"),
};