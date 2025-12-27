import { useEffect, useMemo, useRef, useState } from "react";
import { useFastaList, useFastaLookup } from "@/_api/hooks/useFasta";
import { SearchInput } from "./SearchInput";
import Paginator from "@/_shared/ui/components/Paginator"; // adjust path to where you keep it

export interface IProps {
  sampleId: string;
}

const PAGE_SIZE = 50;

export function FastaPanel({ sampleId }: IProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  // paginator state
  const [page, setPage] = useState(1);
  const [cursor, setCursor] = useState<string>("");

  // cursor history keyed by page so Prev/Next is deterministic
  const cursorsByPageRef = useRef<Record<number, string>>({ 1: "" });

  const lookup = useFastaLookup({ q: searchValue, limit: PAGE_SIZE });

  const list = useFastaList({
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

  // stash nextCursor for page+1 once we have it
  useEffect(() => {
    const nextCursor = list.data?.nextCursor;
    if (nextCursor) {
      cursorsByPageRef.current[page + 1] = nextCursor;
    }
  }, [list.data?.nextCursor, page]);

  // pageCount:
  // 1) best: API provides totalCount
  // 2) fallback: cursor-based estimate (only knows "one more page exists")
  // const pageCount = useMemo(() => {
  //   const total = list.data?.totalCount;
  //   if (typeof total === "number") {
  //     return Math.max(1, Math.ceil(total / PAGE_SIZE));
  //   }
  //   return list.data?.nextCursor ? page + 1 : page;
  // }, [list.data?.totalCount, list.data?.nextCursor, page]);

  const onPageChange = (nextPage: number) => {
    if (nextPage === page) return;

    const nextCursor = cursorsByPageRef.current[nextPage];

    // If user somehow tries to jump to an unknown page, ignore.
    // (Prev/Next will always be known.)
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
        {/* Replace this with your real FASTA row UI */}
        {(list.data?.items ?? []).map((f: any) => (
          <div key={f.id} className="py-1">
            {f.name ?? f.smid ?? f.id}
          </div>
        ))}

        <div className="mt-3">
          <Paginator page={page} pageCount={150} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  );
}
