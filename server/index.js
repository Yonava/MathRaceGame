
const express = require('express');
const http = require('http');
const { disconnect } = require('process');
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

    socket.on('score', (data, room) => {
        socket.to(room).emit('scoreRecieved', data)
    })
    
    socket.on('disconnectMsg', username => {
        console.log(`${username} left.`)
    })

    socket.on('disconnect', () => {
        console.log('Disconnect Successful.')
    })
    
    socket.on('joinRoom', room => {
        socket.join(room)
    })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 1010;

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`)
})