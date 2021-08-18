const mongoose = require('mongoose')

const accommodationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  address: {
    zip: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    houseNumber: {
      type: Number,
      required: true
    }
  },

  phoneNumber: {
    type: String,
    required: true
  },

  website: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Accommodation', accommodationSchema)