openid = require 'openid'
config = require '../config'
relyingParty = new openid.RelyingParty 'http://' + config.SERVER_HOST + '/verify', null, false, false, []
module.exports = (app) ->
  app.get '/login', (req, res) ->
    relyingParty.authenticate 'http://www.google.com/accounts/o8/id', false, (error, authUrl) ->
      console.log(error) if error
      res.redirect authUrl
  app.get '/verify', (req, res) ->
    relyingParty.verifyAssertion req, (error, result) ->
      console.log(result)
      req.session.username = "mqli" if !error && result.authenticated 
      res.redirect '/'
  app.get '/logout', (req, res) ->
    delete req.session.username
    res.redirect '/'
  app.get '/', (req, res) ->
    res.render 'index', username: req.session.username
