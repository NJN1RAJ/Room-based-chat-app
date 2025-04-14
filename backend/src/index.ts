import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  //message schema
  // {
  //   "type":"join/chat",
  //   "payload":{
  //     "roomId":"123",
  //     "message":"hi there"
  //   }
  // }

  socket.on("message", (message) => {
    //@ts-ignore
    const parsedMessage = JSON.parse(message); // parsing into JSON since the message will be passed in string format from the frontend

    if (parsedMessage.type === "join") {
      console.log("User Joined");

      // is type of message is to join a room
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    if (parsedMessage.type === "chat") {
      console.log("User messaged");

      // let currentUserRoom = allSockets.find(x => x.socket === socket)?.room
      //finding the roomId of the current user/socket that sent the message which will help in forwarding the message to users in same room
      //another way
      let currentUserRoom = null;
      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i].socket === socket) {
          currentUserRoom = allSockets[i].room;
        }
      }

      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i].room === currentUserRoom) {
          allSockets[i].socket.send(parsedMessage.payload.message);
        }
      }
    }
  });
});

//code just to broadcast the message from the server to every user(socket)

// let allSockets : WebSocket[] = []
// let userCount = 0
// allSockets.push(socket);
// userCount = userCount + 1;
// console.log("User connected #" + userCount);

//ws.on("connection",(socket)=>{
//  socket.on("message", (event) => {
//     for (let i = 0; i < allSockets.length; i++) {
//       const s = allSockets[i];
//       s.send(event.toString() + ":recieved from server");
//     }
//     socket.on("disconnect",()=>{
//       allSockets = allSockets.filter(x => x!=socket)
//     })
//});
