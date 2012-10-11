Auth = require '../model/auth'

module.exports = (app) ->
  app.post '/login', (req, res) ->
    if Auth.checkPassword req.body.username, req.body.password
      req.session.username = req.body.username
    res.redirect '/'

  app.get '/logout', (req, res) ->
    delete req.session.username
    res.redirect '/'

  app.get '/', (req, res) ->
    res.render 'index', username: req.session.username
