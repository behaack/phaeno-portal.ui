// import { useEffect, useRef } from "react";
// //import { useAnalyticsStore } from '@/stores/analyticsStore';
// import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
// //import { useAuthStore } from "@/stores/authStore";
// import { constants } from '@/assets/constants';
// import { refreshAuthToken } from "@/assets/utils/refreshAuthToken";
// import { useNavigate } from "@tanstack/react-router";
// import { Route as SignInRoute } from "@/routes/auth/signin"
// import { isTokenExpiredSoon } from "@/assets/utils/isTokenExpiredSoon";

// export function usePipelineHub() {
//   // const token = useAuthStore((s) => s.authToken?.token ?? "");
//   // const authStore = useAuthStore();
//   // const analyticsStore = useAnalyticsStore();
//   // const navigate = useNavigate();

//   // const BASE_URL = import.meta.env.DEV
//   //   ? constants.DEV_URL
//   //   : constants.PROD_URL;

//   // const connectionRef = useRef<HubConnection | null>(null);

//   // useEffect(() => {
//   //   // 🔴 NOT AUTHENTICATED → DISCONNECT
//   //   if (!authStore.isAuthenticated || !token) {
//   //     if (connectionRef.current) {
//   //       connectionRef.current.stop();
//   //       connectionRef.current = null;
//   //     }
//   //     return;
//   //   }

//   //   // 🟢 ALREADY CONNECTED → DO NOTHING
//   //   if (connectionRef.current) {
//   //     return;
//   //   }

//   //   // 🟢 CREATE CONNECTION
//   //   const connection = new HubConnectionBuilder()
//   //     .withUrl(`${BASE_URL}pipelineHub`, {
//   //       accessTokenFactory: async () => {
//   //         try {
//   //           const auth = authStore.authToken;
//   //           if (auth && !isTokenExpiredSoon(auth.token)) {
//   //             return auth.token;
//   //           }

//   //           return await refreshAuthToken();
//   //         } catch {
//   //           authStore.logout();
//   //           return "";
//   //         }
//   //       },
//   //     })
//   //     .withAutomaticReconnect()
//   //     .build();

//   //   connection.on("Started", (msg) =>
//   //     analyticsStore.updateJobStatus(msg.pipelineRun)
//   //   );

//   //   connection.on("Completed", (msg) => 
//   //     analyticsStore.updateJobStatus(msg.pipelineRun)
//   //   );

//   //   connection.on("Failed", (msg) =>
//   //     analyticsStore.updateJobStatus(msg.pipelineRun)
//   //   );

//   //   connection.on("Canceled", (msg) =>
//   //     analyticsStore.updateJobStatus(msg.pipelineRun)
//   //   );

//   //   connection.on("Stopping", (msg) =>
//   //     analyticsStore.cancelJob(msg.pipelineRun)
//   //   );    

//   //   connection.start().then(() => {
//   //     console.log("✅ %cPipeline hub connected", "color: dodgerblue");
//   //   });

//   //   connectionRef.current = connection;

//   //   // 🧹 CLEANUP ON UNMOUNT
//   //   return () => {
//   //     connection.stop();
//   //     connectionRef.current = null;
//   //     console.log("✅ %cPipeline hub disconnected", "color: dodgerblue");
//   //   };
//   // }, [authStore.isAuthenticated, token]);
// }
