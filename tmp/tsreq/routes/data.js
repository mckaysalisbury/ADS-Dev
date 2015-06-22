/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
var express = require('express');
var api = require('../modules/api');
var router = express.Router();
router.get('/products/:productName', function (req, res, next) {
    var wr = new api.Fda();
<<<<<<< HEAD
    wr.Products(req.params.productName, function (body) { res.send(body); });
});
router.get('/product/:id', function (req, res, next) {
    var wr = new api.Fda();
    wr.Product(req.params.id, function (body) { res.send(body); });
=======
    wr.Products(req.params.productName, function (body) {
        res.json(body);
    });
});
router.get('/product/:id', function (req, res, next) {
    var wr = new api.Fda();
    wr.Product(req.params.id, function (body) {
        res.json(body);
    });
>>>>>>> 76ddd6d31f5717aebbf61a004999e56a70dfc8ed
});
router.get('/ingredient/:ingredientName', function (req, res, next) {
    var wr = new api.Fda();
    wr.Ingredient(req.params.ingredientName, function (body) {
        res.json(body);
    });
});
router.get('/purpose/:purpose', function (req, res, next) {
    var wr = new api.Fda();
<<<<<<< HEAD
    wr.DoubleEcho(value, function (body) { res.send(body); });
=======
    wr.Purpose(req.params.purpose, function (body) {
        res.json(body);
    });
>>>>>>> 76ddd6d31f5717aebbf61a004999e56a70dfc8ed
});
router.get('/purposeWithoutIngredient/:purpose/:ingredient', function (req, res, next) {
    var wr = new api.Fda();
    console.log(req.params);
    wr.PurposeWithoutIngredient(req.params.purpose, req.params.ingredient, function (body) {
        res.json(body);
    });
});
module.exports = router;
//# sourceMappingURL=data.js.map