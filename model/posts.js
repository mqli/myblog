var MONGO_DB_PATH = 'localhost',
	PORT = 27017,
    mongodb = require('mongodb'),
	mongoserver = new mongodb.Server(MONGO_DB_PATH, PORT),
    connecter = new mongodb.Db('blog', mongoserver);
function _error(error) {
    if (error)
        throw new Error(error);
}
connecter.open(function (error, blog){
    _error(error);
    blog.collection('posts', function (error, posts) {
        _error(error);
        exports.findAll = function (fn) {
            posts.find().toArray(function (error, list) {
                _error(error);
                fn(list);
            });
        };
        exports.insert = function (post, fn) {
            posts.insert(post, function(error, obj){
                _error(error);
                fn && fn(obj);
            });    
        };
    });
});

    