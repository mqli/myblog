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
      post.updateTime = Date.now();
      post.update req.body.post, (err, post) ->
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
    #post.tags = if req.body.post.tags then req.body.post.tags.split ',' else []
    post.save (err, post) ->
      res.redirect '/admin/posts'

  app.get '/admin/categories', (req, res) ->
    Category.find (err, categories) ->
      res.render 'admin/categories-list', categories: categories

  app.post '/admin/categories', (req, res) ->
    Category.create req.body.category, (err, category) ->
      req.app.get('_').categories.push category
      res.render 'admin/categories-list'
      
  app.get '/admin/categories/remove/:id', (req, res) ->
    Category.findById req.param('id'), (err, category) ->
      return res.send(404) if not category
      Post.count category: category.name, (err, count)->
        if count == 0 then return category.remove (err, category) ->
          req.app.get('_').categories = req.app.get('_').categories.filter (category)->
            return category._id.toString() != req.param('id')
          res.render 'admin/categories-list'
        res.render 'admin/categories-list'