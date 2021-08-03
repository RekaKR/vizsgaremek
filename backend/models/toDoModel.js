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
  done: Boolean
  //default érték false
})

module.exports = mongoose.model('ToDo', toDoSchema)
