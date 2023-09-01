const mongoose = require('mongoose');

const { MONGO_SESSIONS_URI } = process.env;
const conn = mongoose.createConnection(MONGO_SESSIONS_URI);

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
  },
  hasBegun: {
    type: Boolean,
    required: true,
    default: false
  },
  finalPositions: {
    type: Array,
    required: true,
    default: []
  }


});


module.exports = conn.model('Session', SessionSchema);
