mongoose = require 'mongoose'
module.exports = mongoose.model 'Post', new mongoose.Schema
  title: String
  tags: [String]
  createTime: 
    type: Date
    default: Date.now
  content: String