/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = module.exports = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.get('/', routes.index);

http.createServer(app).listen(process.env.PORT || 8001);

console.log("Express server listening for connections");