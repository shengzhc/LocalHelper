var TicketModel = global.db.model('TicketModel');
var async = require('async');

/**
 * Create Ticket
 *
 * @param req
 * @param res
 * @param next
 */
exports.add = function(req, res, next) {
    if (req.body) {
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
    }
    else {
        next(new Error('No data passed in'));
    }

};

/**
 * Get all tickets list based on query strings
 *
 * @param req
 * @param res
 * @param next
 */
exports.getTickets = function(req, res, next) {
	var query = req.body;
	TicketModel.find(query, function(err, tickets) {
		if (err) next(err);
		if (tickets) {
			res.write(JSON.stringify(tickets));
		}
	});
};

/**
 * Get a ticket based on the id
 *
 * @param req
 * @param res
 * @param next
 */
exports.getTicket = function(req, res, next) {

};

/**
 * Update ticket
 *
 * @param req
 * @param res
 * @param next
 */
exports.update = function(req, res, next) {
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
 * Delete all the tickets based on request
 * @param req
 * @param res
 * @param next
 */
exports.del = function(req, res, next) {
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

/**
 * Claim to take the ticket
 *
 * @param req
 * @param res
 * @param next
 */
exports.claim = function(req, res, next) {

};