import { useEffect, useRef } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { refreshAuthToken } from "@/shared/hooks/refreshAuthToken";
import { useAuthStore } from "@/stores/auth.store";

export function usePipelineHub() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const authStore = useAuthStore();
  const token = authStore.accessToken ?? "";
  const connectionRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    console.log("PIPELINE HUB effect", {
      authed: authStore.isAuthenticated(),
      hasToken: !!token,
    });

    // 🔴 NOT AUTHENTICATED → DISCONNECT
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

    // ✅ event logs
    const events = ["Started", "Completed", "Failed", "Canceled", "Stopping"];
    for (const evt of events) {
      connection.on(evt, (msg) => console.log(`📩 ${evt}`, msg));
    }

    (async () => {
      try {
        await connection.start();
        console.log("✅ Pipeline hub connected", {
          state: HubConnectionState[connection.state],
          connectionId: connection.connectionId,
        });

        // IMPORTANT: if server uses groups, you must join.
        // See section (2) below.
        // await connection.invoke("JoinOrgGroup");
      } catch (err) {
        console.error("❌ Pipeline hub failed to connect", err);
      }
    })();

    connectionRef.current = connection;

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

    return () => {
      void connection.stop();
      connectionRef.current = null;
      console.log("✅ Pipeline hub disconnected");
    };
    // ✅ IMPORTANT: depend on values, not functions
  }, [token, authStore]);
}
