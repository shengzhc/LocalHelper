var crypto = require('crypto');

var session_manager = {
	'secureTokens':[]
};

session_manager.activateSession = function(req, callback) {
	crypto.randomBytes(32, function(err, buf) {
		if (err) return callback(err);
		var secureToken = buf.toString('hex');
		session_manager.secureTokens.push(secureToken);
		req.session.token = secureToken;
		return callback();
	});
};

session_manager.deactivateSession = function(req, callback) {
	if (req.session) {
		if (req.session.token) {
			var index = session_manager.secureTokens.indexOf(req.session.token);
			if (index > -1) {
				session_manager.secureTokens.splice(index, 1);
			}
		}
		req.session.destroy(function(err) {
			return callback(err);
		});
	} else {
		return callback();
	}
};

session_manager.verifySession = function(req, callback) {
		if (req.session && req.session.token) {
			if (session_manager.secureTokens.indexOf(req.session.token) >=0) {
				return callback(null, true);
			}
		}
		return callback(null, false);
};

module.exports = session_manager;
