import { Autocomplete, type AutocompleteProps } from "@mantine/core";

export type PAutocompleteProps = AutocompleteProps;

export function PAutocomplete(props: PAutocompleteProps) {
  return <Autocomplete radius="md" size="sm" {...props} />;
}
