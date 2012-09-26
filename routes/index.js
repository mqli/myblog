var Post = require('../model/post'),
    Auth = require('../model/auth');
    Hospital = require('../model/hospital'),
    Student = require('../model/student');
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
    res.redirect('/');
  });
};
exports.auth = function (req, res, next) {
  if (Auth.checkAuth(req.originalUrl, req.session.username)) {
    return next();
  }
  res.redirect('/');
};
exports.tools = function (req, res) {
  res.render('tools', {username: req.session.username});
};

exports.login = function (req, res) {
  if (Auth.checkPassword(req.body.username, req.body.password)) {
    req.session.username = req.body.username;
  }
  res.redirect('/');
};
exports.logout = function (req, res) {
  delete req.session.username;
  res.redirect('/');
};

exports.hospitals = function (req, res) {
  Hospital.find(function (err, hospitals) {
    console.log(hospitals);
    res.render('hospital', {username: req.session.username,hospitals: hospitals});
  });
};
exports.hospitalSave = function (req, res) {
  Hospital.findOne({name: req.body.name}, function (err, hospital) {
    if (hospital) {
      return res.json({hospital:hospital});
    }
    new Hospital({
      name: req.body.name,
      price: req.body.price
    }).save(function (err, hospital) {
      res.json({
        success: true,
        hospital: hospital
      });
    });
  });
};
exports.hospitalRemove = function (req, res) {
  Hospital.findByIdAndRemove(req.params.id, function (err, hospital) {
    res.json(hospital);
  });
};