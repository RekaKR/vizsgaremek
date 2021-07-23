const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    //    required: true,
    //    unique: true
  },
  googleId: {
    type: String
  },
  role: String,
  picture: String,
  plusOne: {
    isComing: Boolean,
    name: String,
    foodSensitivity: String
  },
  foodSensitivity: String
})

module.exports = mongoose.model('User', userSchema)