var validator = {};

validator.user_signup = function(req, res, next) {
	var email = req.params['email'], password = req.params['password'];
	if (!email || !password) {
		var err = new Error('email and password are required');
		return next(err);
	}
	return next();
};

validator.user_signin = function(req, res, next) {
	var email = req.params['email'], password = req.params['password'];
	if (!email || !password) {
		var err = new Error('email and password are required');
		return next(err);
	}
	return next();
};

validator.user_signout = function(req, res, next) {
	var email = req.params['email'], password = req.params['password'];
	if (!email || !password) {
		var err = new Error('email and password are required');
		return next(err);
	}
	return next();
};

validator.user_update = function(req, res, next) {
	var email = req.params['email'], password = req.params['password'];
	if (!email || !password) {
		var err = new Error('email and password are required');
		return next(err);
	}
	return next();
};

validator.user_deactivate = function(req, res, next) {
	var email = req.params['email'], password = req.params['password'];
	if (!email || !password) {
		var err = new Error('email and password are required');
		return next(err);
	}
	return next();
};

module.exports = validator;
