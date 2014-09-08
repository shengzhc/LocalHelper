var fs = require('fs');
var express = require('express');
var app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.set('strict routing', true);
app.set('query parser', 'extended');

var accessLogStream = fs.createWriteStream(__dirname + '/log/access.log', {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text({defaultCharset: 'utf-8', type:'text/plain'}));

app.get('/', function(req, res) {
	res.send('Welcome to Local Helper');
});

app.listen(3000, function() {
	console.log('Server starts listening to PORT 3000.')
});

/*
Work to do:
1. Import ErrorHandler
2. Import Router
3. Define Routes 
*/