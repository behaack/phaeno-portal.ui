import { FormEvent, useEffect, useRef, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { Autocomplete, CloseButton, Loader, rem } from '@mantine/core';
import { useDatabase } from '@/hooks/useDatabase';
import { useDeviceSize } from '@/hooks/useDeviceSize';

export interface IProps {
  placeholder: string;
  searchValue: string;
  lookupUrl: string;
  onChange: (searchStr: string) => void;
}

export default function IncrementalSearchInput({
  lookupUrl,
  searchValue,
  placeholder,
  onChange,
}: IProps) {
  const db = useDatabase();
  const timeoutRef = useRef<number>(-1);
  const [, height] = useDeviceSize();
  const [data, setData] = useState<string[]>([]);
  const [searchStr, setSearchStr] = useState<string>(searchValue);
  const [clearButtonVisible, setClearButtonVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchStr(searchValue);
    loadLookup(searchValue ? searchValue : 'a');
  }, [searchValue, lookupUrl]);

  useEffect(() => {
    setClearButtonVisible(searchStr !== '');
  }, [searchStr]);

  const dropdownHeight = (): string => {
    let ddh = height - 300;
    ddh = ddh < 180 ? 180 : ddh;
    return `${ddh}px`;
  };

  const changeValue = (value: string) => {
    window.clearTimeout(timeoutRef.current);
    setSearchStr(value);
    setData([]);

    setSearchStr(value);
    if (value.trim().length === 0) {
      setLoading(false);
    } else {
      loadLookup(value);
    }
  };

  const loadLookup = async (value: string) => {
    const url = `${lookupUrl}/${value}`;
    db.httpGet<string[]>(url, false).then((response) => {
      if (response.success) {
        if (response.data) {
          setData(response.data);
        }
      }
    });
  };

  const clearContents = () => {
    setSearchStr('');
    onChange('');
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.blur();
    onChange(searchStr);
  };

  const optionSubmit = (value: string) => {
    setSearchStr(value);
    inputRef.current?.blur();
    onChange(value);
  };

  return (
    <div className="flex flex-row items-center pt-1">
      <form className="w-full" onSubmit={submit}>
        <Autocomplete
          ref={inputRef}
          placeholder={placeholder}
          radius="xl"
          value={searchStr}
          onChange={changeValue}
          onOptionSubmit={optionSubmit}
          w="100%"
          size="md"
          limit={25}
          withScrollArea
          maxDropdownHeight={dropdownHeight()}
          comboboxProps={{ position: 'bottom', zIndex: '99999' }}
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
          rightSection={
            loading ? (
              <Loader size={16} />
            ) : (
              clearButtonVisible && (
                <CloseButton size="lg" variant="transparent" onClick={clearContents} />
              )
            )
          }
          data={data}
        />
        <input type="submit" className="border-none h-0 w-0 p-0 m-0 overflow-hidden" />
      </form>
    </div>
  );
}
