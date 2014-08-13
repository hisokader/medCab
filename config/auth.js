var mongooseConn=require('./database'),
	passport = require('passport'),
	localStrategy = require('passport-local').Strategy,
	passportLocalMongoose = require('passport-local-mongoose'),
	user = require('../schema/user');

user.plugin(passportLocalMongoose, {usernameField: 'username', hashField: 'password', selectFields: 'undefined'  });

var userModel=mongooseConn.model('User', user);
passport.use(new localStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

module.exports = passport;