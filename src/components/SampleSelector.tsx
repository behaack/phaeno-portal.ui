import { useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { Select, rem, SelectProps } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { useAuthStore } from '@/stores/authStore';
import { NIL } from 'uuid';

interface ISampleSelectorProps
  extends Omit<SelectProps, 'onChange' | 'value' | 'data'> {
  sampleId?: string;
  onSampleChange: (value: string | undefined | null) => void;
}

export default function SampleSelector({
  onSampleChange,
  sampleId = NIL,
  ...nativeProps
}: ISampleSelectorProps) {
  const authStore = useAuthStore();
  const [selected, setSelected] = useState<string | null>(sampleId);
  const debouncedChange = useDebouncedCallback(onSampleChange, 200);  

  useEffect(() => {
    if (authStore.samples.length) {
      setSelected(authStore.samples[0].value)
    }
  }, [authStore.samples])

  // keep internal state synced with parent value
  useEffect(() => {
    if (sampleId !== selected) {
      setSelected(sampleId);
    }
  }, [sampleId]);

  // handle change (user selects or clears an option)
  const handleChange = (val: string | null) => {
    setSelected(val);
    debouncedChange(val ?? '');
  };

  return (
    <Select
      w="100%"
      radius="xl"
      searchable
      nothingFoundMessage="No samples found"
      data={authStore.samples} // expects [{ value, label }]
      value={selected ?? ""}
      placeholder="Select Sample"
      onChange={handleChange}
      size={nativeProps.size ?? 'md'}
      leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
      {...nativeProps}
    />
  );
}
