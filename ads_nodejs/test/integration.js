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