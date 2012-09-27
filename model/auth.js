var users = {
	'mqli' :'123456' 
}
exports.checkAuth = function (resource, username) {
  console.log(resource, username)
	if (resource && resource.indexOf('tools') < 0) {
		return true;
	}
	return !!username;
};
exports.checkPassword = function (username, password) {
	return users[username] == password;
}