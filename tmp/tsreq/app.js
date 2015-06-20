/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/express/express.d.ts"/>
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8001;
var environment = process.env.NODE_ENV;
var routes = require('./routes/index');
var data = require('./routes/data');
console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./'));
app.use('/', routes);
app.use('/data', data);
app.use(function (req, res, next) {
    var err;
    err = new Error('Not Found');
    err.status = 404;
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        var error;
        error = err;
        res.status(error.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function (err, req, res, next) {
    var error;
    error = err;
    res.status(error.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
//# sourceMappingURL=app.js.map