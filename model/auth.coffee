crypto = require 'crypto'
exports.checkAuth = (resource, username) ->
	return true
	return !!username
exports.checkPassword = (username, password) ->
	return users[username] is crypto.createHash('md5').update(password).digest('hex')