import { PButton } from "@/_shared/ui/components";
import { PDivider } from "@/_shared/ui/components/layout";

export interface IProps {
  onClose: () => void
}

export function PModalDialogFooter({ onClose }: IProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-2 flex justify-end">
      <PButton size="xs" mr={5} onClick={onClose}>
        Close
      </PButton>
    </div>
  )
}