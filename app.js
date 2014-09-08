var fs = require('fs');
var express = require('express');
var app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = require('./components/router');
var errorHandler = require('./components/errorHandler');
var winston = require('winston');

var logger = new (winston.Logger)({
	transports:[
		new (winston.transports.Console)({level:'info', colorize: true, timestamp: true}),
		new (winston.transports.File)({level:'error', filename:'./log/error.log', handleExceptions: true, colorize: true, timestamp: true})
	],
	exceptionHandlers: [
		new (winston.transports.File)({filename:'./log/exception.log', handleExceptions: true, colorize: true, timestamp: true})
	]
});

global.logger = logger;

app.set('strict routing', true);
app.set('query parser', 'extended');

var accessLogStream = fs.createWriteStream(__dirname + '/log/access.log', {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text({defaultCharset: 'utf-8', type:'text/plain'}));
app.use(router);
app.use(errorHandler);

app.listen(3000, function() {
	console.log('Server starts listening to PORT 3000.')
});

/*
Work to do:
3. Define Routes 
*/