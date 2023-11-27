import io from "socket.io-client";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import NotFound from "./NotFound";
import { useEffect } from "react";
import Home from "./page/Home";
const socket = io.connect("https://lobio-ub5e.onrender.com/");

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("username") && localStorage.getItem("generatedId");

    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);
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
