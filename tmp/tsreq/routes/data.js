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
router.get('/products/:productName', function (req, res, next) {
    var wr = new api.Fda();
    wr.Products(req.params.productName, function (body) {
        res.send(body);
    });
});
router.get('/product/:id', function (req, res, next) {
    var wr = new api.Fda();
    wr.Product(req.params.id, function (body) {
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
    var wr = new api.Fda();
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