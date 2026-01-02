import { PButton } from "@/shared/ui/components";

export interface IProps {
  submitLabel?: string
  isDisabled?: boolean
  showRequired?: boolean
  onClose: () => void
}

export function PModalFormFooter({ submitLabel="Submit", isDisabled=false, showRequired=false, onClose }: IProps) {
  return (
    <div className="px-5  py-3 flex justify-between items-center">
      <div className="text-xs text-red-800">
        {(showRequired) && <span>* Required field</span>}
      </div>
      <div>
        <PButton color="black" size="sm" mr={5} onClick={onClose}>
          Cancel
        </PButton>
        <PButton disabled={isDisabled} size="sm" type="submit">
          {submitLabel}
        </PButton>
      </div>
    </div>
  )
}