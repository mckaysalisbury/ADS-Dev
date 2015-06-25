/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/express/express.d.ts"/>
import express = require('express');
import api = require('../modules/api');
var Fda = api.Fda;
var router = express.Router();

router.get('/product/:id', function(req, res, next) {
  Fda.Product(req.params.id, function(body){res.json(body);});
});

router.get('/products/:productName/:page?/:count?', function(req, res, next) {
  Fda.Products(req.params.productName, req.params.page, req.params.count, function(body){res.json(body);});
});

router.get('/ingredient/:ingredientName/:page?/:count?', function(req, res, next) {
  Fda.Ingredient(req.params.ingredientName, req.params.page, req.params.count, function(body){res.json(body);});
});

router.get('/purpose/:purpose/:page?/:count?', function(req, res, next) {
  Fda.Purpose(req.params.purpose, req.params.page, req.params.count, function(body){res.json(body);});
});

router.get('/purposeWithoutIngredient/:purpose/:ingredient/:page?/:count?', function(req, res, next) {
  Fda.PurposeWithoutIngredient(req.params.purpose, req.params.ingredient, req.params.page, req.params.count, function(body){res.json(body);});
});

module.exports = router;