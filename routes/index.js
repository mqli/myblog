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
  if (req.ip == '127.0.0.1') {
    return next();
  }
  if (Auth.checkAuth(req.path, req.session.username)) {
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
  var bills = []
  Hospital.find(function (err, hospitals) {
    Student.find(function (err, students) {
      hospitals.forEach(function (hospital) {
        hospital = hospital.toObject();
        hospital.students = [];
        hospital.total = 0;
        students.forEach(function (student) {
          if (student.hospital == hospital.name) {
             student = student.toObject()
             student.total = student.time * student.amount * hospital.price;
             hospital.students.push(student);
             hospital.total += student.total;
          }
        });
        bills.push(hospital);
      });
      res.render('hospital',{
        username: req.session.username,
        hospitals: hospitals,
        students: students,
        bills: bills
      });
      console.log(bills);
    });
  });
};
exports.hospitalSave = function (req, res) {
  Hospital.findOne({name: req.body.name}, function (err, hospital) {
    if (hospital) {
      return res.json({
        message: "Duplicate hospital name: " + hospital.name
      });
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
  Hospital.findById(req.params.id, function (err, hospital) {
    Student.count({
      hospital: hospital.name
    }, function (err, count) {
      if (count != 0) {
        return res.json({message: 'Cannot delete hospital ' + hospital.name});
      }
      hospital.remove(function (err) {
        console.log(arguments);
        res.json({
          success: true,
          hospital: hospital
        });
      });
    });
  });
};

exports.studentSave = function (req, res) {
  Student.findOne({
    className: req.body.className,
    hospital: req.body.hospital
  }, function (err, student) {
    new Student({
      className: req.body.className,
      amount: req.body.amount,
      time: req.body.time,
      hospital: req.body.hospital
    }).save(function (err, student) {
      res.json({
        success: true,
        student: student
      });
    });
  });
}

exports.studentRemove = function (req, res) {
  Student.findByIdAndRemove(req.params.id, function (err, student) {
    res.json(student);
  });
};