openid = require 'openid'
config = require '../config'
relyingParty = new openid.RelyingParty 'http://' + config.SERVER_HOST+':' + config.SERVER_PORT + '/verify',
  null, false, false, []
module.exports = (app) ->
  app.get '/login', (req, res) ->
    relyingParty.authenticate 'https://www.google.com/accounts/o8/id?id=AItOawk5CBQlVd8Bgsmm6YAVj_T3syDbxqF5Z9s', false, (error, authUrl) ->
      res.redirect authUrl
  app.get '/verify', (req, res) ->
    relyingParty.verifyAssertion req, (error, result) ->
      if result.authenticated and result.claimedIdentifier == 'https://www.google.com/accounts/o8/id?id=AItOawk5CBQlVd8Bgsmm6YAVj_T3syDbxqF5Z9s'
        req.session.username = "mqli" 
      res.redirect '/'
  app.get '/logout', (req, res) ->
    delete req.session.username
    res.redirect '/'
  app.get '/', (req, res) ->
    res.render 'index', username: req.session.username
