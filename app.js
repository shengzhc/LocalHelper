var fs = require('fs');
var express = require('express');

var winston = require('winston');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongodb = require('./components/mongodb');
var session = require('express-session');

global.logger = new (winston.Logger)({
	transports:[
		new (winston.transports.Console)({level:'info', colorize: true, timestamp: true, handleExceptions:true}),
		new (winston.transports.File)({level:'error', filename:'./log/error.log', handleExceptions: true, colorize: true, timestamp: true})
	],
	exceptionHandlers: [
		new (winston.transports.File)({filename:'./log/exception.log', handleExceptions: true, colorize: true, timestamp: true})
	]
});

var app = express();

app.set('strict routing', true);
app.set('query parser', 'extended');

var accessLogStream = fs.createWriteStream(__dirname + '/log/access.log', {flags: 'a'});
var responseLogStream = fs.createWriteStream(__dirname + '/log/response.log', {flags: 'a'});

morgan.token('lp_startTime', function(req, res) {
	return req.lp_startTime;
});

app.use(session({secret: '_local_helper', resave:true, saveUninitialized:true}));
app.use(function(req, res, next) {
	req.lp_startTime = new Date();
	next();
});

app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text({defaultCharset: 'utf-8', type:'text/plain'}));

mongodb.connect(function(err, db) {
	if (err || !db) return;
	var router = require('./components/router');
	var errorHandler = require('./components/err_handler');
	app.use(router);
	app.use(errorHandler);
	app.use(morgan(':remote-addr - :remote-user :lp_startTime :response-time ms ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {stream: responseLogStream}));
	app.use(function(req, res, next) {
		// dummy function to end the expressjs middle-ware queue
		res.end();
	});
	app.listen(3000, function(err) {
		if (err) {
			global.logger.error(err.toString());
			exit(-1);
		} else {
			global.logger.info('Server starts to listen to PORT 3000');
		}
	});
});
