const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: { 
    type: String,
    required: true 
  },
  password: {
    type: String,
    require: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
