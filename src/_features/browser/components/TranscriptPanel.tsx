import { useEffect, useMemo, useRef, useState } from "react";
import { useTranscriptList, useTranscriptLookup } from "@/_api/hooks/useTranscript";
import { SearchInput } from "./SearchInput";
import Paginator from "@/_shared/ui/components/Paginator";
import TranscriptTable from "./transcript/Table";

export interface IProps {
  sampleId: string;
}

const PAGE_SIZE = 50;

export function TranscriptPanel({ sampleId }: IProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  // paginator state
  const [page, setPage] = useState(1);
  const [cursor, setCursor] = useState<string>("");

  // store cursor per page so we can go back/forward reliably
  // page 1 always maps to empty cursor
  const cursorsByPageRef = useRef<Record<number, string>>({ 1: "" });

  const lookup = useTranscriptLookup({ q: searchValue, limit: PAGE_SIZE });

  const list = useTranscriptList({
    sampleId,
    cursor,
    limit: PAGE_SIZE,
    q: searchValue,
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

  // pageCount:
  // 1) best: use totalCount if API provides it
  // 2) fallback: if there's a nextCursor, we know at least one more page exists
  // const pageCount = useMemo(() => {
  //   //const total = list.data?.totalCount;
  //   if (typeof total === "number") {
  //     return Math.max(1, Math.ceil(total / PAGE_SIZE));
  //   }

  //   // fallback for cursor-based APIs that don't return totals
  //   return list.data?.nextCursor ? page + 1 : page;
  // }, [list.data?.totalCount, list.data?.nextCursor, page]);

  const onPageChange = (nextPage: number) => {
    if (nextPage === page) return;

    const nextCursor = cursorsByPageRef.current[nextPage];

    // If user somehow tries to jump to an unknown page, ignore.
    // (Prev/Next will always be known with our paginator.)
    if (nextCursor === undefined) return;

    setPage(nextPage);
    setCursor(nextCursor);
  };

  return (
    <div className="mt-5">
      <SearchInput
        data={lookup.data ?? []}
        placeholder="Select a SMID"
        onChange={(value) => setSearchValue(value)}
      />

      <div className="mt-3">
        <TranscriptTable data={list.data?.items ?? []} forAllSamples={!sampleId}/>
        <div className="flex justify-center mt-4">
          <Paginator page={page} pageCount={150} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  );
}
