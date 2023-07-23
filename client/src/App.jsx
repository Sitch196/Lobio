import io from "socket.io-client";
import Chat from "./Chat";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useState } from "react";
import Home from "./page/Home";
const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home socket={socket} />
              <Navigation />
            </>
          }
        />
        <Route path="/chat" element={<Chat socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
