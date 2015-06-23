/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/express/express.d.ts"/>
import express = require('express');
import api = require('../modules/api');
var Fda = api.Fda;
var router = express.Router();

router.get('/products/:productName', function(req, res, next) {
  Fda.Products(req.params.productName, function(body){res.json(body);});
});

router.get('/product/:id', function(req, res, next) {
  Fda.Product(req.params.id, function(body){res.json(body);});
});

router.get('/ingredient/:ingredientName', function(req, res, next) {
  Fda.Ingredient(req.params.ingredientName, function(body){res.json(body);});
});

router.get('/purpose/:purpose', function(req, res, next) {
  Fda.Purpose(req.params.purpose, function(body){res.json(body);});
});

router.get('/purposeWithQuery/:purpose', function(req, res, next) {
    Fda.Purpose(req.params.purpose, function(body){
    var result = {"q": req.params.purpose, "d": body};
    res.json(result);
  });
});

router.get('/purposeWithoutIngredient/:purpose/:ingredient', function(req, res, next) {
  Fda.PurposeWithoutIngredient(req.params.purpose, req.params.ingredient, function(body){res.json(body);});
});

module.exports = router;