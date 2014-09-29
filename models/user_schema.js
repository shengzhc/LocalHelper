var mongoose = require('mongoose');

var user_schema = mongoose.Schema({
	user_name :  String,
	password : String,
	nick_name : String,
	email : String,
	avatar : String,
	cellphone : String,
	address : {},
	signature : String,
	popularity : Number,
	comments : [{}],
	create_date : {type: Date, default: Date.now}
});

user_schema.methods.test = function() {
	global.logger.info('this is a user schema test');
}

module.exports = user_schema;