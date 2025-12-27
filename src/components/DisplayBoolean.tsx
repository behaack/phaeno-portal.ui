import { useMemo } from 'react';

export interface IProps {
  value: boolean | null | undefined;
}

export default function DisplayBoolean({ value }: IProps) {
  const returnValue = useMemo(() => {
    if (value === undefined || value === null) {
      return '';
    }

    return value ? 'Yes' : 'No';
  }, [value]);

  return <span>{returnValue}</span>;
}
