const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    //unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  googleId: {
    type: String,
    //required: true
  },
  picture: String,
  plusOne: {
    isComing: Boolean,
    name: String,
    foodSensitivity: String
  },
  foodSensitivity: String
})

module.exports = mongoose.model('User', userSchema)