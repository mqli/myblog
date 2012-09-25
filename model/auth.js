var users = {
	'mqli' :'aaaaaa' 
}
exports.checkAuth = function (resource, username) {
	if (resource != '/tools') {
		return true;
	}
	return !!username;
};
exports.login = function (username, password) {
	return users[username] == password;
}