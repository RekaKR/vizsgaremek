const mongoose = require('mongoose');

const timelineSchema = mongoose.Schema({
  time: String,
  happening: String,
  place: String
});

module.exports = mongoose.model('Timeline', timelineSchema);
