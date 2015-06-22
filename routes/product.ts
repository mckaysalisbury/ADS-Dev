/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
import express = require('express');
import api = require('../modules/api');
import path = require('path');

var router = express.Router();

router.get('/:productId', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/product.html"));
});

module.exports = router;