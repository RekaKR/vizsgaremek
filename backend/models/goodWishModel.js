const mongoose = require('mongoose')

const goodWishSchema = mongoose.Schema({
  goodWish: {
    type: String,
    required: true
  },

  from: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('GoodWish', goodWishSchema)
