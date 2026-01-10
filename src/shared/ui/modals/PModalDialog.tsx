import { JSX } from 'react'
import { TComponentSize } from '@/shared/types/TComponentSize'
import { PModal } from './Parts/PModal'
import { PModalBody } from './Parts/PModalBody'
import { PModalDialogFooter } from './Parts/PModalDialogFooter'
import { PModalHeader } from './Parts/PModalHeader'

export interface IProps {
  opened: boolean
  title?: string
  onClose: () => void
  zIndex?: number
  size?: TComponentSize
  top?: boolean
  icon?: JSX.Element
  className?: string
  children: React.ReactNode
}

export function PModalDialog({
  opened,
  title = '',
  onClose,
  zIndex = 100,
  size = 'md',
  top = false,
  icon,
  className,
  children,
}: IProps) {
  return (
    <PModal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size={size}
      centered={!top}
      closeOnClickOutside={false}
      zIndex={zIndex}
      padding="0"
      yOffset={top ? '1vh' : ''}
      overlayProps={{
        backgroundOpacity: 0.3,
        blur: 2,
      }}
    >
      <div>
        <PModalHeader title={title} icon={icon} onClose={onClose} />
        <PModalBody className={className}>{children}</PModalBody>
        <PModalDialogFooter onClose={onClose} />
      </div>
    </PModal>
  )
}
