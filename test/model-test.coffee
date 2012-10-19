require 'should'
mongoose = require 'mongoose'
Post = require '../model/post'
describe 'Post.getTags', ->
  before (done) ->
    mongoose.connect 'localhost/test-test'
    Post.create tags: ['aaa', 'bbb', 'ccc'],
      tags: ['ddd', 'bbb']
      done

  after (done) ->
    Post.remove done

  it 'should be a function', ->
    Post.getTags.should.be.a 'function'

  it 'should contain the all the tags', (done)->
    Post.getTags (err, tags) ->
      tags.should.be.eql ['aaa', 'bbb', 'ccc' ,'ddd']
      done()