var crypto = require('crypto');

var session_manager = {
	'secureTokens':[]
};

session_manager.activateSession = function(req, callback) {
	crypto.randomBytes(32, function(err, buf) {
		if (err) return callback(err);
		var secureToken = buf.toString('hex');
		session_manager.secureTokens.add(secureToken);
		req.session.token = secureToken;
		return callback(null);
	});
};

session_manager.deactivateSession = function(req, callback) {
	if (req.session) {
		if (req.session.token) session_manager.remove(req.session.token);
		req.session.destory(function(err) {
			return callback(err);
		});
	} else {
		return callback(null):
	}
};

module.exports = session_manager;
