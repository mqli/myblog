express = require 'express' 
config = require './config' 
mongoose = require 'mongoose' 
fs = require 'fs' 
app = express()
Auth = require './model/auth'

mongoose.connect config.MONGO_HOST, config.MONGO_DB, config.MONGO_PORT

app.configure ->
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'jade'
  app.use express.logger 'dev'
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser 'bla bla'
  app.use express.session()
  app.use app.router
  app.use express.static __dirname + '/public'
  app.use (req, res, next) ->
    if req.ip is '127.0.0.1' or Auth.checkAuth req.path, req.session.username
      return next()
    res.redirect '/'

app.configure 'development', ->
  app.use express.errorHandler dumpExceptions: true, showStack: true

app.configure 'production', ->
  app.use express.errorHandler() 

fs.readdirSync(__dirname + '/routes').forEach (name)->
  if name.indexOf('.coffee') is name.length - 7
    require(__dirname + '/routes/' + name)(app) 

app.listen config.SERVER_PORT 

console.log "Express server listening for connections"