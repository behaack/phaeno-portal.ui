import { useEffect, useMemo, useState } from "react"
import { IconSearch } from "@tabler/icons-react"
import { rem } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { PSelect } from "@/shared/ui/components"
import { useSampleLookup } from "@/api/hooks/sample.hooks"
import { useBrowserStore } from "@/stores/browser.store"

// Mantine Select values are string | null
export function SampleSelector() {
  const browserStore = useBrowserStore()
  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebouncedValue(search, 250)

  useEffect(() => {
    setSearch(browserStore.selectedSample ?? "")
  }, []) 

  // If your lookup is truly static, you can ignore q/limit entirely.
  const lookup = useSampleLookup({ q: debouncedSearch ?? "", limit: 50 })
  
  // Keep internal state synced with parent
  useEffect(() => {
    browserStore.setSelectedSample(debouncedSearch)
  }, [debouncedSearch])
  
  const data = useMemo(() => lookup.data ?? [], [lookup.data])
  console.log(data)

  // const handleChange = (val: string | null) => {
  //   setSelected(val)
  //   onSampleChange(val)
  // }

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
      value={search}
      onChange={(value) => setSearch(value!)}
      size="sm"
    />
  )
}
