import { JSX } from 'react';
import { Box, Button, Divider, Modal, type MantineSize as Size } from '@mantine/core';
import { useDeviceSize } from '@/_shared/hooks/useDeviceSize';

export interface IProps {
  opened: boolean;
  title: string;
  icon?: JSX.Element;
  message: string;
  onRespond: (result: 'okay' | 'cancel') => void;
  zIndex?: number;
  size?: Size;
}

export default function PModalConfirm({
  title,
  opened,
  message,
  onRespond,
  icon,
  zIndex = 9999,
  size = 'md',
}: IProps) {
  const [, deviceHeight] = useDeviceSize();

  const cancelHndl = () => {
    onRespond('cancel');
  };

  const confirmHndl = () => {
    onRespond('okay');
  };

  return (
    <Modal
      withCloseButton={false}
      centered
      closeOnClickOutside={false}
      zIndex={zIndex}
      size={size}
      padding="0"
      opened={opened}
      overlayProps={{
        backgroundOpacity: 0.3,
        blur: 2,
      }}
      onClose={() => {}}
    >
      <div>
        <div className="font-semibold flex justify-between bg-gray-100 items-center p-2">
          <div>{title}</div>
        </div>
        <Divider />
        <div className="p-0 h-fit mb-[50px]">
          <Box mah={deviceHeight - 110} className="py-6 px-4 overflow-y-auto">
            {icon} {message}
          </Box>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-2 flex justify-end gap-2">
          <Button size="xs" mr={5} onClick={cancelHndl}>
            Cancel
          </Button>
          <Button size="xs" mr={5} onClick={confirmHndl}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
