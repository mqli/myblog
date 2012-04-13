//var post = require('../model/post')

exports.index = function(req, res){
  //post.findAll(function (posts) {
    res.render('index', {posts: []});
  //});  
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