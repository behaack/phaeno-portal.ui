import { Tooltip, type TooltipProps } from '@mantine/core'

export type PToolTipProps = TooltipProps

export function PToolTip(props: PToolTipProps) {
  return <Tooltip withArrow arrowSize={8} radius="md" openDelay={250} {...props} />
}
