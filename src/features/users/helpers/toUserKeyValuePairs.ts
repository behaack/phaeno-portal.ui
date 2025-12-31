import { Organization } from "@/api/types/organization";
import { UserDetails } from "@/api/types/user";

export function toUserKeyValuePairs(org: UserDetails) {
  return [
    { label: "Organization ID", value: org.id },
    { label: "Organization Name", value: org.organizationName },
    { label: "Street Address", value: org.street1 },
    { label: "Address Line 2", value: org.street2 },
    {
      label: "Location",
      value: [org.city, org.state, org.postalCode]
        .filter(Boolean)
        .join(", "),
    },
    { label: "Country", value: org.countryCode },
  ];
}