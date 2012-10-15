openid = require 'openid'
Post = require '../model/post'
config = require '../config'
relyingParty = new openid.RelyingParty config.OPENID_CALLBACK,
  null,
  false,
  false,
  [
    new openid.AttributeExchange
      "http://axschema.org/contact/email": "required"
  ]
module.exports = (app) ->
  app.get '/login', (req, res) ->
    relyingParty.authenticate config.OPENID_URL, false, (error, authUrl) ->
      console.log(error) if error
      res.redirect authUrl

  app.get '/verify', (req, res) ->
    relyingParty.verifyAssertion req, (error, result) ->
      console.log(error) if error
      console.log(result)
      if !error and result.authenticated and result.email of config.AUTHORS
        req.session.username = config.AUTHORS[result.email]
      res.redirect '/'

  app.get '/logout', (req, res) ->
    delete req.session.username
    res.redirect '/'

  app.get '/', (req, res) ->
    Post.find (err, posts) ->
      res.render 'index', posts: posts