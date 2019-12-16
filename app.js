"use strict";

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./server/routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

var players = [] // No players initially

const emitPlayers = socket => {
  socket.emit("players", players)
}

io.on("connection", socket => {
  console.log(`Client ${socket.id} connected`);
  players.push({id: socket.id, name: "", position: {x:50, y:50}})
  setInterval(() => emitPlayers(socket), 1000/60);
  socket.on("position", data => {
    for (var i = 0; i < players.length; i++){
      if (players[i].id == socket.id){
        players[i].position = data.position;
        players[i].name = data.name;
      }
    }
  })
  socket.on("disconnect", () => {
    players = players.filter( element => element.id !== socket.id )
    console.log(`Client ${socket.id} disconnected`);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));