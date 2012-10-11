mongoose = require 'mongoose'
module.exports = mongoose.model 'Blog', new mongoose.Schema
  title: String
  tags: [String]
  createTime: Date
  content: String
