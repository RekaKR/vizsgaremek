const mongoose = require('mongoose')

const guestListSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('GuestList', guestListSchema)