var mongoose=require("mongoose");
var mongooseConn=require("../config/database");

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var patient = new Schema({
    id : ObjectId,
    nom : String,
    prenom : String,
    sexe : Boolean
});

module.exports=mongooseConn.model('Patient', patient);