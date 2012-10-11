crypto = require 'crypto'
users = 'mqli': '1545c320ef47904a86980f669fc2638a' 
exports.checkAuth = (resource, username) ->
	return true
	return !!username
exports.checkPassword = (username, password) ->
	return users[username] is crypto.createHash('md5').update(password).digest('hex')