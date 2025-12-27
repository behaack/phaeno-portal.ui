// src/hooks/usePipelineJob.ts
import { useEffect, useState } from "react";
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { useAuthStore } from "@/stores/authStore";

export function usePipelineJob(jobId: string | null) {
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Auth token needed for SignalR
  const token = useAuthStore.getState().authToken?.token ?? null;

  useEffect(() => {
    if (!jobId) { return };

    // Build the connection
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:44349/pipelineHub", {
        accessTokenFactory: () => token ?? "",
      })
      .withAutomaticReconnect()
      .build();

    // Handlers
    const onUpdated = (msg: any) => {
      if (msg.jobId === jobId) {
        setJob(msg);
      }
    };

    const onCompleted = (msg: any) => {
      if (msg.jobId === jobId) {
        setJob(msg);
        setLoading(false);
      }
    };

    const onFailed = (msg: any) => {
      if (msg.jobId === jobId) {
        setJob(msg);
        setLoading(false);
      }
    };

    const onCanceled = (msg: any) => {
      if (msg.jobId === jobId) {
        setJob(msg);
        setLoading(false);
      }
    };

    // Register handlers
    connection.on("JobUpdated", onUpdated);
    connection.on("JobCompleted", onCompleted);
    connection.on("JobFailed", onFailed);
    connection.on("JobCanceled", onCanceled);

    // Start the connection
    connection
      .start()
      .catch((err) => console.error("SignalR connection failed:", err));

    return () => {
      // Cleanup
      if (connection.state === HubConnectionState.Connected) {
        connection.off("JobUpdated", onUpdated);
        connection.off("JobCompleted", onCompleted);
        connection.off("JobFailed", onFailed);
        connection.off("JobCanceled", onCanceled);
        connection.stop();
      }
    };
  }, [jobId, token]);

  return { job, loading };
}
