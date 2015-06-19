/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
var express = require('express');
var api = require('../modules/api');
var router = express.Router();
router.get('/products/:productName', function (req, res, next) {
    var wr = new api.Fda();
    wr.Products(req.params.productName, function (body) {
        res.json(body);
    });
});
router.get('/product/:id', function (req, res, next) {
    var wr = new api.Fda();
    wr.Product(req.params.id, function (body) {
        res.json(body);
    });
});
router.get('/ingredient/:ingredientName', function (req, res, next) {
    var wr = new api.Fda();
    wr.Ingredient(req.params.ingredientName, function (body) {
        res.json(body);
    });
});
// router.get('/simple', function(req, res, next) {  
//   res.send("simple");
// });
// 
// router.get('/doubleecho/:value', function(req, res, next) {  
//   var value = req.params.value;
//   res.send(value + value);
// });
// 
// router.get('/doubleechoapi/:value', function(req, res, next) {  
//   var value = req.params.value;
//   var wr = new api.Fda();
//   wr.DoubleEcho(value, function(body){res.send(body)})
// });
// 
// router.get('/', function(req, res, next) {
//   var complaints = require('../data/complaints.json');
// 
//   res.send(complaints);
// });
module.exports = router;
