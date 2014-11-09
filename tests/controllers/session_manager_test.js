var session_manager = require('../../controllers/session_manager');

var express = require('express');
var session = require('express-session');
var request = require('supertest');
var assert = require('assert');

describe('Session_Manager', function() {
		beforeEach(function(done) {
			req = {};
			session({})(req, res, function() {
				console.log('ddd');
				done();
			});
		});

		describe('#activateSession()', function() {
			it('should be typeof function', function() {
				assert.equal(typeof session_manager.activateSession, "function");
			});
			it('should create secureToken and non-empty', function(done) {
				var req = {session:{}};
				session_manager.activateSession(req, function(err) {
					assert.ok(req.session.token);
					assert.notEqual(session_manager.secureTokens.indexOf(req.session.token), -1);
					done(err);
				});
			});
		});

		describe('#deactivateSession()', function(){
			it('should be typeof function', function() {
				assert.equal(typeof session_manager.deactivateSession, "function");
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
				assert.equal(typeof session_manager.verifySession, "function");
			});
		});
});
