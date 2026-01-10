import { Switch, type SwitchProps } from '@mantine/core'

export type PSwitchProps = SwitchProps

export function PSwitch(props: PSwitchProps) {
  return <Switch {...props} />
}
