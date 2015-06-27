/* jshint -W117, -W030 */
describe('search form', function () {
    describe('state', function () {
        var controller;
        var view = 'app/search-form/search-form.html';

        beforeEach(function() {
            module('app.search-form', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('should map state search by purpose to url / ', function() {
            expect($state.href('search-form', {})).to.equal('/');
        });

        it('should map /search-form route to search-form View template', function () {
            expect($state.get('search-form').templateUrl).to.equal(view);
        });

        it('of search-form should work with $state.go', function () {
            $state.go('search-form');
            $rootScope.$apply();
            expect($state.is('search-form'));
        });
    });
});
