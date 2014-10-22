var user = require('./schema/user'),
	patient = require('./schema/patient'),
	appointment = require('./schema/appointment'),
	mongooseConn=require("./config/database");

var models={};

models.user=mongooseConn.model('User', user);
models.patient=mongooseConn.model('Patient', patient);
models.appointment=mongooseConn.model('appointment', appointment);

module.exports=models;