// // --------------------------------------------------------------
// // 1) Adjust your mental model
// // --------------------------------------------------------------

// type AiAssistPage = IAiAssistResponse
// // where each response is one page and includes cursor for next page

// // --------------------------------------------------------------
// // 2a) Define a “next page” API shape
// // Your “different API” for fetching more data should look like:
// // --------------------------------------------------------------

// export interface IAiAssistNextPageRequest {
//   queryId: string
//   cursor: string | null
//   pageNo?: number // optional if cursor-based
//   limit: number
// }

// // --------------------------------------------------------------
// // 2b) Strongly type results
// // Right now results: object is too vague. Make it:
// // --------------------------------------------------------------

// export interface IAiAssistResponse<T = unknown> {
//   entityType: ESqlAiEntityType
//   renderType: ERenderType
//   queryId: string
//   title: string | null
//   columns: string[]
//   results: unknown
//   nextCursor: string | null
// }

// /// ----------------------------------------------
// /// 3) Hook
// /// ----------------------------------------------

// import { useInfiniteQuery } from "@tanstack/react-query"
// import { aiAssistService } from "@/api/services/aiAssist.service"

// function isPagedResult(r: IAiAssistResponse | null) {
//   if (!r) return false
//   if (r.renderType === ERenderType.Metric) return false
//   // Fasta/Transcript/Aggregation Table are paged
//   return true
// }

// export function useAiAssistInfinite(queryId: string | null, firstPage: IAiAssistResponse | null) {
//   const enabled = Boolean(queryId) && isPagedResult(firstPage)

//   return useInfiniteQuery({
//     queryKey: ["aiAssist", "query", queryId],
//     enabled,
//     initialPageParam: firstPage?.cursor ?? null,
//     queryFn: ({ pageParam }) =>
//       aiAssistService.nextPage({
//         queryId: queryId!,
//         cursor: (pageParam as string | null) ?? null,
//         limit: 50,
//       }),
//     getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
//   })
// }

// /// ----------------------------------------------
// // 4) How to combine first page + subsequent pages cleanly
// /// ----------------------------------------------
// const pages = useMemo(() => {
//   const more = infinite.data?.pages ?? []
//   return firstPage ? [firstPage, ...more] : more
// }, [firstPage, infinite.data])

// const allRows = useMemo(() => {
//   // list/table types: results is array
//   return pages.flatMap((p) => (Array.isArray(p.results) ? p.results : []))
// }, [pages])

// /// ----------------------------------------------
// // 5) Replace AiAssistDisplayData with a “paged-aware” version
// /// ----------------------------------------------

// type Props = {
//   pages: IAiAssistResponse[] // includes first page + any additional pages
// }

// export function AiAssistDisplayDataPaged({ pages }: Props) {
//   const first = pages[0] ?? null
//   if (!first) return null

//   const showFasta = first.entityType === ESqlAiEntityType.Fasta
//   const showTranscript = first.entityType === ESqlAiEntityType.Transcript
//   const showAggTable = first.entityType === ESqlAiEntityType.Aggregation && first.renderType === ERenderType.Table
//   const showAggMetric = first.entityType === ESqlAiEntityType.Aggregation && first.renderType === ERenderType.Metric

//   const rows = useMemo(() => {
//     return pages.flatMap((p) => (Array.isArray((p as any).results) ? ((p as any).results as any[]) : []))
//   }, [pages])

//   // columns/title stable from first page
//   const columns = first.columns ?? []
//   const title = first.title ?? ""

//   return (
//     <div>
//       {showFasta && <FastaTable data={rows as any} forAllSamples />}
//       {showTranscript && <TranscriptTable data={rows as any} forAllSamples />}
//       {showAggTable && <AggregationTable rows={rows} columns={columns} />}
//       {showAggMetric && (
//         <AggregationMetric title={title} rows={Array.isArray(first.results) ? (first.results as any[]) : []} columns={columns} />
//       )}
//     </div>
//   )
// }

// /// ----------------------------------------------
// // 6) Wire it all together in NaturalLangPanel with infinite scrolling
// /// ----------------------------------------------

