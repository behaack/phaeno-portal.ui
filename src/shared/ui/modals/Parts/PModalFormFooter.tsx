import { PButton } from "@/shared/ui/components";
import { PDivider } from "@/shared/ui/components/layout";

export interface IProps {
  submitLabel?: string
  isDisabled?: boolean,
  onClose: () => void
}

export function PModalFormFooter({ submitLabel="Submit", isDisabled=false, onClose }: IProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-2 flex justify-end">
      <PButton size="xs" mr={5} onClick={onClose}>
        Cancel
      </PButton>
      <PButton disabled={isDisabled} size="xs" type="submit">
        {submitLabel}
      </PButton>
    </div>
  )
}