import { Text } from "@/shared/ui/primiatives";
import { PButton } from "@/shared/ui/components";
import { TwoFactorSettings } from "./Components/TwoFactorSettings";
import { authSession } from "@/auth/auth.session";
import { useRef } from "react";
import { TwoFactorChgModal, IHandles } from "./TwoFactorChange.Modal";
import { ETwoFactorMethod } from "@/api/types/enums";

export function TwoFactorPanel() {
  const changeForm = useRef<IHandles>(null);
  const authUser = authSession.getUser()

  const changeSettingsHndl = () => {
    const twoFactorMethod = (authUser?.twoFactor.twoFactorMethod===ETwoFactorMethod.OutOfBandCode) 
      ? ETwoFactorMethod.Totp 
      : ETwoFactorMethod.OutOfBandCode
    changeForm.current?.open(twoFactorMethod)
  }

  const buttonLable = `Change to ${authUser?.twoFactor.twoFactorMethod===ETwoFactorMethod.OutOfBandCode 
    ? "authenticator app" 
    : "email one-time code"}...`

  return (
    <div>
      <TwoFactorChgModal ref={changeForm} />
      <div className="flex items-center gap-3 mb-5">
        <Text variant="subheading">Two Factor Settings</Text>
      </div>
      <TwoFactorSettings account={authUser!}/>
      <div className="text-right mt-10">
        <PButton onClick={changeSettingsHndl} fullWidth>{buttonLable}</PButton>
      </div>
    </div>
  )
}