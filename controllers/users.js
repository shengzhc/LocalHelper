var UserModel = global.db.model('UserModel');
var session_manager = require('./session_manager');
var async = require('async');

exports.signup = function(req, res, next) {
    var email = req.params['email'].toLowerCase(), password = req.params['password'];
    UserModel.findByEmail(email, function(err, user) {
        if (err) return next(err);
        if (user) {
            var err = new Error('the email address has been registered');
            return next(err);
        }

        var user = new UserModel({email: email});
        user.generatePassword(password, function(err, securePassword) {
            if (err) return next(err);
            user.password = securePassword;
            user.save(function(err) {
                if (err) return next(err);
                sessionManager.activateSession(function(err) {
                    if (err) return next(err);
                    res.status(200).send({status:200, more_info:user});
                    return next();
                });
            });
        });
    });
};

exports.signin = function(req, res, next) {
    var email = req.params['email'].toLowerCase(), password = req.params['password'];
    UserModel.findByEmail(email, function(err, user) {
        if (err) return next(err);
        if (user == NULL || typeof user == "undefined") return next(new Error('the account does not exist'));

        user.verifyPassword(password, function(err, isValid) {
            if (err) return next(err);
            if (!isValid) return next(new Error('the password does not match the account'));
            sessionManager.activateSession(function(err) {
                if (err) return next(err):
                res.status(200).send({status:200, more_info:{message:'Welcome to LocalHelper'}});
                return next();
            });
        });
    });
};

exports.signout = function(req, res, next) {
    var email = req.params['email'].toLowerCase();
    UserModel.findByEmail(email, function(err, user) {
        if (err) return next(err);
        if (user == NULL || typeof user == "undefined") return next(new Error('the account does not exist'));
        session_manager.deactivateSession(req, function(err) {
            if (err) return next(err):
            res.status(200).send({status:200, more_info:{message:'Looking forward to see you again'}});
            return next();
        });
    });
};

exports.deactivate = function(req, res, next) {
    var email = req.params['email'].toLowerCase(), password = req.params['password'];
    UserModel.findByEmail(email, function(err, user) {
        if (err) return next(err);
        if (user == NULL || typeof user == "undefined") return next(new Error('the account does not exist'));
        user.verifyPassword(password, function(err, isValid) {
            if (err) return next(err);
            if (!isValid) return next(new Error('the password does not match the account'));
            session_manager.deactivateSession(req, function(err) {
                if (err) return next(err);
                user.is_archived = true;
                user.save(function(err) {
                    if (err) return next(err);
                    res.status(200).send({status:200, more_info:{message:'Thanks for using LocalHelper'}});
                    return next();
                });
            });
        });
    });
};

exports.update = function(req, res, next) {
    var email = req.params['email'];
    UserModel.findByEmail(email, function(err, user) {
        if (err) return next(err);
        if (user == null || typeof user == "undefined") return next(new Error('the account does not exist'));
        user.updateUserDetails(req.params, function(err))
    });
};

exports.retrieve = function(req, res, next) {
    var email = req.params.id.toLowerCase();
    for (var i = 1; i < 1000; i++)
        for (var j=1; j< 1000000; j++);
    UserModel.findOne({'email': email}, function(err, user) {
        if (err) return next(err);
        if (!user) {
            var err = new Error('non user found');
            return next(err);
        }
        res.status(200).send({status:200, more_info:user});
        return next();
    });
};
