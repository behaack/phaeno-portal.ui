import { useMemo } from 'react';
import { countryList, regionList } from '@/assets/lookupLists/_index';

export interface IProps {
  className?: string;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
}

export default function DisplayAddress({
  className,
  street1,
  street2,
  city,
  state,
  postalCode,
  countryCode,
}: IProps) {
  const countryName = useMemo(() => {
    const index = countryList.findIndex((country) => country.value === countryCode);
    if (index >= 0) {
      return countryList[index].label;
    }
    return countryCode;
  }, [countryCode]);

  const regionName = useMemo(() => {
    if (countryCode) {
      const countryRegions = regionList[countryCode];
      if (countryRegions) {
        const index = countryRegions.findIndex((item) => item === state);
        if (index >= 0) {
          return regionList[countryCode][index];
        }
      }
    }
    return state;
  }, [countryCode]);

  const formatAddress = () => {
    const addressParts = [
      [street1, street2].filter(Boolean).join(', '),
      [city, regionName].filter(Boolean).join(', ') + (postalCode ? ` ${postalCode}` : ''),
      countryName,
    ].filter(Boolean);
    return addressParts.join('\n');
  };

  return (
    <div>
      <pre className={className}>{formatAddress()}</pre>
    </div>
  );
}
