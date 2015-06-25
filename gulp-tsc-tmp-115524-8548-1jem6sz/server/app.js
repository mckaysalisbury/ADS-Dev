var express = require('express');
var data = require('./routes/data');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();
var environment = process.env.NODE_ENV;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/data', data);
console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);
switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        app.use('/app/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        app.use('/app/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        app.use('/*', express.static('./src/client/index.html'));
        break;
}
module.exports = app;
//# sourceMappingURL=app.js.map