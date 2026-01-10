import React from 'react'
import { Combobox, type ComboboxProps } from '@mantine/core'

// NOTE: Combobox is often used as a compound component.
// This wrapper mainly standardizes defaults and typing.
export type PComboboxProps = ComboboxProps & React.PropsWithChildren

export function PCombobox({ children, ...props }: PComboboxProps) {
  return <Combobox {...props}>{children}</Combobox>
}
