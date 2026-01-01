import { JSX } from "react";
import { PModalFormFooter } from './Parts/PModalFormFooter';
import { useDeviceSize } from '@/shared/hooks/useDeviceSize';
import type { PSize } from '@/shared/ui/types/PSize'
import { PModalHeader } from "./Parts/PModalHeader";
import { PModal } from "./Parts/PModal";
import { PModalBody } from "./Parts/PModalBody";
import { FormProvider, UseFormReturn } from "react-hook-form";

export interface IProps {
  title: string;
  opened: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errorMessage?: string;
  submitLabel?: string;
  isDisabled?: boolean;
  zIndex?: number;
  size?: PSize;
  icon?: JSX.Element;
  children: React.ReactNode;
  form: UseFormReturn<any, any, any>
}

export function PModalForm({
  title,
  opened,
  onClose,
  onSubmit,
  errorMessage='',
  submitLabel='Save',
  zIndex = 100,
  size = 'md',
  isDisabled=false,
  icon,
  children,  
  form
}: IProps) {
  const [, deviceHeight] = useDeviceSize();
  return (
    <PModal
      opened={opened}
      onClose={onClose}
      size={size}
      withCloseButton={false}
      centered
      closeOnClickOutside={false}
      zIndex={zIndex}
      padding="0"
      overlayProps={{
        backgroundOpacity: 0.3,
        blur: 2,
      }}
    >
      <FormProvider {...form}>
        <form onSubmit={onSubmit}>
          <PModalHeader title={title} icon={icon} onClose={onClose}/>
          <PModalBody errorMessage={errorMessage}>
            {children}
          </PModalBody>     
          <PModalFormFooter submitLabel={submitLabel} isDisabled={isDisabled} onClose={onClose} />
        </form>
      </FormProvider>
    </PModal>
  )
}