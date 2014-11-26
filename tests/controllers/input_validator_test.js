var input_validator = require('../../controllers/input_validator');
var req = {params:{}};
var res = {};

describe('Input_Validator', function() {

		describe('#user_signup()', function() {
			beforeEach(function() {
				req.params = {};
			});

			it('email should not be empty', function() {
				req.params['password'] = 'password';
				input_validator.user_signup(req, res, function(err) {
					err.should.be.Error;
				});
			});

			it('password should not be empty', function() {
				req.params['email'] = 'email';
				input_validator.user_signup(req, res, function(err) {
					err.should.be.Error;
				});
			});

			it('email and password should not be empty', function() {
				req.params['email'] = 'email';
				req.params['password'] = 'password';
				input_validator.user_signup(req, res, function(err) {
					(err == null).should.be.true;
				});
			});
		});

		describe('#user_signin()', function() {

		});

		describe('#user_signout()', function() {

		});

		describe('#user_update()', function() {

		});

		describe('#user_deactivate()', function() {

		});
});
