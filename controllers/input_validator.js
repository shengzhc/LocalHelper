
var validator = {};

validator.users_retrieve = function(req, res, next) {
	if (!req.params.id) {
		var err = new Error('user id is required.');
		return next(err);
	}
	return next();
};

validator.users_register = function(req, res, next) {
	var email = req.params['email'], password = req.params['password'];
	if (!email || !password) {
		var err = new Error('email and password are required');
		return next(err);
	}
	return next();
};

module.exports = validator;