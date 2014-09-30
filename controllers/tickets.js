var TicketModel = global.db.model('TicketModel');
var async = require('async');
/**
 * Post Ticket create
 *
 * @param req
 * @param res
 * @param next
 */
exports.create = function(req, res, next) {
	var ticket = new TicketModel({
		summary: req.body.summary,
		status: 'open',
		category: req.body.category,
		createdBy: req.body.createdBy
	});
	ticket.save(function (err, ticket) {
		if (err) {
			next(err);
		}
		res.write(JSON.stringify({
			ticketId: ticket.id
		}));
	});
};

/**
 * Get Ticket list based on query strings
 *
 * @param req
 * @param res
 * @param next
 */
exports.list = function(req, res, next) {
	var query = req.body;
	TicketModel.find(query, function(err, tickets) {
		if (err) next(err);
		if (tickets) {
			res.write(JSON.stringify(tickets));
		}
	});
};

/**
 * Modify ticket 
 *
 * @param req
 * @param res
 * @param next
 */
exports.edit = function(req, res, next) {
	var conditions = {
		ticketId: req.body.ticketId
	};
	var updates = {
		summary: req.body.summary,
		status: req.body.status,
		category: req.body.category,
		updatedTime: Date()
	};
	TicketModel.update(conditions, updates, function(err, tickets) {
		if (err) next(err);
		res.write(JSON.stringify(tickets));
	});	
};

/**
 * Delete all the tickets based on criteria
 * @param req
 * @param res
 * @param next
 */
exports.destroy = function(req, res, next) {
	var conditions = {
		ticketId: req.body.ticketId
	};
	TicketModel.find(conditions, function(err, ticket) {
		if (err) next(err);
		ticketModel.remove(function(err, ticket) {
			if (err) next(err);
			res.write(JSON.stringify({result: 'success'}));
		});
	});
};
