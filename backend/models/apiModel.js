const mongoose = require('mongoose');

const apiSchema = mongoose.Schema({
  name: String,
  article: String,
});

module.exports = mongoose.model('Api', apiSchema);
