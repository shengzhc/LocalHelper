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

module.exports = user_schema;