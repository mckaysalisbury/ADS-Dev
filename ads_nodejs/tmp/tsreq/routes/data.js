var express = require('express');
var http = require('http');
var router = express.Router();
router.get('/names', function (req, res, next) {
    var complaints = require('../data/complaints.json');
    var datablob = [];
    complaints.forEach(function (each) {
        datablob.push({ name: each.name });
    });
    res.send(datablob);
});
router.get('/query', function (req, res, next) {

    var http = require('http');

    var options = {
        host: 'api.fda.gov',
        //path: '/drug/event.json?search=patient.drug.openfda.pharm_class_epc:"nonsteroidal+anti-inflammatory+drug"'
        path: '/drug/label.json?count=openfda.substance_name.exact'
    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            res.send(str);
        });
    };
    http.request(options, callback).end();
});
router.get('/', function (req, res, next) {
    var complaints = require('../data/complaints.json');
    res.send(complaints);
});
module.exports = router;
//# sourceMappingURL=data.js.map
