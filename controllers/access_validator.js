var session_manager = require('./session_manager');
var validator = {};

validator.access_validate = function(req, res, next) {
    session_manager.verifySession(req, function(err, isValid) {
        if (err) return next(err);
        if (!isValid) return next(new Error('Invalid security token'));
        return next();
    });
};


module.exports = validator;
