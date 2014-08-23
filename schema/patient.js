var mongoose=require("mongoose");
var mongooseConn=require("../config/database");

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var patient = new Schema({
    id : ObjectId,
    lastName : String,
    firstName : String,
    sexe : Boolean,
    dayBirth: Date,
	adress: String,
	tel: String,
	gsm: String,
	job: String,
	insurance: Boolean,
	diagnostique: String
});

module.exports=patient;