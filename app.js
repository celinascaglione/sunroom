var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var casasRouter = require('./routes/casas');
var locofiRouter = require('./routes/locofi');
var restauracionesRouter = require('./routes/restauraciones');
const { verify } = require('crypto');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/casas', casasRouter);
app.use('/locofi', locofiRouter);
app.use('/restauraciones', restauracionesRouter);


/*armo 3 rutas*/
app.get('/casas' , function(req, res){
  res.render('hola soy la pagina casas')
})

app.get('/locofi' , function(req, res){
  res.render('hola soy la pagina locales y oficinas')
})

app.get('/restauraciones' , function(req, res){
  res.render('hola soy la pagina restauraciones')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
