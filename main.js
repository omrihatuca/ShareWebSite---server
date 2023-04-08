const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');


const server = http.createServer(app);

const port = 8000;

const io = new Server(server , {
    cors : {
        origin : "http://localhost:3000",
        methods : ["GET" , "POST"],

    },
})

io.on("connection", (socket) =>
{
    console.log(`user connected : ${socket.id}`);

socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with id: ${socket.id} joind room ${data}`)
   
})

socket.on("send_message", (data1) =>
{
     socket.to(data1.roomname).emit("recive_message", data1)
    console.log(data1)
})


socket.on("disconnect" , () =>
{
    console.log("user disconnected" , socket.id)
})

})


server.listen(port, ()=>{
    console.log(`app is listening at: http://localhost:${port}`)
})