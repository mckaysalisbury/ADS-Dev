var http = require('http');
var Fda = (function () {
    function Fda() {
    }
    Fda.prototype.DoubleEcho = function (value, callback) {
        callback(value + value);
    };
    Fda.prototype.Products = function (brand, callback) {
        this.Label('brand_name:' + brand, 0, 10, callback);
    };
    Fda.prototype.Product = function (id, callback) {
        this.Label('id:' + id, 0, 10, callback);
    };
    Fda.prototype.Label = function (search, skip, limit, callback) {
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
                callback(result);
            });
        });
        request.on('error', function (e) {
            console.log('Problem with request: ' + e.message);
        });
        request.end();
    };
    return Fda;
})();
exports.Fda = Fda;
//# sourceMappingURL=api.js.map