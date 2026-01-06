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

type EventName = "Started" | "Completed" | "Failed" | "Canceled" | "Stopping"

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

    const onPipelineEvent = (evt: PipelineJobEventDto, eventName: EventName) => {      
      console.log(evt)
      if (eventName === 'Stopping') return // Eat it
      queryClient.invalidateQueries({ queryKey: ["job-pipeline","jobs"] })
    }

    // Listen to whatever statuses you emit
    ["Started", "Completed", "Failed", "Canceled", "Stopping"].forEach((name) => {
      connection.on(name, (evt) => onPipelineEvent(evt, name as EventName));
    });    

    return () => {
      void connection.stop();
      connectionRef.current = null;
      console.log("✅ Pipeline hub disconnected");
    };
    // ✅ IMPORTANT: depend on values, not functions
  }, [token, authStore]);
}
