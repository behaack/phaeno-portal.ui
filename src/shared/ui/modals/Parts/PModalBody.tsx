import { PBox } from "@/shared/ui/components/layout";
import { useDeviceSize } from '@/shared/hooks/useDeviceSize';

export interface Props {
  children: React.ReactNode;
  className?: string
}

export function PModalBody({ className="", children }: Props) {
  return (
  <PBox className={className}>
    {children}
  </PBox>
  )
}

