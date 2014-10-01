
module.exports = function(err, req, res, next) {
	global.logger.error(err.toString());
	if (!res.headersSent) {
		res.status(err.http_status || 400).send({status:err.http_status || 400, more_info:err.toString()});
		res.end();
	}
	return next();
};
