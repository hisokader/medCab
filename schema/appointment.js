var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var appointment = new Schema({
	id : ObjectId,
	fullDate: Date,
	patientId: ObjectId,
	title: String,
	type: String,
	isConfirmed: Boolean
});

module.exports=appointment;