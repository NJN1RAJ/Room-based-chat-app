import { useEffect } from "react";
import "./App.css";
import ChatPage from "./pages/ChatPage";
import { BrowserRouter, Routes, Route } from "react-router";
import CreateRoom from "./pages/CreateRoom";

function App() {
  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateRoom />} />
        <Route path="/chat/:roomID" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
