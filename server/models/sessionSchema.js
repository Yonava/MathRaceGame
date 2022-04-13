const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb+srv://math-race-user:mathpassword@cluster0.n5hn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

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
  }
    

});


module.exports = conn.model('Session', SessionSchema);

