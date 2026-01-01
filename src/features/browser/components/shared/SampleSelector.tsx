import { useEffect, useMemo, useState } from "react"
import { IconSearch } from "@tabler/icons-react"
import { rem } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { NIL } from "uuid"
import { PSelect, type PSelectProps } from "@/shared/ui/components"
import { useSampleLookup } from "@/api/hooks/sample.hooks"

// Mantine Select values are string | null
export interface SampleSelectorProps
  extends Omit<PSelectProps, "onChange" | "value" | "data" | "searchValue" | "onSearchChange"> {
  sampleId?: string | null
  onSampleChange: (value: string | null) => void
  /** Initial lookup page size (if your lookup supports it) */
  limit?: number
  value: string
}

export function SampleSelector({
  onSampleChange,
  sampleId = null,
  limit = 50,
  value,
  ...props
}: SampleSelectorProps) {
  // Treat NIL as "no selection" (keeps UI sane)
  const normalizedSampleId = sampleId && sampleId !== NIL ? sampleId : null

  // local state for select (controlled-ish, but allows smooth UX)
  const [selected, setSelected] = useState<string | null>(normalizedSampleId)

  // if you want server-side searching later, wire this to the Select search value
  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebouncedValue(search, 250)

  useEffect(() => {
    setSearch(value)
  }, [value])

  // If your lookup is truly static, you can ignore q/limit entirely.
  const lookup = useSampleLookup({ q: debouncedSearch, limit })

  // Keep internal state synced with parent
  useEffect(() => {
    if (normalizedSampleId !== selected) setSelected(normalizedSampleId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedSampleId])

  const data = useMemo(() => lookup.data ?? [], [lookup.data])

  const handleChange = (val: string | null) => {
    setSelected(val)
    onSampleChange(val)
  }

  return (
    <PSelect
      w="100%"
      radius="xl"
      searchable
      clearable
      placeholder="Select sample"
      nothingFoundMessage={lookup.isLoading ? "Loading samples..." : "No samples found"}
      leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
      data={data}
      value={selected}
      onChange={handleChange}
      searchValue={search}
      onSearchChange={setSearch}
      disabled={props.disabled ?? lookup.isError}
      size="sm"
      {...props}
    />
  )
}
