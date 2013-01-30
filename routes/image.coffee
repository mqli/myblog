fs = require 'fs'
module.exports = (app) ->

  app.get '/admin/image', (req, res) ->
    res.render 'admin/image-list', 
      images: fs.readdirSync('./public/gallery')

  app.get '/admin/image/new', (req, res) ->
    res.render 'admin/image-edit'

  app.post '/admin/image', (req, res) ->
    res.redirect '/admin/image'

  app.get '/admin/image/delete/:image', (req, res) ->
    fs.unlinkSync './public/gallery/' + req.param 'image' if req.param('image')
    res.redirect '/admin/image'