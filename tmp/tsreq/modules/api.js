/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
var http = require('http');
var Fda = (function () {
    function Fda() {
    }
    Fda.prototype.DoubleEcho = function (value, callback) {
        callback(value + value);
    };
    Fda.prototype.Products = function (brand, callback) {
        this.Label('brand_name:' + brand, 0, 10, callback, Fda.SummaryProductData);
    };
    Fda.prototype.Product = function (id, callback) {
        this.Label('id:' + id, 0, 10, callback, Fda.Identity);
    };
    Fda.prototype.Label = function (search, skip, limit, callback, filter) {
        var options = {
            host: 'api.fda.gov',
            path: "/drug/label.json?api_key=MJbvXyEy77yTbS9xzasbPZhfIreiq9CjlvFpz5IZ&skip=" + skip + "&limit=" + limit + "&search=product_type:otc+AND+" + search,
            port: 80,
            method: 'GET'
        };
        var request = http.request(options, function (response) {
            var result = "";
            response.on('data', function (data) {
                result += data;
            });
            response.on('end', function () {
                callback(filter(JSON.parse(result)));
            });
        });
        request.on('error', function (e) {
            console.log('Problem with request: ' + e.message);
        });
        request.end();
    };
    Fda.SummaryProductData = function (input) {
        var returnValue = new Object();
        returnValue["meta"] = input.meta;
        returnValue["error"] = input.error;
        if (input.results !== undefined) {
            returnValue["results"] = Fda.SummaryProductDataResults(input.results);
        }
        return returnValue;
    };
    Fda.SummaryProductDataResults = function (input) {
        var returnValue = new Array();
        for (var i = 0; i < input.length; i++) {
            //Fda.SummaryProductDataResult(input[i]);
            returnValue[i] = Fda.SummaryProductDataResult(input[i]);
        }
        return returnValue;
    };
    Fda.SummaryProductDataResult = function (input) {
        var returnValue = new Object();
        returnValue["brand_name"] = input.openfda.brand_name[0];
        returnValue["generic_name"] = input.openfda.generic_name[0];
        returnValue["manufacturer_name"] = input.openfda.generic_name[0];
        returnValue["purpose"] = input.purpose[0];
        returnValue["active_ingredient"] = input.active_ingredient[0];
        if (input.inactiveIngredient != undefined) {
            returnValue["inactive_ingredient"] = input.inactive_ingredient[0];
        }
        returnValue["effective_time"] = input.effective_time;
        returnValue["id"] = input.id;
        returnValue["set_id"] = input.set_id;
        return returnValue;
    };
    Fda.Identity = function (input) {
        return input;
    };
    return Fda;
})();
exports.Fda = Fda;
