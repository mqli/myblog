var Bill = require('../model/bill');
module.exports = function (app) {
  app.get('/tools/bill', function (req, res) {  
    Bill.find(function (err, bills) {
      res.render('bill',{
        username: req.session.username,
        bills: bills
      });
    });
  });
  app.post('/tools/bill/add', function (req, res) {
    Bill.count({
      name: req.body.bill.name
    }, function (err, count) {
      if (count > 0) {
        return res.json({
          message: 'duplicate name ' + req.body.bill.name
        });
      }
      new Bill(req.body.bill).save(function (error, bill) {
        res.json({
          bill: bill
        });
      });
    });
  });

  app.get('/tools/bill/remove/:billId', function (req, res) {
    Bill.findById(req.params.billId, function (err, bill) {
      if (bill.students.length > 0) {
        return  res.json({
          message: 'can not delete'
        });
      }
      bill.remove(function (err) {
        res.json({
          bill: bill
        });
      });
    });
  });

  app.post('/tools/bill/student/add', function (req, res) {
    var student = req.body.student;
    Bill.findById(req.body.billId, function (err, bill) {
      bill.students.push(student);
      bill.save(function (err) {
        res.json(bill);
      });
    });
  });
  app.get('/tools/bill/:billId/student/remove/:sutdentId', function (req, res) {
    Bill.findById(req.params.billId, function (err, bill) {
      bill.students.id(req.params.sutdentId).remove(function (err, student) {
        bill.save(function () {
          res.json(bill);
        });
      });
    });
  })
};