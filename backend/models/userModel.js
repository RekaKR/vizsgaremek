const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  googleId: {
    type: String,
    required: true,
    unique: true
  },

  role: {
    type: String,
    required: true,
  },

  picture: {
    type: String,
    required: true,
  },

  plusOne: {
    isComing: {
      type: Boolean,
      required: true,
    },

    name: String,
    foodSensitivity: String
  },

  foodSensitivity: String
})

module.exports = mongoose.model('User', userSchema)