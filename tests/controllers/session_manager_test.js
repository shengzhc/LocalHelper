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
				var app = express()
					.use(session({secret: '_local_helper', resave:true, saveUninitialized:true}))
					.use(function(req, res, next) {
						session_manager.activateSession(req, function() {
							var token = req.session.token;
							session_manager.deactivateSession(req, function(err) {
								req.should.not.have.property('session');
								session_manager.secureTokens.should.not.containEql(token);
								next(err);
							});
						});
					})
					.use(end);
				request(app).get('/').end(function(err, res) {done(err)});
			});
		});

		describe('#verifySession()', function() {
			it('should be typeof function', function() {
				session_manager.verifySession.should.be.a.Function;
			});

			it('should pass session verify', function(done) {
				var app = express()
					.use(session({secret: '_local_helper', resave:true, saveUninitialized:true}))
					.use(function(req, res, next) {
						session_manager.activateSession(req, function() {
							session_manager.verifySession(req, function(err, isValid) {
								isValid.should.be.true;
								next(err);
							});
						});
					});
				request(app).get('/').end(done);
			});
		});
});

function end(req, res, next) {
	res.end();
}
