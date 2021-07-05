const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  name: String,
  article: String,
});

module.exports = mongoose.model('Data', dataSchema);
