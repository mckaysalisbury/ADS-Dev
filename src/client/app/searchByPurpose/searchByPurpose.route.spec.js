/* jshint -W117, -W030 */
describe('search by purpose routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/searchByPurpose/searchByPurpose.html';

        beforeEach(function() {
            module('app.searchByPurpose', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('should map state search by purpose to url / ', function() {
            expect($state.href(null, {})).to.equal(null);
        });

        it('should map /search-form.searchByPurpose route to searchByPurpose View template', function () {
            expect($state.get('search-form.searchByPurpose').templateUrl).to.equal(view);
        });

        it('of search-form.searchByPurpose should work with $state.go', function () {
            $state.go('search-form.searchByPurpose');
            $rootScope.$apply();
            expect($state.is('search-form.searchByPurpose'));
        });
    });
});
