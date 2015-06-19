/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
import http = require('http');

export class Fda{
  DoubleEcho(value : string, callback) {
    callback(value + value)
  }
    
  public Products(brand : string, callback) : void
  {
    this.Label('brand_name:' + brand, 0, 100, callback, Fda.SummaryProductData);
  }
  
  public Product(id : string, callback) : void
  {
    this.Label('id:' + id, 0, 1, callback, Fda.Identity);
  }    
  
  public Ingredient(ingredient: string, callback) : void
  {
    this.Label("active_ingredient:" + ingredient + "+inactive_ingredient:" + ingredient, 0, 100, callback, Fda.SummaryProductData);
  }
  
  public Purpose(purpose: string, callback) : void
  {
    this.Label("purpose:" + purpose, 0, 100, callback, Fda.SummaryProductData);
  }
        
  private Label(search: string, skip : number, limit : number, callback, filter) : void {
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
        callback(filter(JSON.parse(result)));
      });
    });
    request.on('error', function(e) {
      console.log('Problem with request: ' + e.message);
    });
    request.end();
  }
  
  private static SummaryProductData(input)
  {
    var returnValue = new Object();
    returnValue["meta"] = input.meta;
    returnValue["error"] = input.error;
    if (input.results !== undefined)
    {
      returnValue["results"] = Fda.SummaryProductDataResults(input.results);      
    }    
    return returnValue;
  }
  private static SummaryProductDataResults(input)
  {
    var returnValue = new Array();
    for (var i = 0; i < input.length; i++)
    {
      returnValue[i] = Fda.SummaryProductDataResult(input[i]);
    }
    return returnValue;    
  }
  private static SummaryProductDataResult(input)
  {
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
  }
  
  private static FirstIfArrayDefined(input)
  {
    if (input != undefined)
    {
      return input[0];    
    }
    return undefined;
  }
  
  private static Identity(input)
  {
    return input;
  }
}
