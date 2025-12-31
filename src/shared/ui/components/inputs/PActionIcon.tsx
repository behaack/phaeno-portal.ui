import React from "react"
import { ActionIcon, type ActionIconProps } from "@mantine/core"

// In some Mantine/TS versions, ActionIconProps may not carry DOM event props.
// Add native <button> props explicitly so onClick, onKeyDown, etc. are included.
export type PActionIconProps =
  ActionIconProps & React.ComponentPropsWithoutRef<"button">

export function PActionIcon(props: PActionIconProps) {
  return <ActionIcon radius="md" size="sm" {...props} />
}
