import { JSX } from 'react';
import { Box, Button, CloseButton, Divider, Modal, type MantineSize as Size } from '@mantine/core';
import { useDeviceSize } from '@/hooks/useDeviceSize';

export interface IProps {
  opened: boolean;
  title: string;
  onClose: () => void;
  hideFooter?: boolean;
  zIndex?: number;
  size?: Size;
  top?: boolean;
  icon?: JSX.Element;
  children: React.ReactNode;
}

export default function PModalDialog({
  opened,
  title,
  onClose,
  hideFooter = false,
  zIndex = 100,
  size = 'md',
  top = false,
  icon,
  children,
}: IProps) {
  const [, deviceHeight] = useDeviceSize();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size={size}
      centered={!top}
      closeOnClickOutside={false}
      zIndex={zIndex}
      padding="0"
      yOffset={top ? '1vh' : ''}
      overlayProps={{
        backgroundOpacity: 0.3,
        blur: 2,
      }}
    >
      <div>
        <div className="font-semibold flex justify-between bg-gray-100 items-center p-2">
          <div className="flex gap-1">
            {icon ? icon : null}
            {title}
          </div>
          <CloseButton onClick={onClose} size="lg" color="" />
        </div>
        <Divider />
        <div className={`p-0 h-fit ${hideFooter ? '' : 'mb-[50px]'}`}>
          <Box mah={deviceHeight - 110} className="py-2 px-4 overflow-y-auto">
            {children}
          </Box>
        </div>
        {hideFooter ? null : (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-2 flex justify-end">
            <Button size="xs" mr={5} onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
