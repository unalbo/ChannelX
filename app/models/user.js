'use strict';

var userModel = require('../database').models.user;

var create = function (data, callback){
	var newUser = new userModel(data);
	newUser.save(callback);
	
};

var findByIdAndUpdate = function(id, data, callback){
	userModel.findByIdAndUpdate(id, data, { new: true }, callback);
}

/*var update = function (data, callback){
	
	if(data.username != ''){
	userModel.findOne({'username':data.username}, function(err, callback){
		if(err) throw err;
	});
	callback.username = data.username;
	}
	if(data.email != ''){
	userModel.findOne({'email':data.email}, function(err, callback){
		if(err) throw err;
	});
	callback.email = data.email;
	}
	callback.save(function(err){
		if(err) throw err;
	});
	
};*/

var findOne = function (data, callback){
	userModel.findOne(data, callback);
}

var findById = function (id, callback){
	userModel.findById(id, callback);
}

var findByIdAndUpdate = function(id, data, callback){
	console.log(data);
	console.log(id);
	userModel.findByIdAndUpdate(id, data,{ new: true }, callback);
}


/**
 * A middleware allows user to get access to pages ONLY if the user is already logged in.
 *
 */
var isAuthenticated = function (req, res, next) {
	if(req.isAuthenticated()){
		next();
	}else{
		res.redirect('/');
	}
}

module.exports = { 
	create, 
	//update,
	findByIdAndUpdate,
	findByIdAndUpdate,
	findOne, 
	findById, 
	isAuthenticated 
};
