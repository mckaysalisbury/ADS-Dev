var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var four0four = require('./utils/404');
var port = process.env.PORT || 8001;
var environment = process.env.NODE_ENV;
//import routes = require('./routes/index');
//import data = require('./routes/data');
console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);
var app = express();
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./'));
switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('./public/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./public/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('./public/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./public/index.html'));
        break;
}
/*
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
*/
module.exports = app;
