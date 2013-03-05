mongoose = require 'mongoose'

Category = new mongoose.Schema
  name: String
  posts: [mongoose.model('Post')]
  
module.exports = mongoose.model 'Category', Category