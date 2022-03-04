
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const server = require('http').Server(app);
const io = module.exports.io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})


app.use(bodyParser.json());
app.use(cors());

const sessions = require('./api/sessions')
app.use('/api/sessions', sessions)

const PORT = process.env.PORT || 1010

io.on('connection', socket => {
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

mongoose.connect("mongodb+srv://math-race-user:mathpassword@cluster0.n5hn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", () => console.log('Connected'))

server.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`)
})