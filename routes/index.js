var Post = require('../model/post'),
    Auth = require('../model/auth');
exports.index = function(req, res){
  Post.find({}, function (posts) {
    res.render('index', {posts: posts, username: req.session.username});
  });  
};
exports.post = function(req, res){
  Post.findById(req.params.id, function (posts) {
    res.render('post', {post: posts[0]});
  });  
};
exports.edit = function (req, res) {
  res.render('edit', {post : null});
};
exports.insert = function (req, res) {
  console.log(req.body.post);
  Post.insert(req.body.post, function () {
    Post.findAll(function (posts) {
      exports.index(req, res);
    });
  });
};
exports.auth = function (req, res, next) {
  if (Auth.checkAuth(req.originalUrl, req.session.username)) {
    return next();
  }
  exports.index(req, res);
};
exports.tools = function (req, res) {
  res.render('tools');
};

exports.login = function (req, res) {
  if (Auth.login(req.body.username, req.body.password)) {
    req.session.username = req.body.username;
  }
  exports.index(req, res);
};
exports.logout = function (req, res) {
  delete req.session.username;
  exports.index(req, res);
};