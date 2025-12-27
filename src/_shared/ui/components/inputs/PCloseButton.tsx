import { forwardRef } from 'react'
import { CloseButton as MantineCloseButton, type CloseButtonProps } from '@mantine/core'
import type { ComponentPropsWithoutRef } from 'react'

export interface PCloseButtonProps
  extends CloseButtonProps,
    Omit<ComponentPropsWithoutRef<'button'>, keyof CloseButtonProps> {}

export const PCloseButton = forwardRef<HTMLButtonElement, PCloseButtonProps>(
  (props, ref) => <MantineCloseButton ref={ref} {...props} />
)

PCloseButton.displayName = 'PCloseButton'
