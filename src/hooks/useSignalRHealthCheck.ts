import { useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useAuthStore } from "@/stores/authStore";
import { constants } from '@/assets/constants';

export function useSignalRHealthCheck() {  
  const BASE_URL = import.meta.env.DEV ? constants.DEV_URL : constants.PROD_URL;
  const token = useAuthStore().authToken?.token ?? ""

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${BASE_URL}healthHub`, {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();
    
      connection.on("Pong", (msg) => {
      console.log("%c[SignalR Pong]", "color: #4CAF50; font-weight: bold;", msg);
    });

    connection.start()
      .then(() => {
        console.log("%c[SignalR Health] Connected!", "color: dodgerblue");
        connection.invoke("Ping", "Hello from browser");
      })
      .catch(err => console.error("[SignalR Health] Connection failed", err));
      
    return () => {
      void connection.stop();
    };
    }, [])
}
