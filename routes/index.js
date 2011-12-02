
/*
 * GET home page.
 */
var posts = require('../model/posts');
exports.index = function(req, res){
  posts.findAll(function(posts){
    res.render('index', { title: 'BlueJukebox',posts: posts });
  });
};