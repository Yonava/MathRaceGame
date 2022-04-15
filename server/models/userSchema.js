const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb+srv://math-race-users:userData@math-race-users.awkeu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const UserSchema = mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    gameData: {
      type: Array,
      required: true,
      default: []
    },
    accountCreationDate: {
      type: Date,
      required: true,
      default: Date.now()
    },
    lastLogin: {
      type: Date,
      required: true,
      default: Date.now()
    },
    pfp: {
      type: String,
      required: false
    },
    accessLevel: {
      type: String,
      required: true,
      default: 'user'
    }

});

module.exports = conn.model('UserBase', UserSchema);