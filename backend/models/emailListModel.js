const mongoose = require('mongoose')

const emailListSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('EmailList', emailListSchema)