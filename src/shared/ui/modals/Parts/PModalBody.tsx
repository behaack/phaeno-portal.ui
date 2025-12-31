import { PBox } from "@/shared/ui/components/layout";
import { useDeviceSize } from '@/shared/hooks/useDeviceSize';

export interface IProps {
  errorMessage?: string
  children: React.ReactNode;
}

export function PModalBody({ errorMessage="", children }: IProps) {
  const [, deviceHeight] = useDeviceSize();
  return (
    <div className="p-0 h-fit mb-[50px]">
      <PBox mah={deviceHeight - 110} className="py-2 px-4 overflow-y-auto">
        <div className="text-sm text-red-600 text-center h-3">{errorMessage}</div>
        {children}
      </PBox>
    </div>  
  )
}

