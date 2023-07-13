import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      joinRoom();
    }
  };

  const isButtonDisabled = username === "" || room === "";

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            !showChat ? (
              <div className="joinChatContainer">
                <h3>Join A Chat</h3>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                />
                <input
                  type="text"
                  placeholder="Room ID"
                  value={room}
                  onChange={(e) => {
                    setRoom(e.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={joinRoom} disabled={isButtonDisabled}>
                  Join a Room
                </button>
              </div>
            ) : (
              <Chat socket={socket} username={username} room={room} />
            )
          }
        />
        <Route
          path="/chat"
          element={<Chat socket={socket} username={username} room={room} />}
        />
      </Routes>
    </div>
  );
}

export default App;
