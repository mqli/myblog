Post = require '../model/post'

module.exports = (app) ->
  app.get '/post/:id', (req, res) ->
    Post.findById req.params.id, (err, post) ->
      res.render 'post', post: post