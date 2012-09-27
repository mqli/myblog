var Auth = require('../model/auth');

module.exports = function (app) {
  app.post('/login', function (req, res) {
    if (Auth.checkPassword(req.body.username, req.body.password)) {
      req.session.username = req.body.username;
    }
    res.redirect('/');
  });

  app.get('/logout', function (req, res) {
    delete req.session.username;
    res.redirect('/');
  });

  app.get('/', function (req, res) {
    res.render('index', {username: req.session.username});
  });
};
