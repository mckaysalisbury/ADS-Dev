/* jshint -W117, -W030 */
/// <reference path="../../../vendortypescripts/mocha/mocha.d.ts"/>
/// <reference path="../../../vendortypescripts/should/should.d.ts"/>
require('typescript-require');
var index = require('../routes/index');
var should = require('should');
describe('Index', function () {
    describe('Testing stuff', function () {
        it('should have 10 equal 10', function () {
            var test = 10;
            test.should.be.eql(10);
        });
    });
});
