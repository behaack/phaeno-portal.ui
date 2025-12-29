import { forwardRef, lazy, Suspense, useImperativeHandle, useState } from "react"
import { IconMath } from "@tabler/icons-react";
import { PModalHeader } from "@/_shared/ui/modals/Parts/PModalHeader";
import { PModal } from "@/_shared/ui/modals/Parts/PModal";

export interface IProps {
  title: string
  children: React.ReactNode
}

export interface IHandles {
  open: () => void;
  close: () => void;
}

export const CreateJobModal = forwardRef<IHandles, IProps>((props, ref) => {
  const { title, children} = props
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false)
    }
  }));  

  return (
    <PModal opened={isOpen} onClose={() => setIsOpen(false)}>
      <div>
        <PModalHeader title={title} icon={<IconMath />} onClose={() => setIsOpen(false)} />
        { children }
      </div>
    </PModal>
  )
})