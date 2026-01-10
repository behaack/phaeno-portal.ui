import { Text } from '@/shared/ui/primiatives'
import { ChangePasswordForm } from './ChangePasswordForm'

export function ChangePasswordPanel() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <Text variant="subheading">Change Password</Text>
      </div>
      <ChangePasswordForm />
    </div>
  )
}
