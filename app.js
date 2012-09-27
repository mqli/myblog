/**
 * Module dependencies.
 */

var express = require('express'),
    config = require('./config'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    app = module.exports = express(),
    Auth = require('./model/auth');;

mongoose.connect(config.MONGO_HOST, config.MONGO_DB, config.MONGO_PORT);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('bla bla'));
  app.use(express.session()); 
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.all('*', function (req, res, next) {
    if (req.ip == '127.0.0.1') {
      return next();
    }
    if (Auth.checkAuth(req.path, req.session.username)) {
      return next();
    }
    res.redirect('/');
});

fs.readdirSync(__dirname + '/routes').forEach(function (name) {
  if (name.indexOf('.js') == name.length - 3)
    require(__dirname + '/routes/' + name)(app);
});

app.listen(config.SERVER_PORT);

console.log("Express server listening for connections");