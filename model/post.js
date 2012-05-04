var config = require("../config"),
		mongodb = require('mongodb') ,
    connector = new mongodb.Db('blog', new mongodb.Server(config.MONGO_HOST, config.MONGO_PORT));
connector.open(function (error, db) {
	exports.find = function (param, fn) {
		if (error) console.log(error);
		db.collection('posts', function (error, post) {
			post.find(param, function (error, posts) {
				if (error) console.log(error);
				posts.toArray(function (error, list) {
					fn(list);
				});
			});
		});
	};
	exports.findById = function (id ,fn) {
		exports.find({_id: new mongodb.ObjectID (id)}, fn);
	};
});