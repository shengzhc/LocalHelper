var crypto = require('crypto');

var session_manager = {
	'secureTokens':[]
};

session_manager.generateSecureToken = function(req, callback) {
	crypto.randomBytes(32, function(err, buf) {
		if (err) return callback(err);
		var secureToken = buf.toString('hex');
		session_manager.secureTokens.add(secureToken);
		req.session.token = secureToken;
		return callback(null);
	});
};

module.exports = session_manager;
