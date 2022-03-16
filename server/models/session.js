const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    roomid: {
        type: String,
        required: true,
        default: '0000'
    },
    questions: {
        type: Array,
        required: true,
        default: ''
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('Session', SessionSchema)

