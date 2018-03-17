var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose= require('mongoose');
var passport = require('passport');
var passportModule = require('./auth/passport.js');
var index = require('./routes/index');
var auth = require('./routes/auth');
var dest = require('./routes/destinations');
var app = express();

app.use(session({
  secret: 'nlf',
  resave: false,
  saveUninitialized: true
}))

passportModule.init(passport);
app.use(passport.initialize());
app.use(passport.session());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("./dist"));
app.use('/', index);
app.use('/auth', auth);
app.use('/dest', dest);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.ENVIRONMENT === 'DEV' ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
