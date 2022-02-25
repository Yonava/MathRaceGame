
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`user ${socket.id} is connected.`)

    socket.on('score', data => {
        socket.broadcast.emit('scoreRecieved', data)
    })

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} left.`)
    })
})

const port = process.env.PORT || 1010;

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`)
})