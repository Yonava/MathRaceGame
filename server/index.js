
let express = require('express');
let app = express();
let server = app.listen(1010);
let io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})



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