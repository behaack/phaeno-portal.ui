import { useEffect, useMemo, useRef, useState } from "react";
import { useFastaList, useFastaLookup } from "@/api/hooks/fasta.hooks";
import { SearchInput } from "./components/shared/SearchInput";
import { FastaTable } from "./components/fasta/Table";
import { ProTable } from "./components/fasta/ProTable";
import { useBrowserStore } from '@/stores/browser.store';
import { CursorPaginator } from "@/shared/ui/components/inputs";

export interface IProps {
  sampleId: string;
}

const PAGE_SIZE = 50;

export function FastaPanel({ sampleId }: IProps) {
  const [searchValue, setSearchValue] = useState<string | null>("");
  const store = useBrowserStore()

  // paginator state
  const [page, setPage] = useState(1);
  const [cursor, setCursor] = useState<string>("");

  // restore state from store
  useEffect(() => {
    setSearchValue(store.selectedSmid)
  }, []) 

  // cursor history keyed by page so Prev/Next is deterministic
  const cursorsByPageRef = useRef<Record<number, string>>({ 1: "" });

  const lookup = useFastaLookup({ q: searchValue ?? "", limit: PAGE_SIZE });

  const list = useFastaList({
    sampleId,
    cursor,
    limit: PAGE_SIZE,
    q: searchValue ?? "",
  });

  // reset paging when the query context changes
  useEffect(() => {
    setPage(1);
    setCursor("");
    cursorsByPageRef.current = { 1: "" };
  }, [sampleId, searchValue]);

  // stash nextCursor for page+1 once we have it
  useEffect(() => {
    const nextCursor = list.data?.nextCursor;
    if (nextCursor) {
      cursorsByPageRef.current[page + 1] = nextCursor;
    }
  }, [list.data?.nextCursor, page]);

  const onPageChange = (nextPage: number) => {
    if (nextPage === page) return;

    const nextCursor = cursorsByPageRef.current[nextPage];

    // If user somehow tries to jump to an unknown page, ignore.
    // (Prev/Next will always be known.)
    if (nextCursor === undefined) return;

    setPage(nextPage);
    setCursor(nextCursor);
  };

  const updateSearchValue = (value: string | null) => {
    setSearchValue(value ?? "")
    store.setSelectedSmid(value)
  }

  return (
    <div className="mt-5">
      <SearchInput
        value={searchValue ?? ""}
        data={lookup.data ?? []}
        placeholder="Select a SMID"
        onChange={(value) => updateSearchValue(value)}
      />

      <FastaTable data={list.data?.items ?? []} forAllSamples={!sampleId}/>
      {/* <ProTable data={list.data?.items ?? []} forAllSamples={!sampleId}/> */}
      <div className="flex justify-center mt-4">
        <CursorPaginator page={page} onPageChange={onPageChange} hasAdditional={!!list.data?.nextCursor} />
      </div>
    </div>
  );
}
