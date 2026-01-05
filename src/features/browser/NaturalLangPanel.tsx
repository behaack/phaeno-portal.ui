import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import { PButton, PTextArea } from "@/shared/ui/components"
import { useAiAssistInfinitePages, useAiAssistNaturalLangMutation } from "@/api/hooks/ai-assistant.hooks"
import { AiAssistResponse, NaturalLangRequest, ERenderType } from "@/api/types/ai-assistant"
import { AiAssistResults } from "./components/ai-assistant/AiAssisResults"
import { Text } from "@/shared/ui/primiatives"
import { useInViewIntersectionObserver } from "@/shared/hooks/useInViewIntersectionObserver"

export interface Prop {
  sampleId?: string | null
}

export function NaturalLangPanel({ sampleId }: Prop) {
  const ai = useAiAssistNaturalLangMutation()

  const [queryId, setQueryId] = useState<string | null>(null)
  const [firstPage, setFirstPage] = useState<AiAssistResponse | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [request, setRequest] = useState("")

  // scroll container
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // sentinel observer (container scrolling)
  const { ref: sentinelRef, inView } = useInViewIntersectionObserver<HTMLDivElement>({
    root: scrollRef.current,
    rootMargin: "250px",
    threshold: 0,
  })

  const enablePaging =
    !!queryId &&
    !!firstPage?.nextCursor &&
    firstPage?.renderType === ERenderType.Table

  const pagesQuery = useAiAssistInfinitePages({
    queryId,
    firstNextCursor: firstPage?.nextCursor ?? null,
    limit: 50,
    enabled: enablePaging,
  })

  const allPages = useMemo(() => {
    const more = pagesQuery.data?.pages ?? []
    return firstPage ? [firstPage, ...more] : more
  }, [firstPage, pagesQuery.data])

  const result = allPages[0] ?? null

  const allRows = useMemo(() => {
    return allPages.flatMap((p) => (Array.isArray(p.results) ? p.results : []))
  }, [allPages])

  // ✅ infinite scroll trigger
  useEffect(() => {
    if (!inView) return
    if (!enablePaging) return
    if (!pagesQuery.hasNextPage) return
    if (pagesQuery.isFetchingNextPage) return

    pagesQuery.fetchNextPage()
  }, [inView, enablePaging, pagesQuery.hasNextPage, pagesQuery.isFetchingNextPage, pagesQuery.fetchNextPage])

  const submitHndl = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: NaturalLangRequest = {
      sampleId: sampleId!,
      requestString: request,
    }

    ai.mutate(payload, {
      onSuccess: (data: AiAssistResponse) => {
        setFirstPage(data)
        setQueryId(data.queryId)
        setIsActive(true)
      },
    })

    setIsActive(true)
  }

  const clearResults = () => {
    setRequest("")
    setIsActive(false)
    setQueryId(null)
    setFirstPage(null)
  }

  return (
    <div className="mt-5">
      <form onSubmit={submitHndl}>
        <PTextArea
          value={request}
          label="Type request"
          description="Request either fasta data or transcript data"
          placeholder="Type request"
          onChange={(e) => setRequest(e.currentTarget.value)}
          disabled={isActive}
        />

        <div className="flex justify-end gap-2 mt-1 mb-3">
          <PButton type="button" color="black" onClick={clearResults} disabled={!request}>
            Clear Request
          </PButton>

          <PButton type="submit" disabled={isActive || !request}>
            Run Request
          </PButton>
        </div>
      </form>

      {result?.title ? (
        <Text variant="subheading">
          <span>{result.title}</span>
        </Text>
      ) : null}

      {/* <div className="mt-2 text-xs text-muted-foreground">
        Loaded {allRows.length} rows
        {allPages.at(-1)?.nextCursor ? " • More available" : " • End"}
      </div> */}

      {/* ✅ scrollable results area */}
      <div ref={scrollRef} className="mt-1 h-[50vh] overflow-auto">
        <AiAssistResults result={result} rows={allRows} />

        <div ref={sentinelRef} className="flex justify-center py-3 text-sm text-muted-foreground">
          {pagesQuery.isFetchingNextPage
            ? "Loading more..."
            : pagesQuery.hasNextPage
              ? "Scroll to load more"
              : "End"}
        </div>
      </div>
    </div>
  )
}
