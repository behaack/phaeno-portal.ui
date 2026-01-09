import { useEffect, useMemo, useRef, useState } from "react"
import { useFastaInfiniteList, useFastaLookup } from "@/api/hooks/fasta.hooks"
import { SearchInput } from "./components/shared/SearchInput"
import { FastaTable } from "./components/fasta/FastaTable"
// import { ProTable } from "./components/fasta/ProTable"
import { useBrowserStore } from "@/stores/browser.store"
import { useInViewIntersectionObserver } from "@/shared/hooks/useInViewIntersectionObserver"
import { flattenInfiniteCursorPages } from "@/api/helpers/flattenInfiniteCursorPages"

const PAGE_SIZE = 50

export function FastaPanel() {
  const store = useBrowserStore()
  const [searchValue, setSearchValue] = useState<string | null>("")

  useEffect(() => {
    setSearchValue(store.selectedSmid)
  }, [])

  const lookup = useFastaLookup({ q: searchValue ?? "", limit: PAGE_SIZE })

  const list = useFastaInfiniteList({
    sampleId: store.selectedSample,
    limit: PAGE_SIZE,
    q: searchValue ?? "",
  })

  // Flatten all pages into one array for the table
  const rows = useMemo(() => flattenInfiniteCursorPages(list.data), [list.data])

  // Sentinel for infinite load
  const { ref: sentinelRef, inView } = useInViewIntersectionObserver<HTMLDivElement>({
    root: null,            // window scrolling; set to a container element if needed
    rootMargin: "250px",   // preload before reaching the end
    threshold: 0,
  })

  // When search context changes, start over (TanStack will do this via queryKey change,
  // but we also want to avoid any weird "inView" immediate fetch after switching)
  const justResetRef = useRef(false)
  useEffect(() => {
    justResetRef.current = true
    const t = window.setTimeout(() => {
      justResetRef.current = false
    }, 0)
    return () => window.clearTimeout(t)
  }, [store.selectedSample, searchValue])

  // Fetch next page when sentinel is visible
  useEffect(() => {
    if (!inView) return
    if (justResetRef.current) return
    if (!list.hasNextPage) return
    if (list.isFetchingNextPage) return

    list.fetchNextPage()
  }, [inView, list.hasNextPage, list.isFetchingNextPage, list.fetchNextPage])

  const updateSearchValue = (value: string | null) => {
    const next = value ?? ""
    setSearchValue(next)
    store.setSelectedSmid(value)
  }

  return (
    <div className="mt-5">
      <SearchInput
        value={searchValue!}
        data={lookup.data ?? []}
        placeholder="Select a SMID"
        onChange={updateSearchValue}
      />

      <div className="h-[60vh] overflow-auto rounded-xl border">
        <FastaTable data={rows} forAllSamples={!store.selectedSample} />
        {/* <ProTable data={rows} forAllSamples={!sampleId}/> */}
        {/* Sentinel + status */}
        <div ref={sentinelRef} className="flex justify-center mt-4 py-3 text-sm text-muted-foreground">
          {list.isLoading ? (
            <span>Loading…</span>
          ) : list.isFetchingNextPage ? (
            <span>Loading more…</span>
          ) : list.hasNextPage ? (
            <span>Scroll to load more</span>
          ) : rows.length ? (
            <span>End of results</span>
          ) : (
            <span>No results</span>
          )}
        </div>
      </div>
    </div>
  )
}
