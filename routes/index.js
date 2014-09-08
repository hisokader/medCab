var express = require('express'),
	router = express.Router(),
	passport = require('../config/auth');

/* GET home page. */
/*router.get('/', function(req, res) {
  /*var p1=new patientModel();
  p1.nom='soufBel';
  p1.prenom='souf';
  p1.sexe=1;
  p1.save(function (err) {
      if(err) console.log("error");
      else console.log("success");
  });
	
//console.log(req.role.isAuthorized());
//res.send(200);
});*/

router.get('/', function(req, res) {
	console.log('req.session');
	res.render('index',{csurf : req.csrfToken()});
});

router.post('/login',passport.authenticate('local', {
	successRedirect: '/loginSuccess',
	failureRedirect: '/loginFailure'
}));
router.get('/logout', function(req, res){
		console.log('not bad');
		req.logout();
		res.json(200,{status:'true', msg:'Successfully logout.'})
	}
);
router.get('/loginFailure', function(req, res, next) {
	console.log('failed');
	res.json(200,{ user: req.user });
});
 
router.get('/loginSuccess', function(req, res, next) {
	console.log('Successfully');
	res.json(200,{ user: req.user });
});
router.get('/register', function(req, res, next) {
	var u1=new userModel();
	  u1.nom='soufBel';
	  u1.prenom='souf';
	  u1.role='1';
	  u1.username='admin';
	  u1.password=123456;
	  /*u1.save(function (err) {
	      if(err) console.log("error");
	      else console.log("success");
	  });*/

    userModel.register(u1, u1.password, function(err, user) {
        if (err) {
            console.log('Auth Failed');
        }
 console.log('Auth success');
 res.send(200,'Auth success');
       /* passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });*/
    });
});

module.exports = router;
