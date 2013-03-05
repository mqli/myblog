mongoose = require 'mongoose'

Image = new mongoose.Schema
  name: String
  path: String
  createTime: 
    type: Date
    default: Date.now

module.exports = mongoose.model 'Image', Image