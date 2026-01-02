import { PButton } from "@/shared/ui/components";

export interface IProps {
  onClose: () => void
}

export function PModalDialogFooter({ onClose }: IProps) {
  return (
      <div className="px-5 py-3 flex justify-end">
        <PButton size="sm" onClick={onClose}>
          Close
        </PButton>
    </div>
  )
}