// import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
// import { PButton, PTextArea } from "@/shared/ui/components"
// import { useAiAssistNaturalLangReq } from "@/api/hooks/aiAssist.hooks"
// import { useAiAssistInfinite } from "@/api/hooks/aiAssistInfinite.hooks"
// import { IAiAssistRequest, IAiAssistResponse, ERenderType } from "@/api/types/AiAssistantTypes"
// import { AiAssistDisplayDataPaged } from "./components/ai-assistant/AiAssistDisplayDataPaged"

// function useInView<T extends Element>(options?: IntersectionObserverInit) {
//   const ref = useRef<T | null>(null)
//   const [inView, setInView] = useState(false)

//   useEffect(() => {
//     const el = ref.current
//     if (!el) return
//     const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options)
//     obs.observe(el)
//     return () => obs.disconnect()
//   }, [options?.root, options?.rootMargin, options?.threshold])

//   return { ref, inView }
// }

// export function NaturalLangPanel() {
//   const ai = useAiAssistNaturalLangReq()

//   const [request, setRequest] = useState("")
//   const [firstPage, setFirstPage] = useState<IAiAssistResponse | null>(null)
//   const [queryId, setQueryId] = useState<string | null>(null)

//   const infinite = useAiAssistInfinite(queryId, firstPage)

//   const pages = useMemo(() => {
//     const more = infinite.data?.pages ?? []
//     return firstPage ? [firstPage, ...more] : more
//   }, [firstPage, infinite.data])

//   const clearResults = () => {
//     setRequest("")
//     setFirstPage(null)
//     setQueryId(null)
//     ai.reset()
//     // (infinite will disable because queryId null)
//   }

//   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     const payload: IAiAssistRequest = {
//       queryId: null,
//       requestString: request,
//       pageNo: 1,
//       parameters: {
//         sampleId: null,
//         cursor: null,
//         limit: 50,
//         q: "",
//       },
//     }

//     ai.mutate(payload, {
//       onSuccess: (data) => {
//         setFirstPage(data)
//         setQueryId(data.queryId)
//       },
//     })
//   }

//   // infinite scroll only if not a metric
//   const canScroll = Boolean(firstPage) && firstPage!.renderType !== ERenderType.Metric

//   const scrollRef = useRef<HTMLDivElement | null>(null)
//   const { ref: sentinelRef, inView } = useInView<HTMLDivElement>({
//     root: scrollRef.current,
//     rootMargin: "250px",
//     threshold: 0,
//   })

//   useEffect(() => {
//     if (!canScroll) return
//     if (!inView) return
//     if (!infinite.hasNextPage) return
//     if (infinite.isFetchingNextPage) return
//     infinite.fetchNextPage()
//   }, [canScroll, inView, infinite.hasNextPage, infinite.isFetchingNextPage, infinite.fetchNextPage])

//   const isBusy = ai.isPending || infinite.isFetchingNextPage

//   return (
//     <div className="mt-5">
//       <form onSubmit={onSubmit}>
//         <PTextArea
//           value={request}
//           label="Type request"
//           description="Request either fasta data or transcript data"
//           placeholder="Type request"
//           onChange={(e) => setRequest(e.currentTarget.value)}
//           disabled={ai.isPending}
//         />

//         <div className="flex justify-end gap-2 mt-1 mb-3">
//           <PButton color="black" onClick={clearResults} disabled={!request && !firstPage}>
//             Clear Request
//           </PButton>

//           <PButton type="submit" disabled={!request || ai.isPending}>
//             {ai.isPending ? "Running…" : "Run Request"}
//           </PButton>
//         </div>
//       </form>

//       {/* Results container */}
//       {pages.length ? (
//         <div ref={scrollRef} className="mt-3 h-[70vh] overflow-auto rounded-xl border">
//           <div className="p-3">
//             <AiAssistDisplayDataPaged pages={pages} />
//           </div>

//           {canScroll ? (
//             <div ref={sentinelRef} className="py-4 text-center text-sm text-muted-foreground">
//               {infinite.isFetchingNextPage
//                 ? "Loading more…"
//                 : infinite.hasNextPage
//                 ? "Scroll to load more"
//                 : "End of results"}
//             </div>
//           ) : null}
//         </div>
//       ) : null}

//       {ai.isError ? (
//         <div className="mt-2 text-sm text-red-600">
//           {ai.error instanceof Error ? ai.error.message : "Request failed"}
//         </div>
//       ) : null}

//       {isBusy ? null : null}
//     </div>
//   )
// }
