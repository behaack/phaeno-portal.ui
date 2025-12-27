import { useMemo } from 'react';
import { useDeviceSize } from '@/hooks/useDeviceSize';

export interface IProps {
  children: React.ReactNode;
}

export default function AuthContentContainer({ children }: IProps) {
  const [, height] = useDeviceSize();

  const containerPad = useMemo(() => {
    const HEADER_HEIGHT = 60;
    const MIN_HEIGHT = 555;
    const adj = height < MIN_HEIGHT ? HEADER_HEIGHT : 0;
    return `${adj}px`;
  }, [height]);

  return (
    <div style={{ paddingTop: containerPad }} className="auth-content-container">
      <div className="inner-content">{children}</div>
    </div>
  );
}
