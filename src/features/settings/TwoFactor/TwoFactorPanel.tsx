import { useRef } from 'react'
import { ETwoFactorMethod } from '@/api/types/enums'
import { authSession } from '@/auth/auth.session'
import { PButton } from '@/shared/ui/components'
import { Text } from '@/shared/ui/primiatives'
import { TwoFactorSettings } from './Components/TwoFactorSettings'
import { IHandles, TwoFactorChgModal } from './TwoFactorChange.Modal'

export function TwoFactorPanel() {
  const changeForm = useRef<IHandles>(null)
  const authUser = authSession.getUser()

  const changeSettingsHndl = () => {
    const twoFactorMethod =
      authUser?.twoFactor.twoFactorMethod === ETwoFactorMethod.OutOfBandCode
        ? ETwoFactorMethod.Totp
        : ETwoFactorMethod.OutOfBandCode
    changeForm.current?.open(twoFactorMethod)
  }

  const buttonLable = `Change to ${
    authUser?.twoFactor.twoFactorMethod === ETwoFactorMethod.OutOfBandCode
      ? 'authenticator app'
      : 'email one-time code'
  }...`

  return (
    <div>
      <TwoFactorChgModal ref={changeForm} />
      <div className="flex items-center gap-3 mb-5">
        <Text variant="subheading">Two Factor Settings</Text>
      </div>
      <TwoFactorSettings account={authUser!} />
      <div className="text-right mt-10">
        <PButton onClick={changeSettingsHndl} fullWidth>
          {buttonLable}
        </PButton>
      </div>
    </div>
  )
}
