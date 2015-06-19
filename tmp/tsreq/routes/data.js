var express = require('express');
var api = require('../modules/api');
var router = express.Router();
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
module.exports = router;
//# sourceMappingURL=data.js.map