import { Divider as MantineDivider, type DividerProps } from '@mantine/core'

export type PDividerProps = DividerProps

export function PDivider(props: PDividerProps) {
  return <MantineDivider my={props.my ?? 'md'} {...props} />
}
