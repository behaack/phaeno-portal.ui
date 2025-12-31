import { Organization } from "@/api/types/organization";
import { UserDetails } from "@/api/types/user";

export function toUserKeyValuePairs(user: UserDetails) {
  return [
    { label: "User ID", value: user.id },
    { label: "First Name", value: user.firstName },
    { label: "Last Name", value: user.lastName },
    { label: "Is Admin", value: (user.isAdmin) ? "True" : "False" },
    { label: "Is Set-up", value: (user.isSetup) ? "True" : "False" },
  ];
}