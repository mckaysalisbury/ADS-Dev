/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/express/express.d.ts"/>
import path = require('path');
import express = require('express');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

import routes = require('./routes/index');
import data = require('./routes/data');
import product = require('./routes/product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', <any>routes);
app.use('/data', <any>data);
app.use('/product', <any>product);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err : any;
  err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err : Error, req, res, next) {
    var error : any;
    error = err;
    res.status(error.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err : Error, req, res, next) {
  var error : any;
  error = err;
  res.status(error.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
