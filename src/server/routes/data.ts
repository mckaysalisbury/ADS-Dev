/// <reference path="../../../vendortypescripts/node/node.d.ts"/>
/// <reference path="../../../vendortypescripts/express/express.d.ts"/>
import express = require('express');
import http = require('http');
import api = require('../modules/api');

var router = express.Router();

function sendQueryResults(query:string, res:express.Response){
  var options = {
    host: 'api.fda.gov',
    //path: '/drug/event.json?search=patient.drug.openfda.pharm_class_epc:"nonsteroidal+anti-inflammatory+drug"'
      path: query
  };
  
  var callback = function(response) {
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
};

router.get('/substances', function(req, res, next) {
  sendQueryResults('/drug/label.json?count=openfda.substance_name.exact', res);
});

router.get('/drugsContaining/:ingredient', function(req, res, next) {
  var ingredient = req.params.ingredient;
  sendQueryResults('/drug/label.json?limit=10&search=openfda.substance_name:"' + ingredient + '"', res);
});

router.get('/products/:productName', function(req, res, next) {
  var wr = new api.Fda();
  wr.Products(req.params.productName, function(body){res.send(body);});
});

router.get('/product/:id', function(req, res, next) {
  var wr = new api.Fda();
  wr.Product(req.params.id, function(body){res.send(body);});
});

router.get('/simple', function(req, res, next) {  
  res.send("simple");
});

router.get('/doubleecho/:value', function(req, res, next) {  
  var value = req.params.value;
  res.send(value + value);
});

router.get('/doubleechoapi/:value', function(req, res, next) {  
  var value = req.params.value;
  var wr = new api.Fda();
  wr.DoubleEcho(value, function(body){res.send(body)})
});

router.get('/', function(req, res, next) {
  var complaints = require('../data/complaints.json');

  res.send(complaints);
});
module.exports = router;