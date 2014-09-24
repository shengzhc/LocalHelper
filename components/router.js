var router = require('express').Router();

router.get('/', function(req, res, next) {
	res.send('Welcome to Local Helper');
	return next();
});

//User Calls
router.get('/users/:id', function(req, res, next) {
	res.send('Get User Details');
	return next();
});

router.post('/users', function(req, res, next) {
	res.send('Sign up');
	return next();
});

//Ticket Calls
router.get('/tickets/:id', function(req, res, next) {
	res.send('Get Ticket Details');
	return next();
});

router.get('/tickets', function(req, res, next) {
	res.send('Search for tickets');
	return next();
});

router.post('/tickets', function(req, res, next) {
	res.send('Create ticket');
	return next();
});

module.exports = router;
