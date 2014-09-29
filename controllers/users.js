var UserModel = global.db.model('UserModel');

/**
 * Post user create
 * @param req
 * @param res
 * @param next
 */
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

