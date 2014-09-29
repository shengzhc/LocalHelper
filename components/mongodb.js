var mongoose = require('mongoose');
var mongodb = new Object();

function registerSchemas(db) {
	var schemas = require('../models');
	for (var key in schemas) {
		if (schemas.hasOwnProperty(key)) {
			db.model(key, schemas[key]);
		}
	}
};

mongodb.connect = function(callback) {
	var connection = mongoose.createConnection('localhost', 'localhelper', 27017);
	connection.on('error', function(err) {
		global.logger.error(err.toString());
		callback(err, null);
	}).on('connected', function() {
		global.db = connection;
		registerSchemas(connection);
		global.logger.info('Database Connected.');
		callback(null, connection);
	}).on('disconnected', function() {
		global.logger.info('Database disconnected');
	});
};

module.exports = mongodb;

