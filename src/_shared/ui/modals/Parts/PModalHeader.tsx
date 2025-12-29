import { JSX } from "react";
import { PCloseButton } from "@/_shared/ui/components/inputs";
import { PDivider } from "@/_shared/ui/components/layout";

export interface IProps {
  title?: string
  icon?: React.ReactNode;
  onClose: () => void
}

export function PModalHeader({ title="", icon, onClose }: IProps) {
  return (
    <div>
      <div className="font-semibold flex justify-between bg-gray-100 items-center p-2">
        <div className="flex gap-1">
          {icon ? icon : null}
          {title}
        </div>
        <PCloseButton onClick={onClose} size="lg" color="" />
      </div>
    </div>
  )
}