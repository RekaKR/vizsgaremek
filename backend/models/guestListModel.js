const mongoose = require('mongoose')

const guestListSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('GuestList', guestListSchema)