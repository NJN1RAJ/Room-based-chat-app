import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useWebSocket } from "../hooks/useWebSocket";

export default function CreateRoom() {
  //@ts-ignore
  const roomRef = useRef();
  //@ts-ignore
  const wsRef = useWebSocket("ws://localhost:8080");
  const navigate = useNavigate();

  const randomRoomIdGenerator = (len: number) => {
    const str = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    let randStr = "";
    for (let i = 0; i < len; i++) {
      randStr += str[Math.floor(Math.random() * str.length)];
    }
    return randStr;
  };

  const handleCreateARoom = () => {
    let roomID = randomRoomIdGenerator(6);
    //@ts-ignore
    wsRef.current?.send(
      JSON.stringify({
        type: "join",
        payload: {
          roomId: `${roomID}`,
        },
      })
    );
    navigate(`/chat/${roomID}`);
  };

  const handleJoinARoom = () => {
    //@ts-ignore
    wsRef.current?.send(
      JSON.stringify({
        type: "join",
        payload: {
          //@ts-ignore
          roomId: `${roomRef.current?.value}`,
        },
      })
    );
    //@ts-ignore
    navigate(`/chat/${roomRef.current?.value}`);
  };

  return (
    <div className="bg-black h-screen w-screen flex justify-center items-center">
      <div className="w-[32rem] h-96 border-2  border-gray-600 flex flex-col items-center justify-center gap-6">
        <div className="text-center text-white text-2xl tracking-widest">
          SAMVAAD GROUP CHAT
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="bg-white w-[24rem] p-2 rounded-xl text-xl font-semibold cursor-pointer"
            onClick={handleCreateARoom}
          >
            Create a Room
          </button>
          <div className="text-white text-center">OR</div>
        </div>
        <div className="text-center flex flex-col gap-1.5">
          <input
            type="text"
            //@ts-ignore
            ref={roomRef}
            placeholder="Enter Room ID"
            className="text-white bg-slate-950 p-2 w-[24rem] rounded-xl border border-white"
          />
          <button
            className="bg-white w-[24rem] p-2 rounded-xl text-xl font-semibold cursor-pointer"
            onClick={handleJoinARoom}
          >
            Join a Room
          </button>
        </div>
      </div>
    </div>
  );
}
