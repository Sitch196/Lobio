const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://lobio.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.generatedId).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server Running on port 5000");
});
