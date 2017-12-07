'use strict';

var periodModel = require('../database').models.period;

var create = function (data, callback){
	var newPeriod = new periodModel(data);
	newPeriod.save(callback);
};

var findOne = function (data, callback){
	periodModel.findOne(data, callback);
}

var findById = function (id, callback){
	periodModel.findById(id, callback);
}

module.exports = { 
	create, 
	findOne, 
	findById
};
