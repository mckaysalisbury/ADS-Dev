/* jshint -W117, -W030 */
/// <reference path="../../../typings/mocha/mocha.d.ts"/>

var chai = require('chai');
var expect = chai.expect;
require('typescript-require');
var api = require('../modules/api');

describe('FDA API', function () {
    describe('Cleaning up results', function () {
        describe('SanitizeProduct', function () {
            it('should not change the input in the basic case', function () {
                var result = api.Fda.SanitizeProduct({'purpose': ['This is an example purpose']});
                expect(result.purpose[0]).to.equal('This is an example purpose');
            });
            it('should remove purpose from the beginning', function () {
                var result = api.Fda.SanitizeProduct({'purpose': ['purpose This is an example purpose']});
                expect(result.purpose[0]).to.equal('This is an example purpose');
            });
            it('should remove all caps purpose from the beginning', function () {
                var result = api.Fda.SanitizeProduct({'purpose': ['PURPOSE This is an example purpose']});
                expect(result.purpose[0]).to.equal('This is an example purpose');
            });
            it('should remove use from the beginning', function () {
                var result = api.Fda.SanitizeProduct({'purpose': ['Use This is an example purpose']});
                expect(result.purpose[0]).to.equal('This is an example purpose');
            });
            it('should remove indication from the beginning', function () {
                var result = api.Fda.SanitizeProduct({'purpose': ['Indication: This is an example purpose']});
                expect(result.purpose[0]).to.equal('This is an example purpose');
            });
            it('should remove purpose and other text from the beginning', function () {
                var result = api.Fda.SanitizeProduct({'purpose': ['Purposes This is an example purpose']});
                expect(result.purpose[0]).to.equal('This is an example purpose');
            });
            it('should remove purpose and colon from the beginning', function () {
                var result = api.Fda.SanitizeProduct({'purpose': ['Purpose: This is an example purpose']});
                expect(result.purpose[0]).to.equal('This is an example purpose');
            });
            it('should remove purpose and many characters from the beginning', function () {
                var result = api.Fda.SanitizeProduct({'purpose': ['Purposeasdf: This is an example purpose']});
                expect(result.purpose[0]).to.equal('This is an example purpose');
            });
            it('should remove purpose and use from the beginning', function () {
                var result = api.Fda.SanitizeProduct({'purpose': ['Purpose: Use: This is an example purpose']});
                expect(result.purpose[0]).to.equal('This is an example purpose');
            });
        });
    });
});
