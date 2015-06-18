var express = require('express');
var http = require('http');
var api = require('../modules/api');
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
    var options = {
        host: 'api.fda.gov',
        path: '/drug/event.json?search=patient.drug.openfda.pharm_class_epc:"nonsteroidal+anti-inflammatory+drug"'
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
router.get('/products/:productName', function (req, res, next) {
    var name = req.params.productName;
    var wr = new api.WebRequest();
    wr.Send(name, function (body) {
        res.send(body);
    });
});
router.get('/simple', function (req, res, next) {
    res.send("simple");
});
router.get('/doubleecho/:value', function (req, res, next) {
    var value = req.params.value;
    res.send(value + value);
});
router.get('/doubleechoapi/:value', function (req, res, next) {
    var value = req.params.value;
    var wr = new api.WebRequest();
    wr.DoubleEcho(value, function (body) {
        res.send(body);
    });
});
router.get('/', function (req, res, next) {
    var complaints = require('../data/complaints.json');
    res.send(complaints);
});
module.exports = router;
//# sourceMappingURL=data.js.map