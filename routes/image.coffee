fs = require 'fs'
path = require 'path'
Image = require '../model/image'
module.exports = (app) ->

  app.get '/admin/image', (req, res) ->
    Image.find (err, images)->
      res.render 'admin/image-list', 
        images: images

  app.post '/admin/image', (req, res) ->
    new Image
      name: req.files.image.filename
      path: req.files.image.path.split(path.sep)[2]
    .save (err, image)->
      res.redirect '/admin/image'

  app.get '/admin/image/delete/:id', (req, res) ->
    Image.findById req.param('id'), (err, image) ->
      return res.send 404 if not image
      if fs.existsSync './public/gallery/' + image.path 
         fs.unlinkSync './public/gallery/' + image.path
      image.remove ->
        res.redirect '/admin/image'