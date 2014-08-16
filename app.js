var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('Welcome to Local Helper');
});

app.listen(3000, function() {
	console.log('Server starts listening to PORT 3000.');
});