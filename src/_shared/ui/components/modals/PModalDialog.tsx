import { JSX } from 'react';
import { useDeviceSize } from '@/_shared/hooks/useDeviceSize';
import { TComponentSize } from '@/_shared/types/TComponentSize';
import { PModal } from './PModal';
import { PButton, PCloseButton } from '../inputs';
import { PBox, PDivider } from '../layout';

export interface IProps {
  opened: boolean;
  title: string;
  onClose: () => void;
  hideFooter?: boolean;
  zIndex?: number;
  size?: TComponentSize;
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
    <PModal
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
          <PCloseButton onClick={onClose} size="lg" color="" />
        </div>
        <PDivider />
        <div className={`p-0 h-fit ${hideFooter ? '' : 'mb-[50px]'}`}>
          <PBox mah={deviceHeight - 110} className="py-2 px-4 overflow-y-auto">
            {children}
          </PBox>
        </div>
        {hideFooter ? null : (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-2 flex justify-end">
            <PButton size="xs" mr={5} onClick={onClose}>
              Close
            </PButton>
          </div>
        )}
      </div>
    </PModal>
  );
}
