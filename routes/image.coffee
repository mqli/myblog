fs = require 'fs'
path = require 'path'
Image = require '../model/image'
module.exports = (app) ->

  app.get '/admin/image', (req, res) ->
    Image.find (err, images)->
      images.map (image)->
        image.path = '/gallery/' + image.path
      res.render 'admin/image-list', 
        images: images

  app.get '/admin/image/new', (req, res) ->
    res.render 'admin/image-edit'

  app.post '/admin/image', (req, res) ->
    new Image
      name: req.files.image.filename
      path: req.files.image.path.split(path.sep)[2]
    .save (err, image)->
      res.redirect '/admin/image'

  app.get '/admin/image/delete/:id', (req, res) ->
    Image.findById req.param('id'), (err, image) ->
      console.log image
      return res.send 404 if not image
      fs.unlinkSync './public/gallery/' + image.path
      image.remove ->
        res.redirect '/admin/image'