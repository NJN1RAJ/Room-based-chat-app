import { useEffect, useRef } from "react";

export const useWebSocket = (url: string) => {
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    //@ts-ignore
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connection opened");
    };
    ws.onclose = () => {
      console.log("Connection closed");
    };
  }, [url]);

  return wsRef;
};
