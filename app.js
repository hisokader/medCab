var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var csrf = require('csurf');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var passport = require('./config/auth');

var role = require('./config/acl');

var routes = require('./routes/index');
var users = require('./routes/users');
var patients = require('./routes/patients');
var appointments = require('./routes/appointments');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(csrf());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/*',function(req, res, next) {
    if(req.path=='/' || req.path=='/login') next();
    else if(!req.isAuthenticated())
        {
            console.log('not logged');
            res.set('x-csrf-token', req.csrfToken());
            res.send(401,{status:'false', msg:'login Please'});
        }
    else {
        res.set('x-csrf-token', req.csrfToken());
        next();
    }
});

// Сonnect a middleware
app.use(role.middleware());
app.use('/', routes);
app.use('/patients', patients);
app.use('/users', users);
app.use('/appointments', appointments);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
