import { Organization } from "@/api/types/organization";

export function toOrganizationKeyValuePairs(org: Organization) {
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