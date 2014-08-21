var mongoose=require("mongoose");
var mongooseConn=require("../config/database");

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var patient = new Schema({
    id : ObjectId,
    nom : String,
    prenom : String,
    sexe : Boolean,
    DateNaissance: Date,
	Adresse: String,
	Fixe: String,
	Gsm: String,
	Profession: String,
	mutuelliste: Boolean,
	diagnostique: String
});

module.exports=mongooseConn.model('Patient', patient);