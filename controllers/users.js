var UserModel = global.db.model('UserModel');
var async = require('async');
/**
 * Post user create
 * @param req
 * @param res
 * @param next
 */
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
}

exports.register = function(req, res, next) {
    var email = req.params['email'], password = req.params['password'];
    /* 
        Few things to notice:
            1. Whether to use email as _id
            2. If not, please adding index for email
            3. We dont need to save user password, the best practice is to generate a random seed and crypto the seed along with the password, the final code will be saved to password field. 
    */

    UserModel.findOne({'email': email}, function(err, user) {
        if (err) return next(err);
        if (user) {
            var err = new Error('the email address has been registered');
            return next(err);
        }

        var user = new UserModel({email: email, password: password});
        user.save(function(err) {
            if (err) return next(err);
            res.status(200).send({status:200, more_info:user});
        });
    })
};

exports.create = function(req, res, next) {
    var user = new UserModel({
        username: req.body.username,
        password: req.body.password
    });
    user.save(function (err, user) {
        if (err)    next(err);
        res.write(JSON.stringify({
            userId: user.id
        }));
    });
};

/**
 * Get user list
 * @param req
 * @param res
 * @param next
 */
exports.list = function(req, res, next) {
    var query = {};
    if (req.body.name) {
        query.name = req.body.name;
    }
    UserModel.find(query, function(err, users) {
        if (err) next(err);
        if (users) {
            res.write(JSON.stringify(users));
        }
    });
};

/**
 * Update user edit
 * @param req
 * @param res
 * @param next
 */
exports.edit = function(req, res, next) {
    var conditions = {
        username: req.body.username
    };
    var updates = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    };
    UserModel.update(conditions, updates, function(err, user) {
        if (err) next(err);
        res.write(JSON.stringify(user));
    });
};

/**
 * Delete user remove
 * @param req
 * @param res
 * @param next
 */
exports.destroy = function(req, res, next) {
    var conditions = {
        username: req.body.username
    };
    UserModel.find(conditions, function(err, user) {
        if (err) next(err);
        UserModel.remove(function(err, user) {
            if (err) next(err);
            res.write(JSON.stringify({result: 'success'}));
        });
    });
};

exports.test = function(req, res, next) {
    var user = new UserModel();
    user.test();
    return next();
};

