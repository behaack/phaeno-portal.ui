import { forwardRef } from 'react'
import { Box as MantineBox, type BoxProps } from '@mantine/core'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface PBoxProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<'div'>, keyof BoxProps> {
  children?: ReactNode
  padded?: boolean
}

export const PBox = forwardRef<HTMLDivElement, PBoxProps>(
  ({ children, padded, ...props }, ref) => {
    return (
      <MantineBox ref={ref} p={padded ? 'md' : props.p} {...props}>
        {children}
      </MantineBox>
    )
  }
)

PBox.displayName = 'PBox'
