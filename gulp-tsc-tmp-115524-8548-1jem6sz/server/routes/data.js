var express = require('express');
var api = require('../modules/api');
var Fda = api.Fda;
var router = express.Router();
router.get('/products/:productName/:page?/:count?', function (req, res, next) {
    Fda.Products(req.params.productName, function (body) {
        res.json(body);
    });
});
router.get('/product/:id/:page?/:count?', function (req, res, next) {
    Fda.Product(req.params.id, function (body) {
        res.json(body);
    });
});
router.get('/ingredient/:ingredientName/:page?/:count?', function (req, res, next) {
    Fda.Ingredient(req.params.ingredientName, function (body) {
        res.json(body);
    });
});
router.get('/purpose/:purpose/:page?/:count?', function (req, res, next) {
    Fda.Purpose(req.params.purpose, function (body) {
        res.json(body);
    });
});
router.get('/purposeWithoutIngredient/:purpose/:ingredient/:page?/:count?', function (req, res, next) {
    Fda.PurposeWithoutIngredient(req.params.purpose, req.params.ingredient, function (body) {
        res.json(body);
    });
});
module.exports = router;
//# sourceMappingURL=data.js.map