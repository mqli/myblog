mongoose = require 'mongoose'

Post = new mongoose.Schema
  title: String
  category: String
  tags: [String]
  isDraft: 
    type: Boolean
    default: true
  isTrash: 
    type: Boolean
    default: false
  createTime: 
    type: Date
    default: Date.now
  updateTime:
    type: Date
    default: Date.now
  content: String
Post.statics.getTags = (cb) ->
  this.find {}, {tags: 1}, (err, posts)->
    return cb(err) if err
    cb null, posts.reduce (tags, post)->
     tags.concat (tag for tag in post.tags when tag not in tags)
    , []

module.exports = mongoose.model 'Post', Post