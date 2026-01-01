import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { useDeviceSize } from '@/shared/hooks/useDeviceSize';
import { PAutocomplete, PCloseButton } from '@/shared/ui/components/inputs';
import { useDebouncedValue } from "@mantine/hooks"

export interface IProps {
  data: string[]
  placeholder: string
  onChange: (value: string) => void
  value?: string
}

export function SearchInput({
  data,
  placeholder,
  onChange,
  value
}: IProps) {
  const [, height] = useDeviceSize();
  const [searchStr, setSearchStr] = useState<string>("");
  const [debouncedSearch] = useDebouncedValue(searchStr, 250)
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchStr(value ?? "");
  }, [value]);

  const clearButtonVisible = useMemo(() => {
    return searchStr !== ''
  }, [searchStr]);

  const dropdownHeight = (): string => {
    let ddh = height - 300;
    ddh = ddh < 180 ? 180 : ddh;
    return `${ddh}px`;
  };

  const clearContents = () => {
    setSearchStr('');
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.blur();
  };

  const optionSubmit = (value: string) => {
    setSearchStr(value);
    inputRef.current?.blur();
  };

  const changeValue = (value: string) => {
    setSearchStr(value)
  }
  
  useEffect(() => {
    onChange(debouncedSearch)
  }, [debouncedSearch])

  return (
    <div className="flex flex-row items-center pt-1">
      <form className="w-full" onSubmit={submit}>
        <PAutocomplete
          ref={inputRef}
          placeholder={placeholder}
          radius="xl"
          value={searchStr}
          onChange={changeValue}
          onOptionSubmit={optionSubmit}
          w="100%"
          size="sm"
          limit={25}
          withScrollArea
          maxDropdownHeight={dropdownHeight()}
          comboboxProps={{ position: 'bottom', zIndex: '99999' }}
          leftSection={<IconSearch style={{ width: 16, height: 16 }} />}
          rightSection={
            clearButtonVisible && (
              <PCloseButton size="md" variant="transparent" onClick={clearContents} />
            )
          }
          data={data}
        />
        <input type="submit" className="border-none h-0 w-0 p-0 m-0 overflow-hidden" />
      </form>
    </div>
  );
}
