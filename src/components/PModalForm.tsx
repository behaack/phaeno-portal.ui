import { JSX } from 'react';
import { Box, Button, CloseButton, Divider, Modal, type MantineSize as Size } from '@mantine/core';
import { useDeviceSize } from '@/_shared/hooks/useDeviceSize';

export interface IProps {
  title: string;
  opened: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errorMessage?: string;
  actionBtnLabel?: string;
  zIndex?: number;
  size?: Size;
  disableSubmit: boolean;
  icon?: JSX.Element;
  children: React.ReactNode;
}

export default function PModalForm({
  title,
  opened,
  onClose,
  onSubmit,
  errorMessage = '',
  actionBtnLabel = 'Save',
  zIndex = 100,
  size = 'md',
  disableSubmit,
  icon,
  children,
}: IProps) {
  const [, deviceHeight] = useDeviceSize();

  return (
    <Modal
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
      <div>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="font-semibold flex justify-between bg-gray-100 items-center p-2">
            <div className="flex gap-1">
              {icon ? icon : null}
              {title}
            </div>
            <CloseButton onClick={onClose} size="lg" color="" />
          </div>
          <Divider />
          <div className="p-0 h-fit mb-[50px]">
            <Box mah={deviceHeight - 110} className="py-2 px-4 overflow-y-auto">
              <div className="text-sm text-red-600 text-center h-3">{errorMessage}</div>
              {children}
            </Box>
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-2 flex justify-end">
            <Button size="xs" mr={5} onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={disableSubmit} size="xs" type="submit">
              {actionBtnLabel}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
