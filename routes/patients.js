var express = require('express'),
	router = express.Router(),
	passport = require('../config/auth'),
	patientModel = require('../models').patient;
/* GET users listing. */
router.route('/')
	.get(function(req, res) {
		patientModel.find({},function (err, patients) {
		  if (err) return console.error(err);
		  res.json(200,patients);
		});
	})
	.post(function(req, res) {
		console.log(req.body);
		var newPatient=new patientModel(req.body);
		newPatient.save(function (err) {
		  if (err) throw err;
		  res.json(200,newPatient);
		});
	});

router.route('/:id')
	.get(function(req, res) {
		var patientId=req.params.id;
	  	patientModel.findById(patientId,function (err, patient) {
		  if (err) res.json(err);
		  res.json(200,patient);
		});
	})
	.put(function(req, res) {
		var patientId=req.params.id;
		patientModel.update({ _id: patientId }, req.body, { multi: false }, function (err, numberAffected, raw) {
		  if (err)  res.json(err);
		  res.json(200,'raw : '+raw);
		});
	})
	.delete(function(req, res) {
		var patientId=req.params.id;
		patientModel.findByIdAndRemove(patientId,function(err){
			if (err)  res.json(err);
			res.json(200,'deleted'+req.params.id);
		});
	});


module.exports = router;
