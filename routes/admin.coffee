Post = require('../model/post')
Category = require('../model/category')
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
    Post.findById req.param('id') , (err, post) ->
      return res.send(404) if not post
      tags = req.body.post.tags.trim() or ''
      post.tags = tags.split /\s+/ or []
      post.updateTime = Date.now();
      post.save (err, post) ->
        res.redirect '/admin/posts'

  app.get '/admin/post/remove/:id', (req, res) ->
    Post.findById req.params.id, (err, post) ->
      post.remove (err, post) ->
        res.redirect '/admin/posts'

  app.get '/admin/post/new', (req, res) ->
    Category.find (err, categories) ->
      res.render 'admin/post-new', categories: categories

  app.post '/admin/post/new', (req, res) ->
    post = new Post(req.body.post)
    tags = req.body.post.tags.trim() or ''
    post.tags = tags.split /\s+/ or []
    post.save (err, post) ->
      res.redirect '/admin/posts'

  app.get '/admin/categories', (req, res) ->
    Category.find (err, categories) ->
      res.render 'admin/categories-list', categories: categories

  app.post '/admin/categories', (req, res) ->
    Category.create req.body.category, (err, category) ->
      req.app.locals.categories.push category
      res.render 'admin/categories-list'
      
  app.get '/admin/categories/remove/:id', (req, res) ->
    Category.findById req.param('id'), (err, category) ->
      return res.send(404) if not category
      Post.count category: category.name, (err, count)->
        if count == 0 then return category.remove (err, category) ->
          req.app.locals.categories = req.app.locals.categories.filter (category)->
            return category._id.toString() != req.param('id')
          res.render 'admin/categories-list'
        res.render 'admin/categories-list'