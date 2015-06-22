/// <reference path="../../../vendortypescripts/node/node.d.ts"/>
/// <reference path="../../../vendortypescripts/express/express.d.ts"/>
var http = require('http');
var Fda = (function () {
    function Fda() {
    }
    Fda.prototype.DoubleEcho = function (value, callback) {
        callback(value + value);
    };
    Fda.prototype.Products = function (brand, callback) {
        this.Label('brand_name:' + brand, 0, 100, callback, Fda.SummaryProductData);
    };
    Fda.prototype.Product = function (id, callback) {
        this.Label('id:' + id, 0, 1, callback, Fda.Identity);
    };
    Fda.prototype.Ingredient = function (ingredient, callback) {
        this.Label("active_ingredient:" + ingredient + "+inactive_ingredient:" + ingredient, 0, 100, callback, Fda.SummaryProductData);
    };
    Fda.prototype.Purpose = function (purpose, callback) {
        this.Label("purpose:" + purpose, 0, 100, callback, Fda.SummaryProductData);
    };
    Fda.prototype.PurposeWithoutIngredient = function (purpose, ingredient, callback) {
        // Generic name is a little bit more helpful than active ingredient?
        //this.Label("purpose:"+ purpose +"+AND+NOT+active_ingredient:" + ingredient + "+AND+NOT+inactive_ingredient:" + ingredient, 0, 100, callback, Fda.SummaryProductData);
        this.Label("purpose:" + purpose + "+AND+NOT+generic_ingredient:" + ingredient + "+AND+NOT+inactive_ingredient:" + ingredient, 0, 100, callback, Fda.SummaryProductData);
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
            returnValue[i] = Fda.SummaryProductDataResult(input[i]);
        }
        return returnValue;
    };
    Fda.SummaryProductDataResult = function (input) {
        var returnValue = new Object();
        returnValue["brand_name"] = input.openfda.brand_name[0];
        returnValue["generic_name"] = input.openfda.generic_name[0];
        returnValue["manufacturer_name"] = input.openfda.generic_name[0];
        returnValue["purpose"] = Fda.FirstIfArrayDefined(input.purpose);
        returnValue["active_ingredient"] = input.active_ingredient[0];
        returnValue["inactive_ingredient"] = Fda.FirstIfArrayDefined(input.inactive_ingredient);
        returnValue["effective_time"] = input.effective_time;
        returnValue["id"] = input.id;
        returnValue["set_id"] = input.set_id;
        return returnValue;
    };
    Fda.FirstIfArrayDefined = function (input) {
        if (input != undefined) {
            return input[0];
        }
        return undefined;
    };
    Fda.Identity = function (input) {
        return input;
    };
    return Fda;
})();
exports.Fda = Fda;