var createError = require('http-errors');
var express = require('express');
var mysql = require('mysql2');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');

var app = express();

var routes = require('./server/routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// view engine으로 html쓰기
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
		secret: 'feelmstudy',
		cookie: { maxAge: 60 * 60 * 1000 },
		resave: true,
		saveUninitialized: false,
	})
);

require('./server/routes/config/login/passport')(passport);
require('./server/routes/config/login/local')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error.html');
});

module.exports = app;
