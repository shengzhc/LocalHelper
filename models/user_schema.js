var mongoose = require('mongoose');

var user_schema = mongoose.Schema({
	user_name :  String,
	password : String,
	seed : String,
	nick_name : String,
	email : String,
	avatar : String,
	cellphone : String,
	address : {},
	signature : String,
	popularity : Number,
	comments : [{}],
	is_archived : Boolean,
	create_date : {type: Date, default: Date.now}
});

user_schema.statics.findByEmail = function(email, callback) {
	this.findOne({email: email}, function(err, user) {
		if (err) return callback(err, null);
		if (user.is_archived) return callback(new Error('the account has been deactivated'), null);
		return callback(null, user);
	});
};

user_schema.methods.verifyPassword = function(userPassword, callback) {

};

user_schema.methods.generateSecurePassword = function(userPassword, callback) {

};

module.exports = user_schema;
