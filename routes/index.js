var Post = require('../model/post');
exports.index = function(req, res){
  Post.find({}, function (posts) {
    res.render('index', {posts: posts});
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
  post.insert(req.body.post, function () {
    post.findAll(function (posts) {
      res.render('index', {posts: posts});
    });
  });
};