Post = require '../model/post'

module.exports = (app) ->
  app.get '/post/:id', (req, res) ->
    Post.findById req.params.id, (err, post) ->
      res.render 'post', post: post
      
  app.get '/tag/:tag', (req, res) ->
    Post.find tags: req.params.tag, (err, posts) ->
      res.render 'index', posts: posts