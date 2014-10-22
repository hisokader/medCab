var express = require('express'),
	router = express.Router(),
	passport = require('../config/auth'),
	appointmentModel = require('../models').appointment;
/* GET users listing. */
router.route('/')
	.get(function(req, res) {
		appointmentModel.find({},function (err, appointments) {
		  if (err) return console.error(err);
		  res.json(200,appointments);
		});
	})
	.post(function(req, res) {
		var newappointment=new appointmentModel(req.body);
		newappointment.save(function (err) {
		  if (err) throw err;
		  res.json(200,newappointment);
		});
	});

router.route('/:id')
	.get(function(req, res) {
		var appointmentId=req.params.id;
	  	appointmentModel.findById(appointmentId,function (err, appointment) {
		  if (err) res.json(err);
		  res.json(200,appointment);
		});
	})
	.put(function(req, res) {
		var appointmentId=req.params.id;
		appointmentModel.update({ _id: appointmentId }, req.body, { multi: false }, function (err, numberAffected, raw) {
		  if (err)  res.json(err);
		  res.json(200,'raw : '+raw);
		});
	})
	.delete(function(req, res) {
		var appointmentId=req.params.id;
		console.log('delete');
		appointmentModel.findByIdAndRemove(appointmentId,function(err){
			if (err)  res.json(err);
			res.json(200,'deleted'+req.params.id);
		});
	});


module.exports = router;
