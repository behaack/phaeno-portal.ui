import { forwardRef, JSX, Suspense, useImperativeHandle, useState } from "react"
import { PModal } from "@/_shared/ui/components/modals"
import { PButton, PCloseButton } from "@/_shared/ui/components/inputs";
import PModalForm from "@/components/PModalForm";
import { IconMath } from "@tabler/icons-react";

export interface IProps {
  title: string
  disableSubmit: boolean;
  children: React.ReactNode
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export interface IHandles {
  open: () => void;
}

export const CreateJobModal = forwardRef<IHandles, IProps>((props, ref) => {
  const { title, children, onSubmit, disableSubmit} = props
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
  }));  

  return (
    <PModalForm
      title={title}
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      size="lg"
      actionBtnLabel="Create Job"
      onSubmit={(e) => onSubmit(e)}
      disableSubmit={disableSubmit}
      icon={<IconMath size={21} />}
    >
      <Suspense fallback="Loading form...">
        {children}
      </Suspense>
    </PModalForm>
  )
})