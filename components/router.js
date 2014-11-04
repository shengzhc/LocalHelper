var router = require('express').Router();
var input_validator = require('../controllers/input_validator')
var tickets = require('../controllers/tickets');
var users = require('../controllers/users');

router.get('/', function(req, res, next) {
	res.send('Welcome to Local Helper');
	return next();
});

//User Calls
router.get('/users/:id', input_validator.users_retrieve, users.retrieve);
router.post('/users', input_validator.users_register, users.register);

//Ticket Calls
router.post('/tickets', tickets.add);
router.get('/tickets', tickets.getTicket);
router.get('/tickets/:id', tickets.getTicket);
router.put('/tickets/:id', tickets.update);
router.del('/tickets/:id', tickets.del);

//router.get('/tickets/:id', function(req, res, next) {
//	res.send('Get Ticket Details');
//	return next();
//});
//
//router.get('/tickets', function(req, res, next) {
//	res.send('Search for tickets');
//	return next();
//});
//
//router.post('/tickets', function(req, res, next) {
//	res.send('Create ticket');
//	return next();
//});

module.exports = router;
