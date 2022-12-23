const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: String,
  name: String,
  phone: String,
  email: String,
  address: String,
});

module.exports = mongoose.model('Card', cardSchema);
