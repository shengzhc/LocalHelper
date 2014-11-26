var mongoose = require('mongoose');
var crypto = require('crypto');
var _cipher_encoding_decoding = 'utf8';
var _cipher_algorithm = 'aes-256-cbc';

var user_schema = mongoose.Schema({
	user_name :  String,
	password : String,
	seed : String,
	nick_name : String,
	email : {type: String, index: true},
	avatar : String,
	cellphone : String,
	address : {},
	signature : String,
	popularity : Number,
	comments : [{}],
	is_archived : {type:Boolean, default: false},
	create_date : {type: Date, default: Date.now}
}, {collection: 'users'});

user_schema.statics.findByEmail = function(email, callback) {
	this.findOne({email: email}, function(err, user) {
		if (err) return callback(err, null);
		if (user.is_archived) return callback(new Error('the account has been deactivated'), null);
		return callback(null, user);
	});
};

user_schema.methods.generateSecurePassword = function(userPassword, callback) {
	crypto.randomBytes(32, function(err, buf) {
		if (err) return callback(err, null);
		var seed = buf.toString(_cipher_encoding_decoding);
		var cipher = crypto.createCipher(_cipher_algorithm, userPassword);
		var securePassword = cipher.update(bufText, _cipher_encoding_decoding, _cipher_encoding_decoding) + cipher.final(_cipher_encoding_decoding);
		this.seed = seed;
		return callback(null, securePassword);
	});
};

user_schema.methods.verifyPassword = function(userPassword, callback) {
	var decipher = crypto.createDecipher(_cipher_algorithm, userPassword);
	var decrypted = decipher.update(this.password, _cipher_encoding_decoding, _cipher_encoding_decoding) + decipher.final(_cipher_encoding_decoding);
	return callback(null, this.seed === decrypted);
};

user_schema.methods.updateUserDetails = function(fields, callback) {
	if (fields.user_name && typeof fields.user_name !== "undefined") {
		this.user_name = fields.user_name;
	}

	if (fields.nick_name && typeof fields.nick_name !== "undefined") {
		this.nick_name = fields.nick_name;
	}

	if (fields.cellphone && typeof fields.cellphone !== "undefined") {
		this.cellphone = fields.cellphone;
	}

	if (fields.address && typeof fields.addess instanceof "Object") {
		this.address = fields.address;
	}

	if (fields.signature && typeof fields.isgnature !== "undefined") {
		this.signature = fields.signature;
	}

	this.save(function(err) {
		if (err) return callback(err, null);
		return callback(null, this);
	});
};

module.exports = user_schema;
