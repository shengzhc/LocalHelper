
function getResponseObject(responseIdentifier, callback) {
	var fs = require('fs');
	var dir = __dirname + (responseIdentifier.indexOf('SUCC') == -1 ? '/fail/' : '/succ/');
	var filepath = dir + responseIdentifier.toLowerCase();
	global.logger.info('Reading content of ' + filepath);
	fs.readFile(filepath, {encoding: 'utf-8'}, function(err, data) {
		if (err) return callback(err, null);
		try {
			jsonObj = JSON.parse(data);
			return callback(null, jsonObj);
		} catch (err) {
			return callback(err, null);
		}
	});
};

module.exports = getResponseObject;
