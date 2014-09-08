
module.exports = function(err, req, res, next) {
	global.logger.error(err.toString());
};
