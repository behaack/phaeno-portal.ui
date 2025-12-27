import { useMemo } from 'react';

export interface IProps {
  value: string | null | undefined;
}

export default function DisplayMask({ value }: IProps) {
  const maskedValue = useMemo(() => {
    if (value) {
      return `******${value.substring(value.length - 6)}`;
    }
    return '';
  }, [value]);
  return <div className="overflow-hidden overflow-ellipsis select-none">{maskedValue}</div>;
}
