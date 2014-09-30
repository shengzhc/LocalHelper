var router = require('express').Router();
var validator = require('../controllers/input_validator')
var tickets = require('../controllers/tickets');
var users = require('../controllers/users');

router.get('/', function(req, res, next) {
	res.send('Welcome to Local Helper');
	return next();
});

//User Calls
router.get('/users/:id', validator.users_retrieve, users.retrieve);
router.post('/users', validator.users_register, users.register);

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
