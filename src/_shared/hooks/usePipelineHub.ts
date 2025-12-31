import { useEffect, useRef } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { refreshAuthToken } from "@/_shared/hooks/refreshAuthToken";
import { useAuthStore } from "@/stores/auth.store";

export function usePipelineHub() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const authStore = useAuthStore()
  const token = authStore.accessToken ?? ""
  const connectionRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    // 🔴 NOT AUTHENTICATED → DISCONNECT
    console.log("PIPELINE HUB")
    if (!authStore.isAuthenticated() || !token) {
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
      }
      return;
    }

    // 🟢 ALREADY CONNECTED → DO NOTHING
    if (connectionRef.current) return;

    // 🟢 CREATE CONNECTION
    console.log(`${BASE_URL}/pipelineHub`)
    const connection = new HubConnectionBuilder()
      .withUrl(`${BASE_URL}/pipelineHub`, {
        accessTokenFactory: async () => {
          try {
            if (token && !authStore.isAccessTokenExpired()) {
              return token;
            }

            return await refreshAuthToken();
          } catch {
            authStore.logout();
            return "";
          }
        },
      })
      .withAutomaticReconnect()
      .build();

    connection.on("Started", (msg) =>
      console.log(msg)
      //analyticsStore.updateJobStatus(msg.pipelineRun)
    );

    connection.on("Completed", (msg) => 
      console.log(msg)
      //analyticsStore.updateJobStatus(msg.pipelineRun)
    );

    connection.on("Failed", (msg) =>
      console.log(msg)
      //analyticsStore.updateJobStatus(msg.pipelineRun)
    );

    connection.on("Canceled", (msg) =>
      console.log(msg)
      //analyticsStore.updateJobStatus(msg.pipelineRun)
    );

    connection.on("Stopping", (msg) =>
      console.log(msg)
      //analyticsStore.cancelJob(msg.pipelineRun)
    );    

    connection.start().then(() => {
      console.log("✅ %cPipeline hub connected", "color: dodgerblue");
    });

    connectionRef.current = connection;

    // 🧹 CLEANUP ON UNMOUNT
    return () => {
      connection.stop();
      connectionRef.current = null;
      console.log("✅ %cPipeline hub disconnected", "color: dodgerblue");
    };
  }, [authStore.isAuthenticated, token]);
}
