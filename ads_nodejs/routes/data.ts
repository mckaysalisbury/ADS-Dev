/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
import express = require('express');
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
  var http = require('http');

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
router.get('/', function(req, res, next) {
  var complaints = require('../data/complaints.json');

  res.send(complaints);
});
module.exports = router;