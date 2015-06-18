/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
import http = require('http');

export class Fda{
  DoubleEcho(value : string, callback) {
    callback(value + value)
  }
    
  public Products(brand : string, callback) : void
  {
    this.Label('brand_name:' + brand, 0, 10, callback);
  }
  
  public Product(id : string, callback) : void
  {
    this.Label('id:' + id, 0, 10, callback);
  }    
        
  private Label(search: string, skip : number, limit : number, callback) : void {
    var options = {
      host : 'api.fda.gov',
      path : "/drug/label.json?api_key=MJbvXyEy77yTbS9xzasbPZhfIreiq9CjlvFpz5IZ&skip=" + skip + "&limit=" + limit + "&search=product_type:otc+AND+" + search,
      port : 80,
  		method : 'GET'
    };
  	var request = http.request(options, function(response){
      var result = "";
      response.on('data', function(data){
        result += data;
      });
      response.on('end', function() {
        callback(result);
      });
    });
    request.on('error', function(e) {
      console.log('Problem with request: ' + e.message);
    });
    request.end();
  }
}
