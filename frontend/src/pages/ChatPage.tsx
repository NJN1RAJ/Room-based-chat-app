import { useEffect, useRef, useState } from "react";
import ChatBox from "../components/ChatBox";
import { useParams } from "react-router";
import { useWebSocket } from "../hooks/useWebSocket";

export default function ChatPage() {
  const params = useParams();

  const [messages, setMessages] = useState(["Greetings from Niraj"]);
  const wsRef = useWebSocket("ws://localhost:8080");
  const inputRef = useRef(null);

  useEffect(() => {
    const ws = wsRef.current;
    if (!ws) {
      console.log("WebSocket not ready yet");
      return;
    }
    //@ts-ignore
    ws.onopen = () => {
      console.log("Connection opened");
      //@ts-ignore
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: params.roomID,
          },
        })
      );
    };

    console.log("Setting onmessage on:", ws);
    //@ts-ignore
    ws.onmessage = (event) => {
      console.log("Received:", event.data);
      setMessages((prev) => [...prev, event.data]);
    };
  }, []);

  const handleClick = () => {
    //@ts-ignore
    wsRef.current?.send(
      JSON.stringify({
        type: "chat",
        payload: {
          //@ts-ignore
          message: `${inputRef.current?.value}`,
        },
      })
    );
  };

  return (
    <div className="bg-black w-screen h-screen text-white flex flex-col">
      <div className="p-2 text-center text-2xl text-slate-700 font-light">
        Room ID: {params.roomID}
      </div>
      {/* <div className="text-sm text-center text-slate-700 p-1">
        Users Count = 2
      </div> */}
      <div className="relative h-full border-2 border-white w-full flex flex-col items-center">
        <div className="absolute mt-8 bg-gray-900 h-[600px] lg:w-[1300px]">
          <div className="p-8 flex flex-col gap-2">
            {messages.map((message) => (
              <span className="w-fit bg-white text-black p-2">{message}</span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-6">
          <ChatBox handleClick={handleClick} reference={inputRef} />
        </div>
      </div>
    </div>
  );
}
