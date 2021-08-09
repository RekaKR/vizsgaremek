const mongoose = require('mongoose')

const toDoSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  task: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('ToDo', toDoSchema)
