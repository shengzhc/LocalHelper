var mongoose = require('mongoose');

var ticket_schema = mongoose.Schema({
	create_by : mongoose.Schema.Types.ObjectId,
	create_date : {type: Date, default: Date.now},
	update_date : Date,
	detail : {start_time: Date, end_time: Date, location: String, description: String},
	category : [String],
	comments : [{}],
	requests : [{user_id: mongoose.Schema.Types.ObjectId, request_date: Date, message: String}]
});

ticket_schema.methods.test = function() {
	global.logger.info('this is a ticket schema test');
}

module.exports = ticket_schema;
