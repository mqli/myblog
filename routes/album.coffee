Album = require '../model/album'
Image = require '../model/image'

module.exports = (app) ->
  app.get '/admin/album', (req, res) ->
    Album.find (err, albums)->
      req.app.locals.albums = albums
      res.render 'admin/album-list'

  app.post '/admin/album', (req, res) ->
    new Album(req.param 'album').save (err, album) ->
      req.app.locals.albums.push album
      res.redirect 'admin/album'

  app.get '/admin/album/:id/image/add/:image', (req, res) ->
    Album.findById req.param('id'), (err, album) ->
      return res.send 404 if not album
      return res.redirect 'admin/album/edit/' + album._id if album.images.id(req.param 'image')
      Image.findById req.param('image'), (err, image) ->
        album.images.push image
        album.save (err, album) ->
          res.redirect 'admin/album/edit/' + album._id

  app.get '/admin/album/:id/image/remove/:image', (req, res) ->
    Album.findById req.param('id'), (err, album) ->
      return res.send 404 if not album
      album.images.id(req.param 'image').remove()
      album.save (err, album) ->
        res.redirect 'admin/album/edit/' + album._id

  app.get '/admin/album/edit/:id', (req, res) ->
    Album.findById req.param('id'), (err, album) ->
      return res.send 404 if not album
      Image.find (err, images)->
        res.render 'admin/album-edit',
          album: album
          images: images

  app.get '/admin/album/remove/:id', (req, res) ->
    Album.findById req.param('id'), (err, album) ->
      return res.send 404 if not album
      album.remove ->
        res.redirect 'admin/album'

  app.get '/album', (req, res) ->
    Album.find (err, albums) ->
      res.render 'album', albums: albums