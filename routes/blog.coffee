Blog = require '../model/blog'
module.exports = (app) ->
  app.get '/blog', (req, res) ->
    Blog.find (err, blogs=[]) ->
      res.render 'blog', blogs: blogs
  app.get '/blog/new', (req, res) ->
    res.render 'blog-new', username: req.session.username