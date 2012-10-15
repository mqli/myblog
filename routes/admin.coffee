Post = require('../model/post')
module.exports = (app) ->
  
  app.get '/admin', (req, res) ->
    return res.render 'admin/index'

  app.get '/admin/posts', (req, res) ->
    Post.find (err, posts) ->
      res.render 'admin/post-list', posts: posts

  app.get '/admin/post/edit/:id', (req, res) ->
    Post.findById req.params.id, (err, post) ->
      res.render 'admin/post-edit', post: post

  app.post '/admin/post/edit/:id', (req, res) ->
    Post.findById req.params.id, (err, post) ->
      post.update req.body.post, (err, post) ->
        res.redirect '/admin/posts'

  app.get '/admin/post/new', (req, res) ->
    res.render 'admin/post-new'

  app.post '/admin/post/new', (req, res) ->
    new Post(req.body.post).save (err, post) ->
      res.redirect '/admin/posts'