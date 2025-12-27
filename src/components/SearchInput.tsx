import { useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { CloseButton, rem, TextInput, TextInputProps } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';

export interface IProps extends TextInputProps {
  onSearchChange: (value: string) => void;
}

export default function SearchInput(props: IProps) {
  const { onSearchChange, className, value, ...nativeProps } = props;
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (value !== search) {
      setSearch(value?.toString() || '');
    }
  }, [props.value]);

  const handleSearch = useDebouncedCallback((val: string) => {
    onSearchChange(val);
  }, 200);

  const clearContents = () => {
    onSearchChange('');
  };

  const searchChangeHndl = (value: string) => {
    setSearch(value);
    handleSearch(value);
  };

  return (
    <div className="search-input">
      <TextInput
        radius="xl"
        my={2}
        value={search}
        onChange={(e) => searchChangeHndl(e.currentTarget.value)}
        key={props.name}
        size={props.size ? props.size : 'md'}
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
        rightSection={
          props.value && <CloseButton size="lg" variant="transparent" onClick={clearContents} />
        }
        {...nativeProps}
      />
    </div>
  );
}
