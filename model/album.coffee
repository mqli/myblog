mongoose = require 'mongoose'
Image = require './image'
Album = new mongoose.Schema
  name: String
  images: [Image.schema]
module.exports = mongoose.model 'Album', Album