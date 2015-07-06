/// <reference path="../../../typings/mocha/mocha.d.ts"/>
/* jshint -W117, -W030 */
var should = require('should');
require('typescript-require');
var app = require('../app'), hippie = require('hippie');

describe('data products', function () {
    it('unspecified should 404', function (done) {
        hippie(app)
            .get('/data/products/')
            .expectStatus(404)
            .end(done);
    });

    it('Visine should have data', function (done) {
        hippie(app)
            .json()
            .get('/data/products/Visine')
            .expectStatus(200)
            .end(function (err, res, body) {
            if (err) {
                throw err;
            }
            body.results.should.be.instanceOf(Array);
            done();
        });
    });

    it('Excedrin should have acetominaphin', function (done) {
        hippie(app)
            .json()
            .get('/data/products/Excedrin')
            .expectStatus(200)
            .end(function (err, res, body) {
            if (err) {
                throw err;
            }
            body.results[0]['generic_name'].should.match(/ACETAMINOPHEN/);
            done();
        });
    });

    it('should not have extra data', function (done) {
        hippie(app)
            .json()
            .get('/data/products/Tylenol')
            .expectStatus(200)
            .end(function (err, res, body) {
            if (err) {
                throw err;
            }
            body.results[0].should.have.property('generic_name');
            body.results[0].should.not.have.property('storage_and_handling');
            done();
        });
    });
});
describe('ingredient', function () {
    it('Phenylephrine should be found first in product named "Day Time with PE"', function (done) {
        hippie(app)
            .json()
            .get('/data/ingredient/Phenylephrine')
            .expectStatus(200)
            .end(function (err, res, body) {
            if (err) {
                throw err;
            }
            body.results[0]['brand_name'].should.be.eql('Day Time with PE');
            done();
        });
    });
});

describe('purpose', function () {
    it('Headache should be found first in product "Aspirin"', function (done) {
        hippie(app)
            .json()
            .get('/data/purpose/Headache')
            .expectStatus(200)
            .end(function (err, res, body) {
            if (err) {
                throw err;
            }
            body.results[0]['brand_name'].should.be.eql('Aspirin');
            done();
        });
    });
});

describe('purpose', function () {
    it('sunscreen should be found', function (done) {
        hippie(app)
            .json()
            .get('/data/purpose/sunscreen')
            .expectStatus(200)
            .end(function (err, res, body) {
            if (err) {
                throw err;
            }
            this.timeout(5000);
            body.results[0]['brand_name'].should.be.eql('CHANTECAILLE PROTECTION NATURELLE BRONZE SPF 46');
            done();
        });
    });

    it('"pai fev" should find pain relievers and fever reducers', function (done) {
        hippie(app)
            .json()
            .get('/data/purpose/pai+fev')
            .expectStatus(200)
            .end(function (err, res, body) {
            if (err) {
                throw err;
            }
            body.results[0]['purpose'].should.be.eql('Purpose Pain reliever/fever reducer');
            done();
        });
    });

    it('should have the query in the meta', function (done) {
        hippie(app)
            .json()
            .get('/data/purpose/pai+fev')
            .expectStatus(200)
            .end(function (err, res, body) {
            if (err) {
                throw err;
            }
            body.meta.query[0].should.be.eql('pai+fev');
            done();
        });
    });

    it('garbage shouldnt crash', function (done) {
        hippie(app)
            .json()
            .get('/data/purpose/garbage')
            .expectStatus(200)
            .end(function (err, res, body) {
            if (err) {
                throw err;
            }
            done();
        });
    });
});

describe('data product', function () {
    it('Specific product should be tylenol', function (done) {
        hippie(app)
            .json()
            .get('/data/product/07090b21-bc6c-4d16-a49e-02f0622eb0f1')
            .expectStatus(200)
            .end(function (err, res, body) {
            if (err) {
                throw err;
            }
            body.results[0]['openfda']['brand_name'][0].should.be.eql('TYLENOL SINUS CONGESTION AND PAIN DAYTIME');
            done();
        });
    });
});

describe('purpose without ingredient', function () {
    it('Product without waterproduct should be tylenol', function (done) {
        hippie(app)
            .json()
            .get('/data/purposeWithoutIngredient/pain/water')
            .expectStatus(200)
            .end(function (err, res, body) {
            if (err) {
                throw err;
            }
            body.results[0]['brand_name'].should.be.eql('Pain Relief Extra Strength');
            done();
        });
    });
});
