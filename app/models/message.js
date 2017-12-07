'use strict';

var messageModel = require('../database').models.message;

var create = function (data, callback){
	var newMessage = new messageModel(data);
	newMessage.save(callback);
};

var findOne = function (data, callback){
	messageModel.findOne(data, callback);
}

var findById = function (id, callback){
	messageModel.findById(id, callback);
}

module.exports = { 
	create, 
	findOne, 
	findById
};