openid = require 'openid'
config = require '../config'
Post = require '../model/post'

relyingParty = new openid.RelyingParty config.OPEN_ID_VERIFY,
  null, false, false, []
module.exports = (app) ->
  app.get '/login', (req, res) ->
    relyingParty.authenticate config.OPEN_ID_PROVIDER, false, (error, authUrl) ->
      res.redirect authUrl
      
  app.get '/verify', (req, res) ->
    relyingParty.verifyAssertion req, (error, result) ->
      if result.authenticated and result.claimedIdentifier in config.CLAIMED_IDS
        req.session.username = "mqli" 
      res.redirect '/'

  app.get '/logout', (req, res) ->
    delete req.session.username
    res.redirect '/'

  app.get '/', (req, res) ->
    Post.find (err, posts) ->
      res.render 'index', 
        username: req.session.username
        posts: posts