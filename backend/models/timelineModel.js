const mongoose = require('mongoose');

const timelineSchema = mongoose.Schema({
  time: {
    type: String,
    required: true
  },
  happening: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Timeline', timelineSchema);
