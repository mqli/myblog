var config = require("../config"), mongoose = require('mongoose');
module.exports = mongoose.model('Student',  new mongoose.Schema({
  className: String,
  amount: Number,
  time: Number,
  hospita: String
}));
