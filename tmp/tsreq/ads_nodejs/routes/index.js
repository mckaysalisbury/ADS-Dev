/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
var express = require('express');
var http = require('http');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express', data: {} });
});
router.post('/', function (req, res, next) {
    var options = {
        host: 'api.fda.gov',
        path: '/drug/event.json?search=patient.drug.openfda.pharm_class_epc:"nonsteroidal+anti-inflammatory+drug"&count=patient.reaction.reactionmeddrapt.exact',
        port: 80,
        method: 'GET'
    };
    var request = http.request(options, function (response) {
        var body = "";
        response.on('data', function (data) {
            body += data;
        });
        response.on('end', function () {
            res.render('index', { title: 'Express', data: JSON.parse(body).results });
        });
    });
    request.on('error', function (e) {
        console.log('Problem with request: ' + e.message);
    });
    request.end();
});
router.get('/client', function (req, res, next) {
    res.render('client');
});
module.exports = router;
