import { forwardRef } from "react"
import { Autocomplete, type AutocompleteProps } from "@mantine/core"

export type PAutocompleteProps = AutocompleteProps

export const PAutocomplete = forwardRef<HTMLInputElement, PAutocompleteProps>(
  (props, ref) => {
    return <Autocomplete ref={ref} radius="md" size="sm" {...props} />
  }
)

PAutocomplete.displayName = "PAutocomplete"
