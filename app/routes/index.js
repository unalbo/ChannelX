'use strict';

var express	 	= require('express');
var router 		= express.Router();
var passport 	= require('passport');

var User = require('../models/user');
var Room = require('../models/room');
var Message = require('../models/message');

// Home page
router.get('/', function(req, res, next) {
	// If user is already logged in, then redirect to rooms page
	if(req.isAuthenticated()){
		res.redirect('/rooms');
	}
	else{
		res.render('login', {
			success: req.flash('success')[0],
			errors: req.flash('error'), 
			showRegisterForm: req.flash('showRegisterForm')[0]
		});
	}
});

// Login
router.post('/login', passport.authenticate('local', { 
	successRedirect: '/rooms', 
	failureRedirect: '/',
	failureFlash: true
}));

// Register via username and password
router.post('/register', function(req, res, next) {

	var credentials = {'username': req.body.username, 'password': req.body.password , 'email': req.body.email};

	if(credentials.username === '' || credentials.password === '' || credentials.email === ''){
		req.flash('error', 'Missing credentials');
		req.flash('showRegisterForm', true);
		res.redirect('/');
	}else{

		// Check if the username already exists for account
		User.findOne({'username': new RegExp('^' + req.body.username + '$', 'i')}, function(err, user){
			if(err) throw err;
			if(user){
				req.flash('error', 'Username already exists.');
				req.flash('showRegisterForm', true);
				res.redirect('/');
			}else{
				User.create(credentials, function(err, newUser){
					if(err) throw err;
					req.flash('success', 'Your account has been created. Please log in.');
					res.redirect('/');
				});
			}
		});
	}
});

router.post('/updateUser', function(req, res, next) {

	
	if(req.body.username === '' && req.body.email === '' )	res.redirect('/myprofile');
	else{
		if(req.body.username != '' && req.body.email != ''){
			var credentials = {'username': req.body.username, 'email': req.body.email};
		}
		else if(req.body.username != ''){
			var credentials = {'username': req.body.username};
		}
		else if(req.body.email != ''){
			var credentials = {'email': req.body.email};
		}
		
		User.findByIdAndUpdate(req.user.id,credentials,function(err,user){
			if(err) throw err;
			res.redirect('/myprofile');
		})
	}
});

// Rooms
router.get('/rooms', [User.isAuthenticated, function(req, res, next) {
	Room.find(function(err, rooms){
		if(err) throw err;
		User.findById(req.user.id,function(err, users){
			User.findByIdAndUpdate(users.id, {'lastLogin':Date.now() }, function(err,users){});
			if(err) throw err;
			res.render('rooms', { rooms, users });
		});
	});
}]);

// Myprofile
router.get('/myprofile', [User.isAuthenticated, function(req, res, next) {
	
	User.findById(req.user.id,function(err, users){
		if(err) throw err;
		res.render('profile', { user: req.user });
	});
	
}]);

// Chat Room 
router.get('/chat/:id', [User.isAuthenticated, function(req, res, next) {
	var roomId = req.params.id;
	Room.findById(roomId, function(err, room){
		if(err) throw err;
		if(!room){
			return next(); 
		}
		Message.find({'ChannelID':roomId},function(err, messages){
			if(err) throw err;
			res.render('chatroom', { user: req.user, room: room, messages});
		});
	});
	
}]);

// Logout
router.get('/logout', function(req, res, next) {
	// remove the req.user property and clear the login session
	req.logout();

	// destroy session data
	req.session = null;

	// redirect to homepage
	res.redirect('/');
});

module.exports = router;
