const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  const userId = socket.handshake?.query?.userId;

  if (userId) {
    onlineUsers[userId] = socket.id;
  }

  io.emit("onlineStatus", Object.keys(onlineUsers));
  console.log(Object.keys(onlineUsers));
  

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete onlineUsers[userId];
    io.emit("onlineStatus", Object.keys(onlineUsers));
  });
});

module.exports = { io, app, server };
