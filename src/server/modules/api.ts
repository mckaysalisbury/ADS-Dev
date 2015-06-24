/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/express/express.d.ts"/>
import http = require('http');

export class Fda {

  public static Products(brand: string, callback): void {
    Fda.Label(Fda.MultiWordStart('brand_name', brand), 0, 100, Fda.QueryFromArguments(arguments), callback, Fda.SummaryProductData);
    
  }

  public static Product(id: string, callback): void {
    Fda.Label('id:' + id, 0, 1, Fda.QueryFromArguments(arguments), callback, Fda.Identity);
  }

  public static Ingredient(ingredient: string, callback): void {
    // generic name is more useful than active ingredient
    Fda.Label(
       Fda.MultiWordStart("generic_name", ingredient) +
       "+" + Fda.MultiWordStart("inactive_ingredient", ingredient),
        0, 100, Fda.QueryFromArguments(arguments), callback, Fda.SummaryProductData);
  }
  
  public static Purpose(purpose: string, callback): void {
    Fda.Label(Fda.MultiWordStart("purpose", purpose), 0, 100, Fda.QueryFromArguments(arguments), callback, Fda.SummaryProductData);
  }

  public static PurposeWithoutIngredient(purpose: string, ingredient: string, callback): void {
    Fda.Label(
      Fda.MultiWordStart("purpose", purpose) +  
       "+AND+NOT+" + Fda.MultiWordStart("generic_name", ingredient) +
       "+AND+NOT+" + Fda.MultiWordStart("inactive_ingredient", ingredient),
        0, 100, Fda.QueryFromArguments(arguments), callback, Fda.SummaryProductData);
  }
  
  public static MultiWordStart(field : string, query : string) : string
  {
    var queryPiece = new Array();
    query.replace(' ', '+');
    query.split('+').forEach((word) =>
      {        
        queryPiece.push(field + ":" + Fda.WordStart(word));         
      });
    return '(' +queryPiece.join("+AND+") + ')';      
  }
  
  public static WordStart(startOfWord : string) : string{
    // https://open.fda.gov/api/reference/#dates-and-ranges 
    return '[' + startOfWord + '+TO+' + startOfWord + 'zzz]'; 
    // multiple 'z's to make sure that certain things don't get excluded like "snoo" shouln't exclude "snoozing" (because "snoozing" is greater than "snooz") (or "fluconazole" if you're trying to think of something people might actually search for.)
  }
  
  private static QueryFromArguments(methodArguments : IArguments) : any
  {
    delete methodArguments[methodArguments.length - 1];
    return methodArguments;        
  }

  private static Label(search: string, skip: number, limit: number, queryArguments, callback, filter): void {
    var options = {
      host: 'api.fda.gov',
      path: "/drug/label.json?api_key=MJbvXyEy77yTbS9xzasbPZhfIreiq9CjlvFpz5IZ&skip=" + skip + "&limit=" + limit + "&search=product_type:otc+AND+" + search,
      port: 80,
      method: 'GET'
    };
    var request = http.request(options, function(response) {
      var result = "";
      response.on('data', function(data) {
        result += data;
      });
      response.on('end', function() {
        var object = JSON.parse(result);
        object = Fda.SanitizeProductData(object);
        var filtered = filter(object);
        if (filtered.meta == undefined)
        {
          filtered.meta = new Object();
        }
        filtered.meta["query"] = queryArguments; // add in the query
        callback(filtered);
      });
    });
    request.on('error', function(e) {
      console.log('Problem with request: ' + e.message);
    });
    request.end();
  }

  private static SummaryProductData(input) {
    var returnValue = new Object();
    returnValue["meta"] = input.meta;
    returnValue["error"] = input.error;
    if (input.results !== undefined) {
      returnValue["results"] = Fda.SummaryProductDataResults(input.results);
    }
    return returnValue;
  }
  private static SummaryProductDataResults(input) {
    var returnValue = new Array();
    for (var i = 0; i < input.length; i++) {
      returnValue[i] = Fda.SummaryProductDataResult(input[i]);
    }
    return returnValue;
  }
  private static SummaryProductDataResult(input) {
    var returnValue = new Object();
    returnValue["brand_name"] = Fda.FirstIfArrayDefined(input.openfda.brand_name);
    returnValue["generic_name"] = Fda.FirstIfArrayDefined(input.openfda.generic_name);
    returnValue["purpose"] = Fda.FirstIfArrayDefined(input.purpose);
    returnValue["manufacturer_name"] = Fda.FirstIfArrayDefined(input.openfda.manufacturer_name);
    // returnValue["active_ingredient"] = Fda.FirstIfArrayDefined(input.active_ingredient);
    // returnValue["inactive_ingredient"] = Fda.FirstIfArrayDefined(input.inactive_ingredient);
    // returnValue["effective_time"] = input.effective_time;
    returnValue["id"] = input.id;
    // returnValue["set_id"] = input.set_id;
    return returnValue;
  }
  private static SanitizeProductData(input) {
    if (!input.results) {
      return input;
    }
    for (var i = 0; i < input.results.length; i++) {
      input.results[i] = Fda.SanitizeProduct(input.results[i]);
    }
    return input;
  }
  public static SanitizeProduct(input) {
    var phrasesToRemove = ['purpose', 'use', 'indication', 'otc -', 'section', 'drug facts', '..', '__', 'active ingredient', 'inactive ingredient', 'warning'];
    input = Fda.SanitizeArrayProperty(input, 'purpose', phrasesToRemove);
    input = Fda.SanitizeArrayProperty(input, 'active_ingredient', phrasesToRemove);
    input = Fda.SanitizeArrayProperty(input, 'inactive_ingredient', phrasesToRemove);
    input = Fda.SanitizeArrayProperty(input, 'warnings', phrasesToRemove);
    return input;
  }
  private static SanitizeArrayProperty(input, property, wordsToClean) {
    if (!input[property]) {
      return input;
    }
    for (var i = 0; i < input[property].length; i++) {
      input[property][i] = Fda.SanitizeString(input[property][i], wordsToClean);
    }
    return input;
  }
  private static SanitizeString(input, wordsToClean) {
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
  }
  
  private static CleanWordFromStringStart(word: string, input: string) {
    if (input.toLowerCase().indexOf(word.toLowerCase()) === 0) {
      var lengthToRemove = word.length;
      while (input.length > lengthToRemove && input[lengthToRemove++] !== ' ') {}
      return input.substring(lengthToRemove);
    }
    return input;
  }
  
  private static FirstIfArrayDefined(input) {
    if (input != undefined) {
      return input[0];
    }
    return undefined;
  }

  private static Identity(input) {
    return input;
  }
}
