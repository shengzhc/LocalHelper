var router = require('express').Router();

router.get('/', function(req, res, next) {
	res.send('Welcome to Local Helper');
	return next();
});

module.exports = router;
