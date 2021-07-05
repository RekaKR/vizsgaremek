const mongoose = require('mongoose');

const data = mongoose.Schema({
  name: String,
  article: String,
});

module.exports = mongoose.model('Data', data);
