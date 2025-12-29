import { JSX } from 'react';
import { useDeviceSize } from '@/_shared/hooks/useDeviceSize';
import { TComponentSize } from '@/_shared/types/TComponentSize';
import { PBox } from '../components/layout';
import { PModal } from './Parts/PModal';
import { PModalHeader } from './Parts/PModalHeader';
import { PModalDialogFooter } from './Parts/PModalDialogFooter';
import { PModalBody } from './Parts/PModalBody';

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

export function PModalDialog({
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
        <PModalHeader title={title} icon={icon} onClose={onClose}/>
        <PModalBody>
          {children}
        </PModalBody>
        <PModalDialogFooter onClose={onClose} />
      </div>
    </PModal>
  );
}
