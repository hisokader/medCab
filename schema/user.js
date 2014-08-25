var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var user = new Schema({
	id : ObjectId,
	nom : String,
	prenom : String,
	role : String,
	salt:String,
	username : String,
	password : String
});

module.exports=user;