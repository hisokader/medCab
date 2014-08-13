var user = require('./schema/user'),
	patient = require('./schema/patient'),
	mongooseConn=require("./config/database");

var models={};

models.user=mongooseConn.model('User', user);
models.patient=mongooseConn.model('Patient', patient);

module.exports=models;