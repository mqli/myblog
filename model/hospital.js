var config = require("../config"), mongoose = require('mongoose');
module.exports = mongoose.model('Hospital',  new mongoose.Schema({
    name : String,
    price : Number
}));
