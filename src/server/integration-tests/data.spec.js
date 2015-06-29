/* jshint -W117, -W030 */
/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/express/express.d.ts"/>
/// <reference path="../../../typings/should/should.d.ts"/>
/// <reference path="../../../typings/mocha/mocha.d.ts"/>

var should = require('should');
require('typescript-require');
var app = require('../app');
var hippie = require('hippie');

describe('Requesting from data.gov', function () {
    it('should return results', function (done) {
        hippie()
            .json()
            .get('https://api.fda.gov/drug/event.json?search=patient.drug.openfda.pharm_class_epc:' +
            '"nonsteroidal+anti-inflammatory+drug"&count=patient.reaction.reactionmeddrapt.exact')
            .expectStatus(200)
            .end(function (err, res, body) {
            if (err) {
                throw err;
            }
            body.results.should.be.instanceOf(Array);
            done();
        });
    });
});

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
            .get('/data/products/Tylenol')
            .expectStatus(200)
            .end(function (err, res, body) {
            if (err) {
                throw err;
            }
            body.results[0]['generic_name'].should.match(/ACETAMINOPHEN/);
            done();
        });
    });

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
