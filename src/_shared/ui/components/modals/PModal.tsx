import { Modal as MantineModal, type ModalProps } from '@mantine/core'
import type { ReactNode } from 'react'

export interface PModalProps extends ModalProps {
  children?: ReactNode
}

export function PModal({ children, centered = true, radius = 'lg', ...props }: PModalProps) {
  return (
    <MantineModal centered={centered} radius={radius} {...props}>
      {children}
    </MantineModal>
  )
}
