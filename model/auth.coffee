exports.checkAuth = (resource, username) ->
	return username or resource.index