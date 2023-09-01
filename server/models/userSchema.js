const mongoose = require('mongoose');

const { MONGO_USERS_URI } = process.env;
const conn = mongoose.createConnection(MONGO_USERS_URI);

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