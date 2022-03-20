const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    roomid: {
      type: String,
      required: true
    },
    questions: {
      type: Array,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    host: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      required: false
    }
    

});

module.exports = mongoose.model('Session', SessionSchema);

