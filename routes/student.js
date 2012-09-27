var Student = require('../model/student');

module.exports = function  (app) {
  app.post('/tools/student/save', function (req, res) {
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
  });
  app.get('/tools/student/remove/:id', function (req, res) {
    Student.findByIdAndRemove(req.params.id, function (err, student) {
      res.json(student);
    });
  });
};