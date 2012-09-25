/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    config = require('./config');

var app = module.exports = express();

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

app.all('*', routes.auth);

app.get('/post/edit', routes.edit);
app.get('/post/:id', routes.post);
app.post('/post/insert', routes.insert);

app.get('/tools', routes.tools);

app.post('/login', routes.login);
app.get('/logout', routes.logout);

app.get('/', routes.index);
app.listen(config.SERVER_PORT);

console.log("Express server listening for connections");