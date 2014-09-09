var mongoose = require('mongoose');
var mongodb = new Object();
mongodb.connect = function(callback) {
	var connection = mongoose.createConnection('localhost', 'localhelper', 27017);
	connection.on('error', function(err) {
		global.logger.error(err.toString());
		callback(err, null);
	}).on('connected', function() {
		global.logger.info('Database Connected.');
		callback(null, connection);
	}).on('disconnected', function() {
		global.logger.info('Database disconnected');
	});
};

module.exports = mongodb;

