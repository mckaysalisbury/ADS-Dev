/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
/// <reference path="../typings/should/should.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>

var api = require('../modules/api');

var should = require("should");

require('typescript-require');
var app = require('../app')
  , hippie = require('hippie');


describe('User API on index',function(){

  it('GET / should return 200',function(done){
    hippie(app)
      .get('/')
      .expectStatus(200)
      .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
  });

  it('POST / should return 200',function(done){
    hippie(app)
      .post('/')      
      .expectStatus(200)
      .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
  });
});

describe('Requesting from data.gov',function(){
  it('should return results',function(done){
    hippie()
      .json()
      .get('https://api.fda.gov/drug/event.json?search=patient.drug.openfda.pharm_class_epc:"nonsteroidal+anti-inflammatory+drug"&count=patient.reaction.reactionmeddrapt.exact')
      .expectStatus(200)
      .end(function(err, res, body) {
          if (err) throw err;
          body.results.should.be.instanceOf(Array);
          done();
        });
  });
});

describe('double echo', function(){
  
  it ('unspecified should 404', function(done){    
    hippie(app)
      .get('/data/doubleecho/')
      .expectStatus(404)
      .end(done);
  });

  it ('specified should echo', function(done){    
    hippie(app)
      .get('/data/doubleecho/Quack')
      .expectStatus(200)
      .end(function(err, res, body) {
          if (err) throw err;
          body.should.be.eql("QuackQuack");
          done();
        });
  });

});


describe('double echo api', function(){
  
  it ('unspecified should 404', function(done){    
    hippie(app)
      .get('/data/doubleechoapi/')
      .expectStatus(404)
      .end(done);
  });

  it ('specified should echo', function(done){    
    hippie(app)
      .get('/data/doubleechoapi/Quack')
      .expectStatus(200)
      .end(function(err, res, body) {
          if (err) throw err;
          body.should.be.eql("QuackQuack");
          done();
        });
  });

});
// describe('data products', function(){
//   
//   it ('unspecified should 404', function(done){    
//     hippie(app)
//       .get('/data/products/')
//       .expectStatus(404)
//       .end(done);
//   });
// 
//   it ('specified should have data', function(done){    
//     hippie(app)
//       .get('/data/products/Tylenol')
//       .expectStatus(200)
//       .end(function(err, res, body) {
//           if (err) throw err;
//           body.should.contain("Acetominaphin");
//           done();
//         });
//   });
// });


describe('WebRequest',function(){
  it('should return results',function(done){
    var wr = new api.WebRequest();
    wr.DoubleEcho('quack', function(){
      done();  
    });
    
  });
});


