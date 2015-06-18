/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
import http = require('http');

export class WebRequest{
    DoubleEcho(value : string, callback) {
      callback(value + value)
    }
    
  	Send(value: string, callback) {
  		  var options = {
  		    host : 'api.fda.gov',
          path : '/drug/label.json?api_key=MJbvXyEy77yTbS9xzasbPZhfIreiq9CjlvFpz5IZ&skip=0&limit=1&search=brand_name:' + value,
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