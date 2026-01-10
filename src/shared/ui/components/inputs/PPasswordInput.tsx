import { PasswordInput as MantinePasswordInput, type PasswordInputProps } from '@mantine/core'

export function PPasswordInput(props: PasswordInputProps) {
  return <MantinePasswordInput size="sm" radius="md" {...props} />
}

export type { PasswordInputProps as PPasswordInputProps }
