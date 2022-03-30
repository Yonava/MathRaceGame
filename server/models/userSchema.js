const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    accessLevel: {
      type: String,
      required: true
    }

});

UserSchema.pre('save', async function (next) {

  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }

});

module.exports = conn.model('UserBase', UserSchema);