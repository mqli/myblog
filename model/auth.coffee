crypto = require 'crypto'
exports.checkAuth = (resource, username) ->
  console.log(resource)
  resource.indexOf('admin') < 0 or username

exports.checkPassword = (username, password) ->
	users[username] is crypto.createHash('md5').update(password).digest('hex')