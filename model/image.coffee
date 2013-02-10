mongoose = require 'mongoose'

Image = new mongoose.Schema
  name: String
  url: String
  isTrash: 
    type: Boolean
    default: false
  createTime: 
    type: Date
    default: Date.now

module.exports = mongoose.model 'Image', Image