var Hospital = require('../model/hospital'),
    Student = require('../model/student');
module.exports= function (app) {
  app.post('/tools/hospital/save', function (req, res) {
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
  });
  app.get('/tools/hospital/remove/:id', function (req, res) {
    Hospital.findById(req.params.id, function (err, hospital) {
      Student.count({
        hospital: hospital.name
      }, function (err, count) {
        if (count != 0) {
          return res.json({message: 'Cannot delete hospital ' + hospital.name});
        }
        hospital.remove(function (err) {
          res.json({
            success: true,
            hospital: hospital
          });
        });
      });
    });
  });
};
