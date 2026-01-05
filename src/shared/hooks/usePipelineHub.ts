import { useEffect, useRef } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { refreshAuthToken } from "@/shared/hooks/refreshAuthToken";
import { useAuthStore } from "@/stores/auth.store";
import { DataPipelineItem, JobType, StatusType } from "@/api/types/job-pipeline";
import { queryClient } from "@/app/providers/queryClient";
import { pipelineRunsKey } from "@/api/hooks/job-pipeline.hooks";

type PipelineJobEventDto = {
  erroeMessage: string,
  eventType: JobType
  jobId: string
  metrics: object
  pipeline: string
  status: StatusType
  timestamp: string
  pipelineRun: DataPipelineItem
};

export function usePipelineHub() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const authStore = useAuthStore();
  const token = authStore.accessToken ?? "";
  const connectionRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    if (!authStore.isAuthenticated() || !token) {
      if (connectionRef.current) {
        void connectionRef.current.stop();
        connectionRef.current = null;
      }
      return;
    }

    // 🟢 ALREADY CONNECTED → DO NOTHING
    if (connectionRef.current) return;

    const connection = new HubConnectionBuilder()
      .withUrl(`${BASE_URL}/pipelineHub`, {
        accessTokenFactory: async () => {
          try {
            if (authStore.accessToken && !authStore.isAccessTokenExpired()) {
              return authStore.accessToken; // ✅ use latest from store, not captured token
            }
            return await refreshAuthToken();
          } catch (e) {
            console.error("❌ accessTokenFactory failed", e);
            authStore.logout();
            return "";
          }
        },
      })
      .configureLogging(LogLevel.Information) // ✅ critical
      .withAutomaticReconnect()
      .build();

    // ✅ lifecycle logs
    connection.onreconnecting((err) => console.warn("🔄 reconnecting", err));
    connection.onreconnected((id) => console.log("✅ reconnected", id));
    connection.onclose((err) => console.warn("🛑 closed", err));

    (async () => {
      try {
        await connection.start();
        console.log("✅ Pipeline hub connected: ", connection.connectionId);
      } catch (err) {
        console.error("❌ Pipeline hub failed to connect", err);
      }
    })();


    connectionRef.current = connection;

    // const onPipelineEvent = (evt: PipelineJobEventDto) => {
    //   const run = evt.pipelineRun;
    //   if (!run) return;

    //   // 1) ✅ Instant UI update (optional but awesome)
    //   queryClient.setQueriesData(
    //     { queryKey: pipelineRunsKey },
    //     (old: any) => {
    //       if (!old) return old;

    //       // Handle common shapes:
    //       // a) old is array
    //       if (Array.isArray(old)) {
    //         return old.map((r) => (r.id === run.id ? { ...r, ...run } : r));
    //       }

    //       // b) old is paged: { items: [] }
    //       if (Array.isArray(old.items)) {
    //         return {
    //           ...old,
    //           items: old.items.map((r: any) => (r.id === run.id ? { ...r, ...run } : r)),
    //         };
    //       }

    //       // c) old is infinite query: { pages: [{ items: [] }], pageParams: [] }
    //       if (Array.isArray(old.pages)) {
    //         return {
    //           ...old,
    //           pages: old.pages.map((p: any) =>
    //             Array.isArray(p.items)
    //               ? { ...p, items: p.items.map((r: any) => (r.id === run.id ? { ...r, ...run } : r)) }
    //               : p
    //           ),
    //         };
    //       }

    //       return old;
    //     }
    //   );

    //   // 2) ✅ Safety net: refetch from server (debounce if chatty)
    //   queryClient.invalidateQueries({ queryKey: ["pipelineRuns"] });
    // };

    // // Listen to whatever statuses you emit
    // ["Started", "Completed", "Failed", "Canceled", "CancelRequested"].forEach((name) => {
    //   connection.on(name, onPipelineEvent);
    // });    

    return () => {
      void connection.stop();
      connectionRef.current = null;
      console.log("✅ Pipeline hub disconnected");
    };
    // ✅ IMPORTANT: depend on values, not functions
  }, [token, authStore]);
}
