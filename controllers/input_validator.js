
var validator = {};

validator.users_retrieve = function(req, res, next) {
	if (!req.params.id) {
		var err = new Error('user id is required.');
		res.status(400).send({status: 400, more_info: err});
		return next(err);
	}
	return next();
};

module.exports = validator;