import { NumberInput, type NumberInputProps } from '@mantine/core'

export type PNumberInputProps = NumberInputProps

export function PNumberInput(props: PNumberInputProps) {
  return <NumberInput radius="md" size="sm" {...props} />
}
