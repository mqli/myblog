var Hospital = require('../model/hospital'),
    Student = require('../model/student');
var getBill = function (hospital, students) {
  var bill = {
    name: hospital.name,
    price: hospital.price,
    students: [],
    total: 0
  };
  students.forEach(function (student) {
    if (student.hospital != hospital.name) return;
    student = student.toObject();
    student.total = student.time * student.amount * hospital.price;
    bill.students.push(student);
    bill.total += student.total;
  });
  return bill;
};
module.exports = function (app) {
  app.get('/tools/bill', function (req, res) {  
    var bills = [];
    Hospital.find(function (err, hospitals) {
      Student.find(function (err, students) {
        hospitals.forEach(function (hospital) {
          bills.push(getBill(hospital, students));
        });
        res.render('bill',{
          username: req.session.username,
          hospitals: hospitals,
          students: students,
          bills: bills
        });
      });
    });
  });
  app.get('/tools/bill.ajax', function (req, res) {  
    var bills = [];
    Hospital.find(function (err, hospitals) {
      Student.find(function (err, students) {
        hospitals.forEach(function (hospital) {
          bills.push(getBill(hospital, students));
        });
        res.json({
          bills: bills
        });
      });
    });
  });
};