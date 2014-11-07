var router = require('express').Router();
var input_validator = require('../controllers/input_validator')
var tickets = require('../controllers/tickets');
var users = require('../controllers/users');

router.get('/', function(req, res, next) {
	res.send('Welcome to Local Helper');
	return next();
});

//User Calls
router.post('/signup', input_validator.user_signup, users.signup);
router.post('/signin', input_validator.user_signin, users.signin);
router.post('/users/:id/signout', input_validator.user_signout, access_validator.access_validate, users.signout);
router.put('/users/:id/deactivate', input_validator.user_deactivate, access_validator.access_validate, users_deactivate);

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
