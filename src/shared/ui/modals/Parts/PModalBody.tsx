import { PBox } from "@/shared/ui/components/layout";
import { useDeviceSize } from '@/shared/hooks/useDeviceSize';

export interface IProps {
  children: React.ReactNode;
}

export function PModalBody({children }: IProps) {
  return (
  <PBox className="px-5 py-5">
    {children}
  </PBox>
  )
}

