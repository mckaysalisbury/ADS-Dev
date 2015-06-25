var http = require('http');
var Fda = (function () {
    function Fda() {
    }
    Fda.Products = function (brand, callback) {
        Fda.Label(Fda.MultiWordStart('brand_name', brand), 0, 100, Fda.QueryFromArguments(arguments), callback, Fda.SummaryProductData);
    };
    Fda.Product = function (id, callback) {
        Fda.Label('id:' + id, 0, 1, Fda.QueryFromArguments(arguments), callback, Fda.Identity);
    };
    Fda.Ingredient = function (ingredient, callback) {
        Fda.Label(Fda.MultiWordStart("generic_name", ingredient) + "+" + Fda.MultiWordStart("inactive_ingredient", ingredient), 0, 100, Fda.QueryFromArguments(arguments), callback, Fda.SummaryProductData);
    };
    Fda.Purpose = function (purpose, callback) {
        Fda.Label(Fda.MultiWordStart("purpose", purpose), 0, 100, Fda.QueryFromArguments(arguments), callback, Fda.SummaryProductData);
    };
    Fda.PurposeWithoutIngredient = function (purpose, ingredient, callback) {
        Fda.Label(Fda.MultiWordStart("purpose", purpose) + "+AND+NOT+" + Fda.MultiWordStart("generic_name", ingredient) + "+AND+NOT+" + Fda.MultiWordStart("inactive_ingredient", ingredient), 0, 100, Fda.QueryFromArguments(arguments), callback, Fda.SummaryProductData);
    };
    Fda.MultiWordStart = function (field, query) {
        var queryPiece = new Array();
        query.replace(' ', '+');
        query.split('+').forEach(function (word) {
            queryPiece.push(field + ":" + Fda.WordStart(word));
        });
        return '(' + queryPiece.join("+AND+") + ')';
    };
    Fda.WordStart = function (startOfWord) {
        return '[' + startOfWord + '+TO+' + startOfWord + 'zzz]';
    };
    Fda.QueryFromArguments = function (methodArguments) {
        delete methodArguments[methodArguments.length - 1];
        return methodArguments;
    };
    Fda.Label = function (search, skip, limit, queryArguments, callback, filter) {
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
                var object = JSON.parse(result);
                object = Fda.SanitizeProductData(object);
                var filtered = filter(object);
                if (filtered.meta == undefined) {
                    filtered.meta = new Object();
                }
                filtered.meta["query"] = queryArguments;
                callback(filtered);
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
        returnValue["brand_name"] = Fda.FirstIfArrayDefined(input.openfda.brand_name);
        returnValue["generic_name"] = Fda.FirstIfArrayDefined(input.openfda.generic_name);
        returnValue["purpose"] = Fda.FirstIfArrayDefined(input.purpose);
        returnValue["manufacturer_name"] = Fda.FirstIfArrayDefined(input.openfda.manufacturer_name);
        returnValue["id"] = input.id;
        return returnValue;
    };
    Fda.SanitizeProductData = function (input) {
        if (!input.results) {
            return input;
        }
        for (var i = 0; i < input.results.length; i++) {
            input.results[i] = Fda.SanitizeProduct(input.results[i]);
        }
        return input;
    };
    Fda.SanitizeProduct = function (input) {
        var phrasesToRemove = ['purpose', 'use', 'indication', 'otc -', 'section', 'drug facts', '..', '__', 'active ingredient', 'inactive ingredient', 'warning'];
        input = Fda.SanitizeArrayProperty(input, 'purpose', phrasesToRemove);
        input = Fda.SanitizeArrayProperty(input, 'active_ingredient', phrasesToRemove);
        input = Fda.SanitizeArrayProperty(input, 'inactive_ingredient', phrasesToRemove);
        input = Fda.SanitizeArrayProperty(input, 'warnings', phrasesToRemove);
        return input;
    };
    Fda.SanitizeArrayProperty = function (input, property, wordsToClean) {
        if (!input[property]) {
            return input;
        }
        for (var i = 0; i < input[property].length; i++) {
            input[property][i] = Fda.SanitizeString(input[property][i], wordsToClean);
        }
        return input;
    };
    Fda.SanitizeString = function (input, wordsToClean) {
        var lengthBefore = input.length;
        var lengthAfter = 0;
        while (lengthBefore !== lengthAfter) {
            lengthBefore = input.length;
            for (var i = 0; i < wordsToClean.length; i++) {
                input = Fda.CleanWordFromStringStart(wordsToClean[i], input);
            }
            lengthAfter = input.length;
        }
        return input;
    };
    Fda.CleanWordFromStringStart = function (word, input) {
        if (input.toLowerCase().indexOf(word.toLowerCase()) === 0) {
            var lengthToRemove = word.length;
            while (input.length > lengthToRemove && input[lengthToRemove++] !== ' ') {
            }
            return input.substring(lengthToRemove);
        }
        return input;
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
//# sourceMappingURL=api.js.map