/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
/// <reference path="../modules/api.ts"/>

import express = require('express');
import http = require('http');
import api = require('../modules/api');

var router = express.Router();
//var jsonQuery = require('json-query');

/* GET users listing. */
router.get('/names', function(req, res, next) {
  var complaints = require('../data/complaints.json');
  var datablob = [];
  //datablob.complaints = complaints;
  //var results = jsonQuery('complaints[].name', {data: datablob}) 
  complaints.forEach(function(each){
    datablob.push({name: each.name});
  });
  res.send(datablob);
});


router.get('/query', function(req, res, next) {
  //var fullUrl = req.url;
  //var query = fullUrl.substring(12, fullUrl.length());

  //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
  var options = {
    host: 'api.fda.gov',
    path: '/drug/event.json?search=patient.drug.openfda.pharm_class_epc:"nonsteroidal+anti-inflammatory+drug"'
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
});

router.get('/products/:productName', function(req, res, next) {  
  var name = req.params.productName;
  var wr = new api.WebRequest();
  wr.Send(name, function(body){res.send(name);});
  //api.WebRequest.Send(function(body){res.send(name);});

});

router.get('/echo/:value', function(req, res, next) {  
  var name = req.params.value;
  var wr = new api.WebRequest();
  wr.DoubleEcho(name, function(body){res.send(body)})
});


router.get('/', function(req, res, next) {
  var complaints = require('../data/complaints.json');

  res.send(complaints);
});
module.exports = router;