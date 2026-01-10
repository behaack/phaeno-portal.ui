import React from 'react'
import { Button, type ButtonProps } from '@mantine/core'

export type PButtonProps = ButtonProps &
  React.PropsWithChildren &
  React.ComponentPropsWithoutRef<'button'>

export function PButton({ children, ...props }: PButtonProps) {
  return (
    <Button radius="md" size="sm" {...props}>
      {children}
    </Button>
  )
}
