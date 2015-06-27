/* jshint -W117, -W030 */
describe('search by purpose routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/search-by-purpose/search-by-purpose.html';

        beforeEach(function() {
            module('app.search-by-purpose', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('should map state search by purpose to url / ', function() {
            expect($state.href(null, {})).to.equal(null);
        });

        it('should map /search-form.search-by-purpose route to search-by-purpose View template', function () {
            expect($state.get('search-form.search-by-purpose').templateUrl).to.equal(view);
        });

        it('of search-form.search-by-purpose should work with $state.go', function () {
            $state.go('search-form.search-by-purpose');
            $rootScope.$apply();
            expect($state.is('search-form.search-by-purpose'));
        });
    });
});
