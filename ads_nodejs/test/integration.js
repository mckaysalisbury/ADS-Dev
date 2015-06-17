var app = require('../app')
  , hippie = require('hippie');


describe('User API',function(){

  it('GET / should return 200',function(done){
    hippie(app)
      .get('/')
      .expectStatus(200)
      .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
  });

  it('POST / should return 404',function(done){
    hippie(app)
      .post('/')      
      .expectStatus(404)
      .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
  });
});