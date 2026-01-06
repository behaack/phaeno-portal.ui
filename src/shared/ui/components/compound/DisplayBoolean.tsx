import { IconCross } from "@tabler/icons-react"
import { IconCheck } from "@tabler/icons-react"

type DisplayType = "true-false" | "icons"

export interface Props {
  value: boolean
  display?: DisplayType
}

export function DisplayBoolean({ value, display="true-false" }: Props) {
  const trueValue = (display==="true-false") ? <span>Yes</span> : <IconCheck size={12} />
  const falseValue = (display==="true-false") ? <span>No</span> : <IconCross size={12} />

  return (value) ? trueValue : falseValue
}