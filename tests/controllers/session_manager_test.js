var session_manager = require('../../controllers/session_manager');

var express = require('express');
var session = require('express-session');
var request = require('supertest');
var should = require('should');
var assert = require('assert');

describe('Session_Manager', function() {
		beforeEach(function() {
			session_manager.secureTokens = [];
		});

		describe('#activateSession()', function() {
			it('should be typeof function', function() {
				session_manager.activateSession.should.be.a.Function;
			});

			it('should store secureTokens and Set req.session.token', function() {
				var app = express()
					.use(session({secret: '_local_helper', resave:true, saveUninitialized:true}))
					.use(function(req, res, next) {
						session_manager.activateSession(req, function(err) {
							req.session.token.should.not.be.empty;
							session_manager.secureTokens.should.not.be.empty;
							next(err);
						});
					})
					.use(end);
				request(app).get('/').end(function(err, res) {});
			});
		});

		describe('#deactivateSession()', function(){
			it('should be typeof function', function() {
				session_manager.deactivateSession.should.be.a.Function;
			});
			it('should clear request session and remove from session mananger', function(done) {
				var token = 'test';
				session_manager.secureTokens.push(token);
				session_manager.deactivateSession(req, function(err) {
					assert.equal(req.session.hasOwnProperty('token'), false);
					assert.equal(req.session.hasOwnProperty('others'), false);
					assert.equal(session_manager.secureTokens.indexOf(token), -1);
					done(err);
				});
			});
		});

		describe('#verifySession()', function() {
			it('should be typeof function', function() {
				session_manager.verifySession.should.be.a.Function;
			});
		});
});

function end(req, res, next) {
	res.end();
}
