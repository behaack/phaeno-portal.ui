import { IconMail } from '@tabler/icons-react'
import { ActionIcon } from '@mantine/core'
import { UserDetails } from '@/api/types/user'
import { PToolTip } from '@/shared/ui/components/feedback'

interface IProps {
  user: UserDetails
  onSendEmail: () => void
}

export function toUserKeyValuePairs({ user, onSendEmail }: IProps) {
  const valueAction = user.isSetup ? null : (
    <PToolTip label="Resend invitation email">
      <ActionIcon size="sm" type="button" onClick={onSendEmail}>
        <IconMail size={12} />
      </ActionIcon>
    </PToolTip>
  )

  return [
    { label: 'User ID', value: user.id },
    { label: 'First Name', value: user.firstName },
    { label: 'Last Name', value: user.lastName },
    { label: 'Email', value: user.email },
    { label: 'Admin', value: user.isAdmin ? 'Yes' : 'No' },
    {
      label: 'Set-up',
      value: user.isSetup ? 'Yes' : 'No',
      valueAction,
    },
  ]
}
