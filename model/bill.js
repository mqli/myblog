var config = require("../config"),
    mongoose = require('mongoose');
var Bill = module.exports = mongoose.model('Bill',  new mongoose.Schema({
    name : String,
    price : Number,
    students: [{
      name: String,
      amount: Number,
      time: Number
    }]
}));