import { useEffect, useMemo, useRef, useState } from "react";
import { useTranscriptList, useTranscriptLookup } from "@/_api/hooks/transcript.hooks";
import { SearchInput } from "./components/shared/SearchInput";
import TranscriptTable from ".//components/transcript/Table";
import { useBrowserStore } from '@/_stores/browser.store';
import { CursorPaginator } from "@/_shared/ui/components/inputs";

export interface IProps {
  sampleId: string;
}

const PAGE_SIZE = 50;

export function TranscriptPanel({ sampleId }: IProps) {
  const [searchValue, setSearchValue] = useState<string | null>("");
  const store = useBrowserStore()

  // paginator state
  const [page, setPage] = useState(1);
  const [cursor, setCursor] = useState<string>("");

    // restore state from store
  useEffect(() => {
    setSearchValue(store.selectedGene)
  }, []) 

  // store cursor per page so we can go back/forward reliably
  // page 1 always maps to empty cursor
  const cursorsByPageRef = useRef<Record<number, string>>({ 1: "" });

  const lookup = useTranscriptLookup({ q: searchValue ?? "", limit: PAGE_SIZE });

  const list = useTranscriptList({
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

  // whenever we receive a nextCursor for the current page, stash it as the cursor for (page + 1)
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
    // (Prev/Next will always be known with our paginator.)
    if (nextCursor === undefined) return;

    setPage(nextPage);
    setCursor(nextCursor);
  };

  const updateSearchValue = (value: string | null) => {
    setSearchValue(value ?? "")
    store.setSelectedGene(value)
  }  

  return (
    <div className="mt-5">
      <SearchInput
        value={searchValue ?? ""}
        data={lookup.data ?? []}
        placeholder="Select a Gene"
        onChange={(value) => updateSearchValue(value)}
      />

      <div className="mt-3">
        <TranscriptTable data={list.data?.items ?? []} forAllSamples={!sampleId}/>
        <div className="flex justify-center mt-4">
          <CursorPaginator page={page} onPageChange={onPageChange} hasAdditional={!!list.data?.nextCursor} />
        </div>
      </div>
    </div>
  );
}
