import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { IconShieldCheck } from '@tabler/icons-react'
import { ETwoFactorMethod } from '@/api/types/enums'
import { PModal, PModalBody, PModalHeader } from '@/shared/ui/modals'
import { OopEnrollmentCard } from './Components/OopEnrollmentCard'
import { TotpEnrollmentCard } from './Components/TotpEnrollmentCard'

export interface IHandles {
  open: (twoFactorMethod: ETwoFactorMethod) => void
}

interface IProps {}

export const TwoFactorChgModal = forwardRef<IHandles, IProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const method = useRef<ETwoFactorMethod>(ETwoFactorMethod.None)

  useImperativeHandle(ref, () => ({
    open(twoFactorMethod: ETwoFactorMethod) {
      method.current = twoFactorMethod
      console.log(method.current)
      setIsOpen(true)
    },
  }))

  return (
    <PModal closeOnClickOutside={false} size="lg" opened={isOpen} onClose={() => setIsOpen(false)}>
      <PModalHeader
        title="Two-Factor Settings"
        icon={<IconShieldCheck size={21} />}
        onClose={() => setIsOpen(false)}
      />
      <PModalBody className="py-3 px-5">
        {method.current === ETwoFactorMethod.Totp && (
          <TotpEnrollmentCard onClose={() => setIsOpen(false)} />
        )}
        {method.current === ETwoFactorMethod.OutOfBandCode && (
          <OopEnrollmentCard onClose={() => setIsOpen(false)} />
        )}
      </PModalBody>
    </PModal>
  )
})
