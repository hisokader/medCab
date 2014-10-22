var express = require('express'),
	router = express.Router(),
	userModel = require('../models').user;
/* GET users listing. */
router.route('/')
	.get(function(req, res) {
		userModel.find({},function (err, users) {
		  if (err) return console.error(err);
		  res.json(200,users);
		});
	})
	.post(function(req, res) {
		console.log(req.body);

        var newUser=new userModel(req.body);

        userModel.register(newUser, newUser.password, function(err, user) {
            if (err) {
                res.send(400, err);
            }else{
	            console.log('User add success');
	            res.send(200,newUser);
	        }

        });
        
	});

router.route('/:id')
	.get(function(req, res) {
		var userId=req.params.id;
	  	userModel.findById(userId,function (err, user) {
		  if (err) res.json(err);
		  res.json(200,user);
		});
	})
	.put(function(req, res) {
		var userId=req.params.id;
		userModel.update({ _id: userId }, req.body, { multi: false }, function (err, numberAffected, raw) {
		  if (err) res.json(err);
		  else res.json(200,'raw : '+raw);
		});	
	})
	.delete(function(req, res) {
		var userId=req.params.id;
		userModel.findByIdAndRemove(userId,function(err){
			if (err)  res.json(err);
			res.json(200,'deleted'+req.params.id);
		});
	});


module.exports = router;
