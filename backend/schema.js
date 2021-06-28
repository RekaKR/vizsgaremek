const mongoose = require('mongoose');

const data = new mongoose.Schema({
  date: String,
  articles: String,
});

module.exports = mongoose.model('Data', data);
