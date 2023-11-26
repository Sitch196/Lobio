import io from "socket.io-client";
import Chat from "./Chat";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import NotFound from "./NotFound";
import Home from "./page/Home";
const socket = io.connect("https://lobio-ub5e.onrender.com/");

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
