var mongoose=require("mongoose");
var mongooseConn=require("../config/database");

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var consultation = new Schema({
    id : ObjectId,
    Patient: Number,
	DateConsultation: Date,
	Observations: String,
	DatePayement: Date,
	Montant: Number,
	Avance: Number,
	Reste: Number,
	Devise: String
});

module.exports=mongooseConn.model('Consultation', consultation);