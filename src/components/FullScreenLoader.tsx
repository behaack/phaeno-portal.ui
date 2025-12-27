import { useMemo } from 'react';
import { Loader } from '@mantine/core';
import { useAppStore } from '@/stores/appStore';

export interface IProps {
  show?: boolean;
}

export default function FullScreenLoader({ show = false }: IProps) {
  const asyncCount = useAppStore().asyncCount;

  const showLoader = useMemo((): boolean => {
    return show || asyncCount > 0;
  }, [asyncCount, show]);

  return (
    <>
      {showLoader ? (
        <div className="fixed top-0 z-[999999] left-0 w-full h-full bg-white opacity-40">
          <div className="flex row justify-center items-center h-full">
            <Loader color="black" size="xl" type="dots" />
          </div>
        </div>
      ) : null}
    </>
  );
}
