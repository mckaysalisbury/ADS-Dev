/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
var express = require('express');
var http = require('http');
var WebRequest = (function () {
    function WebRequest() {
    }
    WebRequest.prototype.Send = function (callback) {
        var options = {
            host: 'api.fda.gov',
            //https://api.fda.gov/drug/label.json?api_key=MJbvXyEy77yTbS9xzasbPZhfIreiq9CjlvFpz5IZ&search=product_type:human+NOT+otc&skip=0&limit=100
            path: '/drug/label.json?api_key=MJbvXyEy77yTbS9xzasbPZhfIreiq9CjlvFpz5IZ&skip=0&limit=100&search=product_type:human+NOT+otc',
            port: 80,
            method: 'GET'
        };
        http.request(options, function (response) {
            var result = "";
            response.on('data', function (data) {
                result += data;
            });
            response.on('end', function () {
                callback(result);
            });
        });
    };
    return WebRequest;
})();
exports.WebRequest = WebRequest;
var router = express.Router();
//var jsonQuery = require('json-query');
/* GET users listing. */
router.get('/names', function (req, res, next) {
    var complaints = require('../data/complaints.json');
    var datablob = [];
    //datablob.complaints = complaints;
    //var results = jsonQuery('complaints[].name', {data: datablob}) 
    complaints.forEach(function (each) {
        datablob.push({ name: each.name });
    });
    res.send(datablob);
});
router.get('/query', function (req, res, next) {
    //var fullUrl = req.url;
    //var query = fullUrl.substring(12, fullUrl.length());
    //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    var options = {
        host: 'api.fda.gov',
        path: '/drug/event.json?search=patient.drug.openfda.pharm_class_epc:"nonsteroidal+anti-inflammatory+drug"'
    };
    var callback = function (response) {
        var str = '';
        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });
        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            res.send(str);
        });
    };
    http.request(options, callback).end();
});
router.get('/products/:productName', function (req, res, next) {
    var name = req.params.productName;
    var wr = new WebRequest();
    wr.Send(function (body) {
        res.send(name);
    });
    //api.WebRequest.Send(function(body){res.send(name);});
});
router.get('/', function (req, res, next) {
    var complaints = require('../data/complaints.json');
    res.send(complaints);
});
module.exports = router;
